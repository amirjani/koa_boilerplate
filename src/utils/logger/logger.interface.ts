export interface LoggerInterface {
    init();

    log(logLevel: string, msg?: string, log?: unknown): void;
    info(msg?: string, log?: unknown): void,
    error(msg?: string, log?: unknown): void,
    warn(msg?: string, log?: unknown): void;
    verbose(msg?: string, log?: unknown): void;
}