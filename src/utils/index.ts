import { Container } from "inversify";
import { TYPES } from "./types";

import { RedisInterface, RedisProvider } from "./redis";
import { LoggerInterface, LoggerProvider } from "./logger";
import { ServiceInterface, ServiceProvider } from "./Service";
import { BcryptInterface, BcryptProvider } from "./bcrypt";
import { ElasticInterface, ElasticProvider } from "./elastic";
import { MysqlInterface, MysqlProvider } from "./mysql";
import { DatabaseInterface, DatabaseProvider } from "./database";

const serviceContainer = new Container();

serviceContainer.bind<LoggerInterface>(TYPES.LoggerInterface).toConstantValue(LoggerProvider.getInstance());
serviceContainer.bind<RedisInterface>(TYPES.RedisInterface).toConstantValue(RedisProvider.getInstance());
serviceContainer.bind<BcryptInterface>(TYPES.BcryptInterface).toConstantValue(BcryptProvider.getInstance());
serviceContainer.bind<ElasticInterface>(TYPES.ElasticInterface).toConstantValue(ElasticProvider.getInstance());
serviceContainer.bind<MysqlInterface>(TYPES.MysqlInterface).toConstantValue(MysqlProvider.getInstance());
serviceContainer.bind<DatabaseInterface>(TYPES.DatabaseInterface).to(DatabaseProvider);
// todo: will remove
serviceContainer.bind<ServiceInterface>(TYPES.ServiceInterface).to(ServiceProvider);

export {
    serviceContainer,

    LoggerProvider,
    RedisProvider,
    ServiceProvider,
    BcryptProvider,
    DatabaseProvider,

    RedisInterface,
    LoggerInterface,
    ServiceInterface,
    BcryptInterface,
    DatabaseInterface,
}