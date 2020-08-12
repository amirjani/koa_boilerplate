import { ConfigInterface } from "./config.interface";
import { DotenvParseOutput, config as env } from "dotenv";

const dotenv: DotenvParseOutput = env().parsed;

const isDevMode = dotenv.NODE_ENV !== "production";

export const config: ConfigInterface = {
  port: +(dotenv.PORT || 3000),
  apiVersion: dotenv.API_VERSION,
  bcryptSalt: +dotenv.BCRYPT_SALT || 10,
  debugLevel: isDevMode,
  nodeEnv: dotenv.NODE_ENV || "development",
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
  },
  elasticConfig: {
    node: process.env.ELASTIC_NODE,
    auth: {
      username: process.env.ELASTIC_AUTH_USERNAME,
      password: process.env.ELASTIC_AUTH_PASSWORD,
    },
  },
  mysqlConfig: {
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: process.env.MYSQL_WAITFORCONNECTIONS === "true",
    connectionLimit: +process.env.MYSQL_CONNECTIONLIMIT,
    queueLimit: +process.env.MYSQL_QUEUELIMIT,
    multipleStatements: process.env.MYSQL_MULTIPLESTATEMENTS === "true",
  },
};
