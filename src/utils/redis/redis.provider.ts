import {inject, injectable} from "inversify";
import { RedisInterface } from "./redis.interface";
import IORedis from "ioredis";
import {config} from "../../config";
import {logger} from "@typegoose/typegoose/lib/logSettings";
import {TYPES} from "../types";
import {LoggerInterface} from "../logger";
import {serviceContainer} from "../index";


@injectable()
export class RedisProvider implements RedisInterface {

    public static Instance;
    private redis;

    constructor() {
        return RedisProvider.getInstance();
    }
    public static getInstance(){
        if(!RedisProvider.Instance){
            RedisProvider.Instance = new RedisProvider();
            return RedisProvider.Instance;
        } else {
            throw new Error("SHit 2");

        }
    }
    async init() {
        console.log('s');
        this.redis = new IORedis(config.redis);

        try {
            await this.redis.connect();
            // this.logger.info(`redis connect on port ${config.redis.port}`)
            return this.redis;
        } catch (error){
            await this.redis.quit();
            // console.log("error ", error)
        }
    }
}