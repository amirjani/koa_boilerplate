import { RedisInterface } from "./redis";
import { LoggerInterface } from "./logger";
import { BcryptInterface } from "./bcrypt/bcrypt.interface";

// todo: will remove
import { ServiceInterface } from "./Service";


const TYPES = {
    RedisInterface: Symbol.for('RedisInterface'),
    LoggerInterface: Symbol.for('LoggerInterface'),
    BcryptInterface: Symbol.for('BcryptInterface'),

    // todo: will remove
    ServiceInterface: Symbol.for('ServiceInterface'),
}

export { TYPES };

