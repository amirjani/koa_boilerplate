import IORedis from "ioredis";

export interface RedisInterface {
  redis: IORedis.Redis;
}
