import "reflect-metadata";
import { createKoaServer, useContainer } from "routing-controllers";
import { serviceContainer, LoggerInterface, DatabaseInterface } from "./utils";
import { config } from "./config";
import { TestController } from "./controllers/testController";
import { inversifyAdapter, container } from "./container";
import { TYPES } from "./utils/types";

useContainer(inversifyAdapter);

(async () => {
  // logger
  const logger: LoggerInterface = container.get<LoggerInterface>(
    TYPES.LoggerInterface
  );
  logger.init();
  // all databases
  await container.get<DatabaseInterface>(TYPES.DatabaseInterface).init();

  const app = createKoaServer({
    // routePrefix: `/api/${config.apiVersion}`,
    controllers: [TestController],
  });

  app.listen(config.port, () => {
    console.info(`app started on port ${config.port}`);
  });
})();
