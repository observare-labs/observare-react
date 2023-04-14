import React, { Profiler } from "react";
import { Interaction } from "scheduler/tracing";
import { SupabaseBrowserLogger } from "./logging";
import { BrowserLoggerAPI } from "./logging";
import {
  BrowserLog,
  BrowserLogger,
  ObservareConfig,
  ObservareProps,
  SupabaseConfig,
} from "./types";

/**
 * Observare Client
 * @param props Observare Props
 * @returns Observare Client (React Component)
 * @example
 * <ObservareClient config={config}>
 * <App />
 * </ObservareClient>
 */
class ObservareClient extends React.Component<ObservareProps, any> {
  config: ObservareConfig;
  children: JSX.Element;
  logSender: BrowserLogger;

  /**
   * Constructor for Observare Client
   * @param props Observare Props
   * @returns Observare Client (React Component)
   */
  constructor(props: ObservareProps) {
    super(props);
    this.config = this.loadDefaultConfig(props.config);
    this.children = props.children;
    this.logSender = this.config.isSupabase
      ? new SupabaseBrowserLogger(this.config, this.config.supabaseConfig!)
      : new BrowserLoggerAPI(this.config);
  }

  /**
   *
   * @param config  User provided Config
   * @returns Default config with user provided config
   */
  loadDefaultConfig(config: ObservareConfig) {
    if (!config.url && !config.isSupabase && !config.token) {
      throw new Error(
        "Observare URL & token is required incase Supabase is not used"
      );
    }
    if (!config.retry) config.retry = true;
    if (!config.maxLogs) config.maxLogs = 15;
    if (!config.eager) config.eager = false;
    if (config.isSupabase && !config.supabaseConfig) {
      throw new Error("Supabase config is required incase Supabase is used");
    }
    return config;
  }

  /**
   * Wrapper for onRender
   * @returns onRender function
   * @example
   * <Profiler id="ObservareConfig" onRender={this.onRenderWrapper()}>
   * {this.children}
   * </Profiler>
   */
  onRenderWrapper() {
    return (
      id: string,
      phase: "mount" | "update",
      actualDuration: number,
      baseDuration: number,
      startTime: number,
      commitTime: number,
      interactions: Set<Interaction>
    ) => {
      let log: BrowserLog = {
        time: new Date(),
        phase: phase,
        actualDuration: actualDuration,
        baseDuration: baseDuration,
        startTime: startTime,
        commitTime: commitTime,
        path: window.location.pathname, // Current Path of invoked component
        domain: window.location.hostname, // Current Domain of invoked component
      };
      this.logSender.addLog(log); // Add log to the logger
    };
  }

  render() {
    return (
      <Profiler id="ObservareConfig" onRender={this.onRenderWrapper()}>
        {this.children}
      </Profiler>
    );
  }
}

export default ObservareClient;
export type { ObservareConfig, SupabaseConfig };
