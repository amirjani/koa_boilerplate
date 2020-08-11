import {DatabaseInterface} from "./database.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {MysqlInterface} from "../mysql";
import {RedisInterface} from "../redis";
import {LoggerInterface} from "../logger";
import {ElasticInterface} from "../elastic";

@injectable()
export class DatabaseProvider implements DatabaseInterface{

    constructor(
        @inject(TYPES.MysqlInterface) private mysqlInstance: MysqlInterface,
        @inject(TYPES.RedisInterface) private redisInstance: RedisInterface,
        @inject(TYPES.ElasticInterface) private elasticInstance: ElasticInterface,
        @inject(TYPES.LoggerInterface) private loggerInstance: LoggerInterface,
    ) {
    }

    async mysql() {
        this.loggerInstance.log("info", "mysql started")
        return await this.mysqlInstance.init();
    }

    async elasticSearch() {
        return await this.elasticInstance.init();
    }

    async redis() {
        return await this.redisInstance.init();
    }
}