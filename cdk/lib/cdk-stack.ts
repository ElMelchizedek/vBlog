import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecsPatterns from "aws-cdk-lib/aws-ecs-patterns";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as path from "path";
import * as iam from "aws-cdk-lib/aws-iam";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const vpc = new ec2.Vpc(this, "vpcVerlBlog", {
      createInternetGateway: true,

      maxAzs: 3
    });
    
    const securityGroup = new ec2.SecurityGroup(this, "securityGroupVerlBlog", {
      vpc,
      allowAllOutbound: true
    })
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(3000));
    securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(5432));

    const cluster = new ecs.Cluster(this, "clusterVerlBlog", {
      vpc: vpc
    });

    const execRole = new iam.Role(this, "taskExecutionRoleVerlBlog", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
    });
    execRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonEC2ContainerRegistryPowerUser"));

    const taskRole = new iam.Role(this, "taskRoleVerlBlog", {
      assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com")
    });
    taskRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess")) 
    // I know this is bad practice, but I don't have time to figure out the proper policy.

    const taskDef = new ecs.FargateTaskDefinition(this, "taskDefVerlBlog", {
      family: "familyTaskDefVerlBlog",
      executionRole: execRole,
      taskRole: taskRole,
    });
    taskDef.addContainer("imageVerlBlog", {
      image: ecs.ContainerImage.fromAsset(path.resolve(__dirname, "../../")),
      containerName: "containerVerlBlog",
      portMappings: 
      [
        {
            "name": "elysia-js-port",
            "containerPort": 3000,
            "hostPort": 3000,
            "protocol": ecs.Protocol.TCP,
            "appProtocol": ecs.AppProtocol.http
        }
      ],
      essential: true,
      entryPoint: [
        "/usr/local/bin/docker-entrypoint.sh"
      ],
      command: [
        "bun",
        "src/index.tsx"
      ],
      "environment": {
        "path": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
        "NODE_ENV": "production",
        "BUN_RUNTIME_TRANSPILER_CACHE_PATH": "0",
        "BUN_INSTALL_BIN": "/usr/local/bin"
      },
      "workingDirectory": "/home/bun/app",
    });

    const service = new ecsPatterns.ApplicationLoadBalancedFargateService(this, "serviceDevVerlBlog", {
      cluster: cluster,
      cpu: 1024,
      desiredCount: 1,
      memoryLimitMiB: 3072,
      publicLoadBalancer: true,
      taskDefinition: taskDef,
      securityGroups: [securityGroup],
      assignPublicIp: true
    })

  }
}
