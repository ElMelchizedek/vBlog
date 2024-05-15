# verlBlog
verlBlog is a microblogging web application designed to be hosted on Amazon Web Services.

## Installation / Usage
### For local testing:

```shell
git clone https://github.com/TheVerl/verlBlog.git
cd verlBlog
cd app
curl -fsSL https://bun.sh/install | bash
bun dev
```

### For deploying to AWS:
* Set up RDS database
* Place all database credentials in a secret in SecretManager

```shell
git clone https://github.com/TheVerl/verlBlog.git
```

Edit line secret.ts in src/db/config/ so that it uses your chosen secret name
(default is "secretVerlBlog")

Setup Github Actions Secrets "AWS_ACCESS_KEY_ID", "AWS_ACCOUNT_ID", and
"AWS_SECRET_ACCESS_KEY", to be used by the workflow.

Then push your modified repository to git, and run the "Dev Code Test" workflow.

If everything works out, you should have a running testing container on AWS. You can then
manually set up a production service from that.

## Technologies
* Javascript runtime: Bun
* Backend: ElysiaJS
* Frontend: KitaJS' implementation of HTMX, that comes with ElysiaJS
* Database: Postgres hosted on RDS, interfaced from the server with Drizzle

### How the application is deployed
The application is deployed with CDK as a Docker container running on an ECS cluster, with most other expected resources like a VPC and a Security Group set up as well. 

An exception to that would be the SecretManager, which due to its sensitive nature must be deployed manually and the code edited to direct to it. 

Another exception would be the RDS instance, which must be set up by hand on AWS.

If one wants to have a two-stage deployment process, with
separate development and production services on the cluster, I would recommend using the CDK to deploy the development service and then do the production mnanually: all the requirements for
a manual deployment should come with the CDK's generated stack.


### Why choices were made regarding certain technologies
Initially I had desired to use an EC2 instance that would run code automatically fed to it by a CodePipeline using CodeCommit/Build/Deploy. However, I soon discovered that the Amazon CI/CD
system was confusing and not easy to navigate. I decided that I would instead use Github's own CI/CD solution, and discovered it was much more friendly to configure especially with Github
Actions.

ElysiaJS was used so that TypeScript/JavaScript could be used on both the front and backend, and because previous experience has taught me that doing the usual set up with something like
nginx can be much more fiddly. However, a more serious implementation would likely require a more tried and tested approach.

For HTMX, it was simply to cutdown on the heavy bloat that comes with more mainstream frameworks like React.

Postgres was used as a consequence of Drizzle: The easy plugin for Drizzle for using RDS was only available for Postgres. If I had taken the time to interface with RDS directly, or if the
plugin had become available for MySQL, I would have used that database instead.

## Issues / Features that could be added
* Include RDS database in the automated CDK process.
* Refactor CSS so that the website looks much better.