import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const secretName = "secretVerlBlog";
const secretClient = new SecretsManagerClient({
    region: "ap-southeast-2"
});

async function getDatabaseCreds()
{
    try {
        const result = await secretClient.send(
            new GetSecretValueCommand(
                {
                    SecretId: secretName,
                    VersionStage: "AWSCURRENT"
                }
            )
        )
        if (result.SecretString == undefined) {
            throw Error("SecretString undefined");
        }
        const fullResult = JSON.parse(result.SecretString);
        return {
            host: fullResult.host,
            port: fullResult.port,
            database: fullResult.database,
            user: fullResult.user,
            password: fullResult.password
        }
    } catch (error) {
        throw error
}}

export { getDatabaseCreds }