import "reflect-metadata";
import { createKoaServer, useContainer } from "routing-controllers";
import { config } from "./config";
import { IoCContainer } from "./container";
import { TestController } from "./controllers/testController";
import { LoggerInterface, LoggerProvider } from "./utils";

(async () => {
  const IoC = await IoCContainer.getInstanceAsync();
  useContainer(IoC);

  const app = createKoaServer({
    controllers: [TestController],
  });

  app.listen(config.port, () => {
    IoC.get(LoggerProvider).warn(
      `Server started at -> http://localhost:${config.port}`
    );
  });
})();
