import { Container } from "inversify";
import { ClassConstructor, Action } from "routing-controllers";

import {
  BcryptInterface,
  DatabaseInterface,
  LoggerInterface,
  RedisInterface,
  LoggerProvider,
  BcryptProvider,
  RedisProvider,
  DatabaseProvider,
} from "./utils";
import { TYPES } from "./utils/types";
import { ElasticInterface, ElasticProvider } from "./utils/elastic";
import { MysqlInterface, MysqlProvider } from "./utils/mysql";
export class IoCContainer {
  public static instance: IoCContainer;
  public static container: Container = new Container();
  public static async getInstanceAsync() {
    if (!IoCContainer.instance) {
      IoCContainer.instance = new IoCContainer();
      await IoCContainer.instance.init();
    }
    return IoCContainer.instance;
  }
  private async init() {
    IoCContainer.container.bind("Hi").toConstantValue("Hi Be To");
    IoCContainer.container
      .bind<LoggerInterface>(TYPES.LoggerInterface)
      .toConstantValue(LoggerProvider.getInstance());
    IoCContainer.container
      .bind<BcryptInterface>(TYPES.BcryptInterface)
      .toConstantValue(BcryptProvider.getInstance());
    IoCContainer.container
      .bind<RedisInterface>(TYPES.RedisInterface)
      .toConstantValue(await RedisProvider.getInstanceAsync());
    IoCContainer.container
      .bind<ElasticInterface>(TYPES.ElasticInterface)
      .toConstantValue(await ElasticProvider.getInstanceAsync());
    IoCContainer.container
      .bind<MysqlInterface>(TYPES.MysqlInterface)
      .toConstantValue(await MysqlProvider.getInstanceAsync());
  }

  public get<T>(someClass: ClassConstructor<T>, action?: Action): T {
    return IoCContainer.container.resolve<T>(someClass);
  }
}
