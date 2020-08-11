import {inject, injectable, multiInject} from "inversify";
import {ServiceInterface} from "./service.interface";
import {TYPES} from "../types";
import {RedisInterface} from "../redis";
import {LoggerInterface} from "../logger";
import {BcryptInterface} from "../bcrypt";
import {ElasticInterface} from "../elastic";

@injectable()
export class ServiceProvider implements ServiceInterface{

    constructor(
        @inject(TYPES.RedisInterface) private redis: RedisInterface,
        @inject(TYPES.LoggerInterface) private logger: LoggerInterface,
        @inject(TYPES.BcryptInterface) private bcrypt: BcryptInterface,
        @inject(TYPES.ElasticInterface) private elastic: ElasticInterface
    ) {
        this.contextAttach();
    }

    start() {
        console.log('start')
    }

    async contextAttach() {
        const redis = await this.redis.init();
        const logger = this.logger;
        const bcrypt = await this.bcrypt.comparePassword(
            '1',
            '$2y$12$WXoq5ItvTO0hKl8jWQYNkOXxGFM9DMm34SVefG1UDTDHpSrkQs8j2'
        )
        const elastic = await this.elastic.init();

    }
}