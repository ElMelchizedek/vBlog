# verlBlog
verlBlog is a microblogging web application designed to be hosted on Amazon Web Services.

## Installation
TODO

## Usage
TODO

## Technologies
* Javascript runtime: Bun
* Backend: ElysiaJS
* Frontend: KitaJS' implementation of HTMX, that comes with ElysiaJS
* Database: Postgres, interfaced from the server with Drizzle

### How the application is deployed
The application is deployed with CDK as a Docker container running on an ECS cluster, with all the other expected resources like a VPC and a Security Group set up as well. An exception to
that would be the SecretManager, which due to its sensitive nature must be deployed manually and the code edited to direct to it. If one wants to have a two-stage deployment process, with
seperate development and production services on the cluster, I would recommend using the CDK to deploy the development service and then do the production mnanually: all the requirements for
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

TODO