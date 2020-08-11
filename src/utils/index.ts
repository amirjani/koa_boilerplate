import {Container} from "inversify";
import {TYPES} from "./types";

import { RedisInterface, RedisProvider } from "./redis";
import { LoggerInterface, LoggerProvider } from "./logger";
import { ServiceInterface, ServiceProvider } from "./Service";
import { BcryptInterface, BcryptProvider } from "./bcrypt";
import { ElasticInterface, ElasticProvider } from "./elastic";
import { MysqlInterface, MysqlProvider } from "./mysql";
import {DatabaseInterface, DatabaseProvider} from "./database";

const serviceContainer = new Container();

// serviceContainer.bind<LoggerInterface>(TYPES.LoggerInterface).to(LoggerProvider);
serviceContainer.bind<RedisInterface>(TYPES.RedisInterface).to(RedisProvider);
// serviceContainer.bind<BcryptInterface>(TYPES.BcryptInterface).to(BcryptProvider);
// serviceContainer.bind<ElasticInterface>(TYPES.ElasticInterface).to(ElasticProvider);
// serviceContainer.bind<MysqlInterface>(TYPES.MysqlInterface).to(MysqlProvider);
// serviceContainer.bind<DatabaseInterface>(TYPES.DatabaseInterface).to(DatabaseProvider);
// todo: will remove
// serviceContainer.bind<ServiceInterface>(TYPES.ServiceInterface).to(ServiceProvider);

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