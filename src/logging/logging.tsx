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
export class BrowserLoggerAPI implements BrowserLogger {
  logs: Array<BrowserLog> = new Array<BrowserLog>();
  config: ObservareConfig;
  constructor(config: ObservareConfig) {
    this.config = config;
  }

  /**
   * Add Log to Logs
   * @param log Browser Log
   */
  async addLog(log: BrowserLog) {
    this.logs.push(log);
    if (this.config.eager) {
      await this.sendLogs();
    } else if (this.logs.length >= this.config.maxLogs!) {
      await this.sendLogs();
    }
  }

  /**
   * Send Logs to Observare Server
   */
  async sendLogs() {
    await fetch(this.config.url!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: this.config.token!,
      },
      body: JSON.stringify(this.logs),
    })
      .then((res) => {
        if (res.status === 200) {
          this.logs = new Array<BrowserLog>();
        } else {
          console.error("Failed to send logs to Observare");
          if (this.config.retry) {
            this.sendLogs();
          }
        }
      })
      .catch((err) => {
        console.error("Failed to send logs to Observare");
        if (this.config.retry) {
          this.sendLogs();
        }
      });
  }
}
