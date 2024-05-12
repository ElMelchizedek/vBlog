import { GetSecretValueCommand, GetSecretValueCommandOutput } from "@aws-sdk/client-secrets-manager";
import { secretClient, secretName } from "./drizzle";


async function getDatabaseCreds() {
    try {
        const result = await secretClient.send(
            new GetSecretValueCommand(
                {
                    SecretId: secretName,
                    VersionStage: "AWSCURRENT"
                }
            )
        );
        await result.then((response: Promise<GetSecretValueCommandOutput>) => {
            if (response.SelectString == undefined) {
                throw Error("SecretString undefined");
            }
            const fullResult = JSON.parse(response.SelectString);
            return {
                host: fullResult.host,
                port: fullResult.port,
                database: fullResult.database,
                user: fullResult.user,
                password: fullResult.password
            };
        }); try { } catch (error) {
            throw error;
        }

    } finally { }
}
