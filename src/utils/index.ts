import {Container} from "inversify";
import {TYPES} from "./types";

import { RedisInterface, RedisProvider } from "./redis";
import { LoggerInterface, LoggerProvider } from "./logger";
import { ServiceInterface, ServiceProvider } from "./Service";
import { BcryptInterface, BcryptProvider } from "./bcrypt";
import { ElasticInterface, ElasticProvider } from "./elastic";
import { MysqlInterface, MysqlProvider } from "./mysql";

const serviceContainer = new Container();

serviceContainer.bind<RedisInterface>(TYPES.RedisInterface).to(RedisProvider);
serviceContainer.bind<LoggerInterface>(TYPES.LoggerInterface).to(LoggerProvider);
serviceContainer.bind<BcryptInterface>(TYPES.BcryptInterface).to(BcryptProvider);
serviceContainer.bind<ElasticInterface>(TYPES.ElasticInterface).to(ElasticProvider);
serviceContainer.bind<MysqlInterface>(TYPES.MysqlInterface).to(MysqlProvider);

// todo: will remove
serviceContainer.bind<ServiceInterface>(TYPES.ServiceInterface).to(ServiceProvider);

export {
    serviceContainer,

    LoggerProvider,
    RedisProvider,
    ServiceProvider,
    BcryptProvider,

    RedisInterface,
    LoggerInterface,
    ServiceInterface,
    BcryptInterface
}