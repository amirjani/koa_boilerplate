import {inject, injectable } from "inversify";
import {ServiceInterface} from "./service.interface";
import {TYPES} from "../types";
import {LoggerInterface} from "../logger";
import {DatabaseInterface} from "../database";

@injectable()
export class ServiceProvider implements ServiceInterface{

    constructor(
        @inject(TYPES.DatabaseInterface) private database: DatabaseInterface,
        @inject(TYPES.LoggerInterface) private logger: LoggerInterface,
    ) {
        this.contextAttach();
    }

    start() {
        console.log('start')
    }

    async contextAttach() {
        const redis = await this.database.redis();

        // const mysql = await this.database.

        // await this.database.mysql()
    }
}