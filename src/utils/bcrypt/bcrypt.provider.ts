import {inject, injectable} from "inversify";
import {BcryptInterface} from "./bcrypt.interface";
import bcrypt from "bcrypt";
import {config} from "../../config";
import {TYPES} from "../types";
import {LoggerInterface} from "../logger";
import {serviceContainer} from "../index";

@injectable()
export class BcryptProvider implements BcryptInterface{

    public static instance: BcryptProvider;

    constructor(@inject(TYPES.LoggerInterface) private logger: LoggerInterface) {}

    public static getInstance() {
        if (!BcryptProvider.instance) {
            BcryptProvider.instance = new BcryptProvider(serviceContainer.get<LoggerInterface>(TYPES.LoggerInterface));
            return BcryptProvider.instance;
        } else {
            throw new Error("Bcrypt Problem")
        }
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, config.bcryptSalt)
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}