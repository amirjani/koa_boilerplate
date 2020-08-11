import { RedisInterface } from "./redis";
import { LoggerInterface } from "./logger";
import { BcryptInterface } from "./bcrypt";
import { ElasticInterface } from "./elastic";
import { MysqlInterface } from "./mysql";
import { DatabaseInterface } from "./database";

const TYPES = {
    RedisInterface: Symbol.for('RedisInterface'),
    LoggerInterface: Symbol.for('LoggerInterface'),
    BcryptInterface: Symbol.for('BcryptInterface'),
    ElasticInterface: Symbol.for('ElasticInterface'),
    MysqlInterface: Symbol.for('MysqlInterface'),
    DatabaseInterface: Symbol.for('DatabaseInterface'),
}

export { TYPES };

