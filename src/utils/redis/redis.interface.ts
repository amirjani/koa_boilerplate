import IORedis from "ioredis";

export interface RedisInterface {
    init(): Promise<IORedis.Redis>;
    redis: IORedis.Redis
}