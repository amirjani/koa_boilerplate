import { container } from "./../../container";
import { ElasticInterface } from "./elastic.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { Client } from "@elastic/elasticsearch";
import { LoggerInterface } from "../logger";
import { config } from "../../config";
import { serviceContainer } from "../index";
export {
  Client as ElasticClient,
  ClientOptions as ElasticClientOptions,
} from "@elastic/elasticsearch";

@injectable()
export class ElasticProvider implements ElasticInterface {
  private readonly elastic;
  public static instance: ElasticProvider;

  constructor(private logger: LoggerInterface) {
    this.elastic = new Client(config.elasticConfig);
  }

  public static getInstance() {
    if (!ElasticProvider.instance) {
      const logger = container.get<LoggerInterface>(TYPES.LoggerInterface);
      ElasticProvider.instance = new ElasticProvider(logger);
      return ElasticProvider.instance;
    } else {
      throw new Error("ELASTIC DOES NOT WORK");
    }
  }

  async init() {
    try {
      await this.elastic.ping();
      this.logger.info(`elasticsearch connected`);
      return this.elastic;
    } catch (error) {
      this.elastic.close();
      this.logger.log("ELASTIC SEARCH IN ERROR MODE", error);
    }
  }
}
