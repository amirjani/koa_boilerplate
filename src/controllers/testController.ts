import { MysqlInterface } from "./../utils/mysql/mysql.interface";
import { Get, JsonController } from "routing-controllers";
import { inject, injectable } from "inversify";
import { TYPES } from "../utils/types";
import { LoggerInterface } from "../utils/logger";
import { RedisInterface } from "../utils/redis";

@JsonController()
@injectable()
export class TestController {
  constructor(
    @inject("Hi") private sayHI,
    @inject(TYPES.LoggerInterface) private logger: LoggerInterface,
    @inject(TYPES.RedisInterface) private redisProvider: RedisInterface,
    @inject(TYPES.MysqlInterface) private mysqlProvider: MysqlInterface
  ) {}

  @Get("/")
  async getAll() {
    this.logger.info("get shit done");
    const redis = await this.redisProvider.redis.set("shit", "done");
    const result = await this.mysqlProvider.pool.execute("SELECT 1+1");
    return {
      redis,
      result,
      hi: this.sayHI,
      data: {
        user: {
          firstname: "Amirhossein",
        },
      },
      message: "done deal",
      status: 200,
    };
  }
}
