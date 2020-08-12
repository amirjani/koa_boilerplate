import "reflect-metadata";

import { LoggerInterface } from "./utils/logger/logger.interface";
import { createKoaServer, useContainer } from "routing-controllers";
import { config } from "./config";
import { IoCContainer } from "./container";
import { TestController } from "./controllers/testController";
import { TYPES } from "./utils/types";

(async () => {
  const IoC = await IoCContainer.getInstanceAsync();
  useContainer(IoC);

  const app = createKoaServer({
    controllers: [TestController],
  });

  app.listen(config.port, () => {
    IoCContainer.instance
      .get<LoggerInterface>(TYPES.LoggerInterface)
      .warn(`Server started at -> http://localhost:${config.port}`);
  });
})();
