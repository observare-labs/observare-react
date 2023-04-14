/**
 * Observare Config Interface: This is the interface for the Observare config
 * One of the following is required:
 *  - `url` & `token`
 *  - `isSupabase` & `supabaseConfig`
 * @param retry Whether to retry sending logs in case of failure. Defaults to true
 * @param url The URL of the Observare API
 * @param token The token for the Observare API
 * @param eager Whether to send logs eagerly or not. When set to false, logs are sent when the number of logs reaches `maxLogs`. Defaults to false. It's better to set this to false during production.
 * @param maxLogs The maximum number of logs to send at once. Defaults to 15
 * @param isSupabase Whether to use Supabase or not
 * @param supabaseConfig The config for Supabase
 */
export interface ObservareConfig {
  retry?: boolean;
  url?: string;
  token?: string;
  eager: boolean;
  maxLogs?: number;
  isSupabase?: boolean;
  supabaseConfig?: SupabaseConfig;
}

/**
 * Browser Logger Interface: This is the interface for the browser logger
 * @param logs The logs to be sent
 * @param config The Observare config
 * @param addLog Adds a log to the logs array
 * @param sendLogs Sends the logs to the Observare API
 * @example
 * const logger = new BrowserLoggerAPI(config);
 * logger.addLog(log);
 * logger.sendLogs();
 * @example
 * const logger = new SupabaseBrowserLogger(config, supabaseConfig);
 * logger.addLog(log);
 * logger.sendLogs(); // Sends logs to Supabase
 */
export interface BrowserLogger {
  logs: Array<BrowserLog>;
  config: ObservareConfig;
  addLog(log: BrowserLog): void;
  sendLogs(): void;
}

/**
 * Browser Log Interface: This is the interface for the browser logger
 * @param time The time the log was created
 * @param phase The phase of the log (mount, update, unmount)
 * @param actualDuration The actual duration of the log (in ms)
 * @param baseDuration The base duration of the log (in ms)
 * @param startTime The start time of the log (in ms)
 * @param commitTime The commit time of the log (in ms)
 * @param path The path of the log
 * @param domain The domain of the log
 */
export interface BrowserLog {
  time: Date;
  phase: String;
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
  path: String;
  domain: String;
}

/**
 * Observare Props Interface: This is the interface for the Observare props
 * @param config The Observare config
 * @param children The children of the Observare component. Any component that needs to be logged should be wrapped in this component
 */
export interface ObservareProps {
  config: ObservareConfig;
  children: JSX.Element;
}

/**
 * Supabase Config Interface: This is the interface for the Supabase config
 * @param url The URL of the Supabase instance
 * @param key The key of the Supabase instance
 * @param loggingTable The table to log to
 */
export interface SupabaseConfig {
  url: string;
  key: string;
  loggingTable: string;
}
