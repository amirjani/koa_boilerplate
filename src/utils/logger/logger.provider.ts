import {inject, injectable, multiInject, unmanaged} from "inversify";
import { LoggerInterface } from "./logger.interface";
import winston from "winston";
import {config} from "../../config";
import {WinstonTransport} from "./winston.transport";
import {logLevel} from "./logger.type";
import {TYPES} from "../types";

@injectable()
export class LoggerProvider implements LoggerInterface {

    private static instance:LoggerProvider;
    private logger = winston;

    constructor() {
        this.init()
    }

    public static getInstance() {
        if (!LoggerProvider.instance ) {
            LoggerProvider.instance = new LoggerProvider();
            return LoggerProvider.instance;
        }else {
            throw new Error("Logger Provider");
        }
    }

    init() {
        this.logger.configure({
            level: config.debugLevel ? "debug" : "info",
            transports: [new WinstonTransport(config.debugLevel)],
        });
    }

    public log(logLevel: logLevel, msg: string, log: never) {
        this.logger[logLevel](msg, log);
    }
    public info(msg: string, log?: never) {
        this.logger["info"](msg, log);
    }
    public error(msg: string, log?: never) {
        this.logger["error"](msg, log);
    }
    public warn(msg: string, log?: never) {
        this.logger["warn"](msg, log);
    }
    public verbose(msg: string, log?: never) {
        this.logger["verbose"](msg, log);
    }

}