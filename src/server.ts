import "reflect-metadata";
import { createKoaServer, useContainer } from "routing-controllers";
import {BcryptInterface, DatabaseInterface, LoggerInterface, RedisInterface, serviceContainer} from "./utils";
import { TYPES } from "./utils/types";
import { config } from "./config";
import {ElasticInterface} from "./utils/elastic";
import {MysqlInterface} from "./utils/mysql";
import {TestController} from "./controllers/testController";
import {Container} from "inversify";
import {InversifyAdapter} from "./inversifyAdapter";

// const container = new Container();
// const inversifyAdapter = new InversifyAdapter(container);
useContainer(serviceContainer);

(async () => {

    // logger
    const logger: LoggerInterface = await serviceContainer.get<LoggerInterface>(TYPES.LoggerInterface);
    logger.init();
    // all databases
    await serviceContainer.get<DatabaseInterface>(TYPES.DatabaseInterface).init();

    const app = createKoaServer({
        // routePrefix: `/api/${config.apiVersion}`,
        controllers: [
            TestController
        ]
    });

    app.listen(config.port, () => {
        logger.info(`app started on port ${config.port}`)
    });
})()






