import {Get, JsonController} from "routing-controllers";
import {inject, injectable} from "inversify";
import {TYPES} from "../utils/types";
import {LoggerInterface} from "../utils/logger";
import {DatabaseInterface} from "../utils/database";
import {RedisInterface} from "../utils/redis";

@JsonController()
@injectable()
export class TestController {

    constructor(
        @inject(TYPES.LoggerInterface) private logger: LoggerInterface,
        @inject(TYPES.RedisInterface) private redisProvider: RedisInterface
    ) {}

    @Get('/')
    async getAll() {
        this.logger.info('get shit done')
        const redis = await this.redisProvider.redis.set("shit", "done");
        return {
            data: {
                user: {
                    "firstname": "Amirhossein"
                }
            },
            message: "done deal",
            status: 200
        }
    }
}