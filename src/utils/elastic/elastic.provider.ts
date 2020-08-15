import { IoCContainer } from "../../container";
import { ElasticInterface } from "./elastic.interface";
import { injectable } from "inversify";
import { TYPES } from "../types";
import { Client } from "@elastic/elasticsearch";
import { LoggerInterface } from "../logger";
import { config } from "../../config";

export {
  Client as ElasticClient,
  ClientOptions as ElasticClientOptions,
} from "@elastic/elasticsearch";

@injectable()
export class ElasticProvider implements ElasticInterface {
  private _elastic: Client;
  public get elastic(): Client {
    return this._elastic;
  }

  public static instance: ElasticProvider;

  constructor(private logger: LoggerInterface) {
    this._elastic = new Client(config.elasticConfig);
  }

  public static async getInstanceAsync() {
    if (!ElasticProvider.instance) {
      const logger = IoCContainer.container.get<LoggerInterface>(
        TYPES.LoggerInterface
      );
      ElasticProvider.instance = new ElasticProvider(logger);
      await ElasticProvider.instance.init();
      return ElasticProvider.instance;
    } else {
      throw new Error("ELASTIC DOES NOT WORK");
    }
  }

  private async init() {
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
