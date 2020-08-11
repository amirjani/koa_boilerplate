import { RedisOptions } from "ioredis";

export interface ConfigInterface {
    debugLevel: boolean;
    nodeEnv: string,
    port: number,
    redis: RedisOptions,
    apiVersion: string,
    bcryptSalt: number
}