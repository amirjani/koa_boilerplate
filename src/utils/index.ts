import { Container } from "inversify";
import { TYPES } from "./types";

import { RedisInterface, RedisProvider } from "./redis";
import { LoggerInterface, LoggerProvider } from "./logger";
import { BcryptInterface, BcryptProvider } from "./bcrypt";
import { ElasticInterface, ElasticProvider } from "./elastic";
import { MysqlInterface, MysqlProvider } from "./mysql";
import { DatabaseInterface, DatabaseProvider } from "./database";
import { TestController } from "../controllers/testController";

export {
  LoggerProvider,
  RedisProvider,
  BcryptProvider,
  DatabaseProvider,
  RedisInterface,
  LoggerInterface,
  BcryptInterface,
  DatabaseInterface,
};
