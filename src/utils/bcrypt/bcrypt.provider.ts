import { injectable } from "inversify";
import { BcryptInterface } from "./bcrypt.interface";
import bcrypt from "bcrypt";
import { config } from "../../config";
import { TYPES } from "../types";
import { LoggerInterface } from "../logger";
import { IoCContainer } from "../../container";

@injectable()
export class BcryptProvider implements BcryptInterface {
  public static instance: BcryptProvider;

  constructor(private logger: LoggerInterface) {}

  public static getInstance() {
    if (!BcryptProvider.instance) {
      const logger = IoCContainer.container.get<LoggerInterface>(
        TYPES.LoggerInterface
      );
      BcryptProvider.instance = new BcryptProvider(logger);
      return BcryptProvider.instance;
    } else {
      throw new Error("Bcrypt Problem");
    }
  }

  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, config.bcryptSalt);
  }

  public async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
