import {ElasticInterface} from "./elastic.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {Client} from "@elastic/elasticsearch";
import {LoggerInterface} from "../logger";
import {config} from "../../config";
export {
    Client as ElasticClient,
    ClientOptions as ElasticClientOptions,
} from "@elastic/elasticsearch";


@injectable()
export class ElasticProvider implements ElasticInterface{

    private readonly elastic;

    constructor(@inject(TYPES.LoggerInterface) private logger: LoggerInterface) {
        this.elastic = new Client(config.elasticConfig);
    }

    async init() {
        try {
            await this.elastic.ping();
            this.logger.info("Elastic Search Connected")
            return this.elastic;
        } catch (error) {
            this.elastic.close();
            this.logger.log("ELASTIC SEARCH IN ERROR MODE", error);
        }
    }
}