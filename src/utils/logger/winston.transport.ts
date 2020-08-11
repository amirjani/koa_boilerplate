import Transport from "winston-transport";
import moment from "moment";

export class WinstonTransport extends Transport {
    private readonly colors;

    constructor(private readonly DebugMode: boolean) {
        super();

        this.colors = {
            info: "\x1b[36m",
            error: "\x1b[31m",
            warn: "\x1b[33m",
            verbose: "\x1b[43m",

        };
    }

    log(info: never, callback: Function) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { level, message, stack } = info;
        setImmediate(() => this.emit("logged", info));
        this.DebugMode
            ? console.log(
            `${this.colors[level]}${level}\t${moment().format(
                "Y-M-D-hh:mm:ss"
            )}\t${message}\x1b[0m`,
            stack ? "\n" + stack : ""
            )
            : console.log(message, stack ? stack : "");
        if (callback) {
            callback();
        }
    };
}