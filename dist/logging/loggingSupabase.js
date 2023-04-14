"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseBrowserLogger = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const logging_1 = require("./logging");
/**
 * Supabase Browser Logger
 * Uses Supabase to send logs to Observare
 * @param config Observare Config
 * @param supabaseConfig Supabase Config
 * @returns Supabase Browser Logger
 * @example
 * const logger = new SupabaseBrowserLogger(config, supabaseConfig);
 * logger.addLog(log);
 * logger.sendLogs();
 */
class SupabaseBrowserLogger extends logging_1.BrowserLoggerAPI {
    supabase;
    supabaseConfig;
    constructor(config, supabaseConfig) {
        super(config);
        this.supabase = (0, supabase_js_1.createClient)(supabaseConfig.url, supabaseConfig.key);
        this.supabaseConfig = supabaseConfig;
    }
    /**
     * Send Logs to Observare Server
     */
    async sendLogs() {
        await this.supabase
            .from(this.supabaseConfig.loggingTable)
            .insert(this.logs);
        this.logs = new Array();
    }
}
exports.SupabaseBrowserLogger = SupabaseBrowserLogger;
