import "reflect-metadata";
import {createKoaServer, useContainer} from "routing-controllers";
import {serviceContainer, ServiceInterface} from "./utils";
import {TYPES} from "./utils/types";

useContainer(serviceContainer);

serviceContainer.get<ServiceInterface>(TYPES.ServiceInterface);


const app = createKoaServer({
    // routePrefix: `/api/${dotenv.API_VERSION}`,
    // controllers: [
    //
    // ]
});





