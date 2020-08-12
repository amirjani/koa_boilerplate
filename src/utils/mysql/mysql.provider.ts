import { container } from "./../../container";
import { MysqlInterface } from "./mysql.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { LoggerInterface } from "../logger";
import mysql2 from "mysql2/promise";
import { config } from "../../config";
import { logger } from "@typegoose/typegoose/lib/logSettings";
import { serviceContainer } from "../index";
export {
  Pool as DatabasePool,
  PoolOptions as DatabasePoolOptions,
} from "mysql2/promise";

@injectable()
export class MysqlProvider implements MysqlInterface {
  constructor(private logger: LoggerInterface) {}

  public static instance: MysqlProvider;
  private pool: mysql2.Pool;

  public static getInstance() {
    if (!MysqlProvider.instance) {
      const logger = container.get<LoggerInterface>(TYPES.LoggerInterface);
      MysqlProvider.instance = new MysqlProvider(logger);
      return MysqlProvider.instance;
    } else {
      throw new Error("MYSQL FACED A PROBLEM");
    }
  }

  async init() {
    try {
      this.pool = mysql2.createPool(config.mysqlConfig);
      await this.pool.execute("SELECT 1 + 1 AS Result");
      this.logger.info("Database connected");
      return this.pool;
    } catch (e) {
      this.logger.error("DATABASE FACED AN ERROR");
    }
  }
}
