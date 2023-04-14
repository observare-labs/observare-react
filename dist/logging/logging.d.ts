import { BrowserLog, BrowserLogger, ObservareConfig } from "../types";
/**
 * Browser Logger API
 * Basic Logging API for Observare. Uses API to send logs to Observare
 * @param config Observare Config
 * @returns Browser Logger API
 * @example
 * const logger = new BrowserLoggerAPI(config);
 * logger.addLog(log);
 * logger.sendLogs();
 */
export declare class BrowserLoggerAPI implements BrowserLogger {
    logs: Array<BrowserLog>;
    config: ObservareConfig;
    constructor(config: ObservareConfig);
    /**
     * Add Log to Logs
     * @param log Browser Log
     */
    addLog(log: BrowserLog): Promise<void>;
    /**
     * Send Logs to Observare Server
     */
    sendLogs(): Promise<void>;
}
