import { Action, ClassConstructor, IocAdapter } from "routing-controllers";
import { Container } from "inversify";
import { LoggerInterface, LoggerProvider } from "./utils/logger";
import { TYPES } from "./utils/types";
import { DatabaseInterface, DatabaseProvider } from "./utils/database";
import { RedisInterface, RedisProvider, serviceContainer } from "./utils";
import { ElasticInterface, ElasticProvider } from "./utils/elastic";
import { MysqlInterface, MysqlProvider } from "./utils/mysql";

export class InversifyAdapter implements IocAdapter {
  constructor(private readonly container: Container) {}

  get<T>(someClass: ClassConstructor<T>, action?: Action): T {
    return this.container.resolve<T>(someClass);
  }
}
