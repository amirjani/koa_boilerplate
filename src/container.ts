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
import { Container } from "inversify";
import { InversifyAdapter } from "./inversifyAdapter";

export const container = new Container();
container.bind("Hi").toConstantValue("Hi Be To");
container
  .bind<LoggerInterface>(TYPES.LoggerInterface)
  .toConstantValue(LoggerProvider.getInstance());
container
  .bind<BcryptInterface>(TYPES.BcryptInterface)
  .toConstantValue(BcryptProvider.getInstance());
container
  .bind<RedisInterface>(TYPES.RedisInterface)
  .toConstantValue(RedisProvider.getInstance());
container
  .bind<ElasticInterface>(TYPES.ElasticInterface)
  .toConstantValue(ElasticProvider.getInstance());
container
  .bind<MysqlInterface>(TYPES.MysqlInterface)
  .toConstantValue(MysqlProvider.getInstance());
container
  .bind<DatabaseInterface>(TYPES.DatabaseInterface)
  .toConstantValue(DatabaseProvider.getInstance());

export const inversifyAdapter = new InversifyAdapter(container);
