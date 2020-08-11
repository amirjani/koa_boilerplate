import "reflect-metadata";
import { createKoaServer, useContainer } from "routing-controllers";
import { DatabaseInterface, RedisInterface, serviceContainer, ServiceInterface } from "./utils";
import { TYPES } from "./utils/types";
import { config } from "./config";

useContainer(serviceContainer);

// const redis = serviceContainer.get<RedisInterface>(TYPES.RedisInterface);
const database = serviceContainer.get<DatabaseInterface>(TYPES.DatabaseInterface);

(async () => {

    const app = createKoaServer({
        routePrefix: `/api/${config.apiVersion}`,
        controllers: [
        ]
    });
    // const _redis = await redis.init()
    const redis = await database.redis();
    const elastic = await database.elasticSearch();
    const mysql = await database.mysql();

    // app.init = async () => {
    // await database.redis();
    // }

    // await app.init();

    app.listen(config.port);
})()






