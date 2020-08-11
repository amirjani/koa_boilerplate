import "reflect-metadata";
import {createKoaServer, useContainer} from "routing-controllers";
import {DatabaseInterface, RedisInterface, serviceContainer, ServiceInterface} from "./utils";
import {TYPES} from "./utils/types";
import {config} from "./config";

useContainer(serviceContainer);

const database = serviceContainer.get<RedisInterface>(TYPES.RedisInterface);

(async()=>{

    const app = createKoaServer({
        routePrefix: `/api/${config.apiVersion}`,
        controllers: [
        ]
    });

    // app.init = async () => {
        // await database.redis();
    // }

    // await app.init();

    app.listen(config.port);
})()






