import {inject, injectable} from "inversify";
import { RedisInterface } from "./redis.interface";
import IORedis from "ioredis";
import {config} from "../../config";
import {logger} from "@typegoose/typegoose/lib/logSettings";
import {TYPES} from "../types";
import {LoggerInterface} from "../logger";


@injectable()
export class RedisProvider implements RedisInterface {

    private redis;

    constructor(@inject(TYPES.LoggerInterface) private logger: LoggerInterface ) {
        // this.init()
    }

    async init() {
        this.redis = new IORedis(config.redis);
        try {
            await this.redis.connect();
            this.logger.info(`redis connect on port ${config.redis.port}`)
            return this.redis;
        } catch (error){
            await this.redis.quit();
            console.log("error ", error)
        }
    }
}