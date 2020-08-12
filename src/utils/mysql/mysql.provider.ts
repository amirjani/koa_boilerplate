import mysql2 from "mysql2/promise";
import { IoCContainer } from "./../../container";
import { MysqlInterface } from "./mysql.interface";
import { injectable } from "inversify";
import { TYPES } from "../types";
import { LoggerInterface, LoggerProvider } from "../logger";
import { config } from "../../config";

export {
  Pool as DatabasePool,
  PoolOptions as DatabasePoolOptions,
} from "mysql2/promise";

@injectable()
export class MysqlProvider implements MysqlInterface {
  constructor(private logger: LoggerInterface) {}

  public static instance: MysqlProvider;
  public pool: mysql2.Pool;

  public static async getInstanceAsync() {
    if (!MysqlProvider.instance) {
      const logger = IoCContainer.instance.get(LoggerProvider);
      MysqlProvider.instance = new MysqlProvider(logger);
      await MysqlProvider.instance.init();
      return MysqlProvider.instance;
    } else {
      throw new Error("MYSQL FACED A PROBLEM");
    }
  }

  private async init() {
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
