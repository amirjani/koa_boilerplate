import {Action, ClassConstructor, IocAdapter} from "routing-controllers";
import {Container} from "inversify";
import {LoggerInterface, LoggerProvider} from "./utils/logger";
import {TYPES} from "./utils/types";
import {DatabaseInterface, DatabaseProvider} from "./utils/database";
import {RedisInterface, RedisProvider, serviceContainer} from "./utils";
import {ElasticInterface, ElasticProvider} from "./utils/elastic";
import {MysqlInterface, MysqlProvider} from "./utils/mysql";

export class InversifyAdapter implements IocAdapter {

    constructor(private readonly container: Container) {}

    get<T>(someClass: ClassConstructor<T>, action?: Action): T {
        const childContainer = this.container.createChild();

        childContainer.bind<LoggerInterface>(TYPES.LoggerInterface).to(LoggerProvider);

        childContainer.bind<RedisInterface>(TYPES.RedisInterface).to(RedisProvider);
        childContainer.bind<ElasticInterface>(TYPES.ElasticInterface).to(ElasticProvider);
        childContainer.bind<MysqlInterface>(TYPES.MysqlInterface).to(MysqlProvider);

        childContainer.bind<DatabaseInterface>(TYPES.DatabaseInterface).to(DatabaseProvider);

        // childContainer.bind(API_SYMBOLS.ClientIp).toConstantValue(action.context.ip);
        return childContainer.resolve<T>(someClass);
    }

}