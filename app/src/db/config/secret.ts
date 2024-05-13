import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const secretClient = new SecretsManagerClient({
    region: "ap-southeast-2"
});

async function getSecret(secretName : string)
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
        return result.SecretString;
    } catch (error) {
        throw error
}}

export async function getDBSecret()
{
    const response = await getSecret("secretVerlBlog")
    const fullResult = JSON.parse(response);
    return {
        host: fullResult.host,
        port: fullResult.port,
        database: fullResult.database,
        user: fullResult.user,
        password: fullResult.password
    }
}

export async function getJWTSecret()
{
    return await getSecret("secretJWTVerlBlog");
}