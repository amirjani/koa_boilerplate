import {ConfigInterface} from "./config.interface";
import { DotenvParseOutput, config as env } from "dotenv";

const dotenv: DotenvParseOutput = env().parsed;

const isDevMode = dotenv.NODE_ENV !== "production";

export const config: ConfigInterface = {
    port: +(dotenv.PORT || 3000),
    apiVersion: dotenv.API_VERSION,
    bcryptSalt: +(dotenv.BCRYPT_SALT) || 10,
    debugLevel: isDevMode,
    nodeEnv: dotenv.NODE_ENV || 'development',
    redis: {
        host: dotenv.REDIS_HOST,
        port: +dotenv.REDIS_PORT,
        lazyConnect: dotenv.REDIS_LAZYCONNECT === "true",
        autoResubscribe: dotenv.REDIS_AUTORESUBSCRIBE === "true",
        maxRetriesPerRequest: +dotenv.REDIS_MAXRETRIESPERREQUEST,
        enableOfflineQueue: dotenv.REDIS_ENABLEOFFLINEQUEUE === "true",
        retryStrategy: () => 2000,
        reconnectOnError: (err) => {
            return err.message.startsWith("READONLY");
        },
    }
}