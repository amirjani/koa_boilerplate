import { Container } from "inversify";
import { TYPES } from "./types";

import { RedisInterface, RedisProvider } from "./redis";
import { LoggerInterface, LoggerProvider } from "./logger";
import { BcryptInterface, BcryptProvider } from "./bcrypt";
import { ElasticInterface, ElasticProvider } from "./elastic";
import { MysqlInterface, MysqlProvider } from "./mysql";
import { DatabaseInterface, DatabaseProvider } from "./database";
import {TestController} from "../controllers/testController";

const serviceContainer = new Container();

serviceContainer.bind<LoggerInterface>(TYPES.LoggerInterface).toConstantValue(LoggerProvider.getInstance());

serviceContainer.bind<BcryptInterface>(TYPES.BcryptInterface).toConstantValue(BcryptProvider.getInstance());

serviceContainer.bind<RedisInterface>(TYPES.RedisInterface).toConstantValue(RedisProvider.getInstance());
serviceContainer.bind<ElasticInterface>(TYPES.ElasticInterface).toConstantValue(ElasticProvider.getInstance());
serviceContainer.bind<MysqlInterface>(TYPES.MysqlInterface).toConstantValue(MysqlProvider.getInstance());

serviceContainer.bind<DatabaseInterface>(TYPES.DatabaseInterface).toConstantValue(DatabaseProvider.getInstance());

serviceContainer.bind(TestController).to(TestController);



export {
    serviceContainer,

    LoggerProvider,
    RedisProvider,
    BcryptProvider,
    DatabaseProvider,

    RedisInterface,
    LoggerInterface,
    BcryptInterface,
    DatabaseInterface,
}