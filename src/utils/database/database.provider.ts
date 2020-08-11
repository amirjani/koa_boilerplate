import {DatabaseInterface} from "./database.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {MysqlInterface} from "../mysql";
import {RedisInterface} from "../redis";
import {LoggerInterface} from "../logger";
import {ElasticInterface} from "../elastic";
import {serviceContainer} from "../index";

@injectable()
export class DatabaseProvider implements DatabaseInterface{

    public static instance: DatabaseProvider;

    constructor(
        @inject(TYPES.MysqlInterface) private mysqlInstance: MysqlInterface,
        @inject(TYPES.RedisInterface) private redisInstance: RedisInterface,
        @inject(TYPES.ElasticInterface) private elasticInstance: ElasticInterface,
        @inject(TYPES.LoggerInterface) private loggerInstance: LoggerInterface,
    ) {
    }

    public static getInstance() {
        if (!DatabaseProvider.instance) {
            DatabaseProvider.instance = new DatabaseProvider(
                serviceContainer.get<MysqlInterface>(TYPES.MysqlInterface),
                serviceContainer.get<RedisInterface>(TYPES.RedisInterface),
                serviceContainer.get<ElasticInterface>(TYPES.ElasticInterface),
                serviceContainer.get<LoggerInterface>(TYPES.LoggerInterface)
            )

            return DatabaseProvider.instance;
        } else {
            throw new Error("DATABASE PROVIDER FACED AN ERROR");
        }
    }

    async init() {
        await this.mysql();
        await this.elasticSearch();
        await this.redis();
    }

    async mysql() {
        return await this.mysqlInstance.init();
    }

    async elasticSearch() {
        return await this.elasticInstance.init();
    }

    async redis() {
        return await this.redisInstance.init();
    }
}