import { RedisOptions } from "ioredis";
import {ElasticClientOptions} from "../utils/elastic/elastic.provider";
import {DatabasePoolOptions} from "../utils/mysql/mysql.provider";

export interface ConfigInterface {
    debugLevel: boolean;
    nodeEnv: string,
    port: number,
    redis: RedisOptions,
    apiVersion: string,
    bcryptSalt: number,
    elasticConfig: ElasticClientOptions;
    mysqlConfig: DatabasePoolOptions;
}