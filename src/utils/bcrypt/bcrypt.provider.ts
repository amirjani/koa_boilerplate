import {injectable} from "inversify";
import {BcryptInterface} from "./bcrypt.interface";
import bcrypt from "bcrypt";
import {config} from "../../config";

@injectable()
export class BcryptProvider implements BcryptInterface{
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, config.bcryptSalt)
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}