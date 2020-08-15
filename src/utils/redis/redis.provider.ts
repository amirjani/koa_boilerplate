import { IoCContainer } from "../../container";
import { injectable } from "inversify";
import { RedisInterface } from "./redis.interface";
import IORedis from "ioredis";
import { config } from "../../config";
import { TYPES } from "../types";
import { LoggerInterface } from "../logger";

@injectable()
export class RedisProvider implements RedisInterface {
  public static instance;
  public redis;

  constructor(private logger: LoggerInterface) {}

  public static async getInstanceAsync() {
    if (!RedisProvider.instance) {
      const logger = IoCContainer.container.get<LoggerInterface>(
        TYPES.LoggerInterface
      );
      RedisProvider.instance = new RedisProvider(logger);
      await RedisProvider.instance.init();
      return RedisProvider.instance;
    } else {
      throw new Error("redis problem");
    }
  }

  private async init() {
    this.redis = new IORedis(config.redis);
    try {
      await this.redis.connect();
      this.logger.log("info", `redis connected on port ${config.port}`);
      return this.redis;
    } catch (error) {
      await this.redis.quit();
    }
  }
}
