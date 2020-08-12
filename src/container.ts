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
  // public static instance: IoCContainer;

  private static _instance: IoCContainer;
  public static get instance(): IoCContainer {
    if (!this._instance) {
      throw Error(
        "IoCContainer Not initiated yet, call getInstanceAsync first"
      );
    } else {
      return this._instance;
    }
  }

  public container: Container = new Container();
  /**
   * To initiate IoC system this function must be called at the very first of application
   * before Server app initiation
   */
  public static async getInstanceAsync() {
    if (!IoCContainer._instance) {
      IoCContainer._instance = new IoCContainer();
      await IoCContainer.instance.init();
    }
    return IoCContainer.instance;
  }
  private async init() {
    this.container.bind("Hi").toConstantValue("Hi Be To");
    this.container
      .bind<LoggerInterface>(TYPES.LoggerInterface)
      .toConstantValue(LoggerProvider.getInstance());
    this.container
      .bind<BcryptInterface>(TYPES.BcryptInterface)
      .toConstantValue(BcryptProvider.getInstance());
    this.container
      .bind<RedisInterface>(TYPES.RedisInterface)
      .toConstantValue(await RedisProvider.getInstanceAsync());
    this.container
      .bind<ElasticInterface>(TYPES.ElasticInterface)
      .toConstantValue(await ElasticProvider.getInstanceAsync());
    this.container
      .bind<MysqlInterface>(TYPES.MysqlInterface)
      .toConstantValue(await MysqlProvider.getInstanceAsync());
  }
  public get<T>(some: ClassConstructor<T> | symbol, action?: Action): T {
    if (typeof some === "symbol") {
      return this.container.get<T>(some);
    } else if (typeof some === "function") {
      return this.container.resolve<T>(some);
    }
  }
}
