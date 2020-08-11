import { inject, injectable } from "inversify";
import { RedisInterface } from "./redis.interface";
import IORedis from "ioredis";
import { config } from "../../config";
import { TYPES } from "../types";
import { LoggerInterface } from "../logger";
import { serviceContainer } from "../index";


@injectable()
export class RedisProvider implements RedisInterface {

    public static instance;
    public redis;

    constructor(@inject(TYPES.LoggerInterface) private logger: LoggerInterface) {}

    public static getInstance() {
        if (!RedisProvider.instance) {
            RedisProvider.instance = new RedisProvider(serviceContainer.get<LoggerInterface>(TYPES.LoggerInterface));
            return RedisProvider.instance;
        } else {
            throw new Error("redis problem");
        }
    }

    async init() {
        this.redis = new IORedis(config.redis);

        try {
            await this.redis.connect();
            this.logger.log("info", `redis connected on port ${config.port}`)
            return this.redis;
        } catch (error) {
            await this.redis.quit();
        }
    }
}