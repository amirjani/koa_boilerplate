import {Get, JsonController} from "routing-controllers";
import {inject, injectable} from "inversify";
import {TYPES} from "../utils/types";
import {LoggerInterface} from "../utils/logger";
import {DatabaseInterface} from "../utils/database";

@JsonController()
@injectable()
export class TestController {

    constructor(
        @inject(TYPES.LoggerInterface) private logger: LoggerInterface,
        @inject(TYPES.DatabaseInterface) private database: DatabaseInterface
    ) {}

    @Get('/')
    async getAll() {
        this.logger.info('amir jani is here')
        const redis = await this.database.redis();
        redis.set("shit", "done");
        return "this a test"
    }
}