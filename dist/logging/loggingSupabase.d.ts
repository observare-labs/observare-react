import { SupabaseClient } from "@supabase/supabase-js";
import { BrowserLoggerAPI } from "./logging";
import { SupabaseConfig, ObservareConfig, BrowserLogger } from "../types";
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
export declare class SupabaseBrowserLogger extends BrowserLoggerAPI implements BrowserLogger {
    supabase: SupabaseClient;
    supabaseConfig: SupabaseConfig;
    constructor(config: ObservareConfig, supabaseConfig: SupabaseConfig);
    /**
     * Send Logs to Observare Server
     */
    sendLogs(): Promise<void>;
}
