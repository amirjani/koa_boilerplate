import { IoCContainer } from "./../../container";
import { DatabaseInterface } from "./database.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { MysqlInterface } from "../mysql";
import { RedisInterface } from "../redis";
import { LoggerInterface } from "../logger";
import { ElasticInterface } from "../elastic";
import { serviceContainer } from "../index";

@injectable()
export class DatabaseProvider implements DatabaseInterface {
  public static instance: DatabaseProvider;

  constructor(
    private mysqlInstance: MysqlInterface,
    private redisInstance: RedisInterface,
    private elasticInstance: ElasticInterface,
    private loggerInstance: LoggerInterface
  ) {}

  public static getInstance() {
    if (!DatabaseProvider.instance) {
      const mysqlInstance = IoCContainer.container.get<MysqlInterface>(
        TYPES.MysqlInterface
      );
      const redisInstance = IoCContainer.container.get<RedisInterface>(
        TYPES.RedisInterface
      );
      const elasticInstance = IoCContainer.container.get<ElasticInterface>(
        TYPES.ElasticInterface
      );
      const loggerInstance = IoCContainer.container.get<LoggerInterface>(
        TYPES.LoggerInterface
      );
      DatabaseProvider.instance = new DatabaseProvider(
        mysqlInstance,
        redisInstance,
        elasticInstance,
        loggerInstance
      );

      return DatabaseProvider.instance;
    } else {
      throw new Error("DATABASE PROVIDER FACED AN ERROR");
    }
  }

  // async init() {
  //   await Promise.all([this.mysql(), this.elasticSearch(), this.redis()]);
  // }

  // async mysql() {
  //   return await this.mysqlInstance.init();
  // }

  // async elasticSearch() {
  //   return await this.elasticInstance.init();
  // }

  // async redis() {
  //   return await this.redisInstance.init();
  // }
}
