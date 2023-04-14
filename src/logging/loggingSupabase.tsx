import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { BrowserLoggerAPI } from "./logging";
import {
  SupabaseConfig,
  ObservareConfig,
  BrowserLogger,
  BrowserLog,
} from "../types";

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
export class SupabaseBrowserLogger
  extends BrowserLoggerAPI
  implements BrowserLogger
{
  supabase: SupabaseClient;
  supabaseConfig: SupabaseConfig;

  constructor(config: ObservareConfig, supabaseConfig: SupabaseConfig) {
    super(config);
    this.supabase = createClient(supabaseConfig.url, supabaseConfig.key);
    this.supabaseConfig = supabaseConfig;
  }

  /**
   * Send Logs to Observare Server
   */
  async sendLogs() {
    await this.supabase
      .from(this.supabaseConfig.loggingTable)
      .insert(this.logs);
    this.logs = new Array<BrowserLog>();
  }
}
