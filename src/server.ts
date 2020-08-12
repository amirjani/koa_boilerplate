import "reflect-metadata";
import { createKoaServer, useContainer } from "routing-controllers";
import { config } from "./config";
import { IoCContainer } from "./container";
import { TestController } from "./controllers/testController";

(async () => {
  const IoC = await IoCContainer.getInstanceAsync();
  useContainer(IoC);

  const app = createKoaServer({
    controllers: [TestController],
  });

  app.listen(config.port, () => {
    console.info(`app started on port ${config.port}`);
  });
})();
