import React from "react";
import { Interaction } from "scheduler/tracing";
import { BrowserLogger, ObservareConfig, ObservareProps, SupabaseConfig } from "./types";
/**
 * Observare Client
 * @param props Observare Props
 * @returns Observare Client (React Component)
 * @example
 * <ObservareClient config={config}>
 * <App />
 * </ObservareClient>
 */
declare class ObservareClient extends React.Component<ObservareProps, any> {
    config: ObservareConfig;
    children: JSX.Element;
    logSender: BrowserLogger;
    /**
     * Constructor for Observare Client
     * @param props Observare Props
     * @returns Observare Client (React Component)
     */
    constructor(props: ObservareProps);
    /**
     *
     * @param config  User provided Config
     * @returns Default config with user provided config
     */
    loadDefaultConfig(config: ObservareConfig): ObservareConfig;
    /**
     * Wrapper for onRender
     * @returns onRender function
     * @example
     * <Profiler id="ObservareConfig" onRender={this.onRenderWrapper()}>
     * {this.children}
     * </Profiler>
     */
    onRenderWrapper(): (id: string, phase: "mount" | "update", actualDuration: number, baseDuration: number, startTime: number, commitTime: number, interactions: Set<Interaction>) => void;
    render(): JSX.Element;
}
export default ObservareClient;
export type { ObservareConfig, SupabaseConfig };
