import {MysqlInterface} from "./mysql.interface";
import {inject} from "inversify";
import {TYPES} from "../types";
import {LoggerInterface} from "../logger";
import mysql2 from "mysql2/promise";
import {config} from "../../config";
export {
    Pool as DatabasePool,
    PoolOptions as DatabasePoolOptions,
} from "mysql2/promise";

export class MysqlProvider implements MysqlInterface {

    constructor( @inject(TYPES.LoggerInterface) private logger: LoggerInterface ) {}

    private instance: MysqlProvider;
    private pool: mysql2.Pool;

    init() {
        try {
            const pool = mysql2.createPool(config.mysqlConfig)
            this.logger.info("pool, ", pool)
        }catch (e) {

        }
    }
}