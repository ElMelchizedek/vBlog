# verlBlog
verlBlog is a microblogging web application designed to be hosted on Amazon Web Services.

## Technologies
* Javascript runtime: Bun
* Backend: ElysiaJS
* Frontend: HTMX, HTML, CSS 
* Database: Postgres hosted on RDS, interfaced from the server with Drizzle

## Installation (Untested)

```shell
git clone https://github.com/TheVerl/verlBlog.git
cd verlBlog
cd app
curl -fsSL https://bun.sh/install | bash
bun dev
```

Note that this will not have database support. A dummy local database feature could be implemented for testing, but for now there isn't any such thing. You will need to follow the proceeding steps for a functioning database.

* Set up RDS database instance.
* Place all database credentials in a secret in SecretManager as so:

```
host: your-database.some-string.your-region.rds.amazonaws.com
port: 5432
database: postgres
user: postgres
password: password
```
* Do the same for your JSON Web Token's secret:
```
yoursecret
```

* Continue on with these commands:

```shell
git clone https://github.com/TheVerl/verlBlog.git
```

* Edit the two lines secret.ts calling `getSecret()` in src/db/config/ so that it uses your chosen secret name for both your database and JWT (defaulta are "secretVerlBlog" and "secretJWTVerlBlog" respectively).

* Setup Github Actions Secrets "AWS_ACCESS_KEY_ID", "AWS_ACCOUNT_ID", and
"AWS_SECRET_ACCESS_KEY", to be used by the workflow.

* Run the following commands:
```shell
cd app 
bunx drizzle-kit studio --config=kit/config.ts
```
* Then follow the URL it gives (https://local.drizzle.studio) and select the "accounts" table.
* Go to https://jwt.io/ and scroll down to "Debugger", and insert the following values for the corresponding sections on the right hand side:
```
HEADER:
{
    "alg": "HS256"
}
PAYLOAD:
{
    "iss": "verlBlog"
    "sub": "usernamepassword" (this is a concatenated string)
}
VERIFY SIGNATURE:
enter in plain text your JWT secret from your SecretManager into "your-256-bit-secret"
```

* Take the resultant token on the left hand side and paste it into the token field of your new accounts entry. Then fill out "user" (username) and "name" (display name) as you see fit.

## Usage
Once you have your database set up, you can simply run `bun dev` from within the `app/` directory, and it should be working locally.

For it to be set up on AWS, Push your modified repository to git and run the "Dev Code Test" workflow.

If everything works out, you should have a running testing container on AWS. You can then
manually set up a production service from that using the resources provided by the generated stack.

## The Why and the How
### How the application deployment works
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
* Refactor CSS so that the website looks much better. Especially prescient to add animations.
* Allow user to delete their own posts on the main page feed.
* Automate the installation process.