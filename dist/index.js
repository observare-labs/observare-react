"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const logging_1 = require("./logging");
const logging_2 = require("./logging");
/**
 * Observare Client
 * @param props Observare Props
 * @returns Observare Client (React Component)
 * @example
 * <ObservareClient config={config}>
 * <App />
 * </ObservareClient>
 */
class ObservareClient extends react_1.default.Component {
    config;
    children;
    logSender;
    /**
     * Constructor for Observare Client
     * @param props Observare Props
     * @returns Observare Client (React Component)
     */
    constructor(props) {
        super(props);
        this.config = this.loadDefaultConfig(props.config);
        this.children = props.children;
        this.logSender = this.config.isSupabase
            ? new logging_1.SupabaseBrowserLogger(this.config, this.config.supabaseConfig)
            : new logging_2.BrowserLoggerAPI(this.config);
    }
    /**
     *
     * @param config  User provided Config
     * @returns Default config with user provided config
     */
    loadDefaultConfig(config) {
        if (!config.url && !config.isSupabase && !config.token) {
            throw new Error("Observare URL & token is required incase Supabase is not used");
        }
        if (!config.retry)
            config.retry = true;
        if (!config.maxLogs)
            config.maxLogs = 15;
        if (!config.eager)
            config.eager = false;
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
        return (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
            let log = {
                time: new Date(),
                phase: phase,
                actualDuration: actualDuration,
                baseDuration: baseDuration,
                startTime: startTime,
                commitTime: commitTime,
                path: window.location.pathname,
                domain: window.location.hostname, // Current Domain of invoked component
            };
            this.logSender.addLog(log); // Add log to the logger
        };
    }
    render() {
        return ((0, jsx_runtime_1.jsx)(react_1.Profiler, { id: "ObservareConfig", onRender: this.onRenderWrapper(), children: this.children }));
    }
}
exports.default = ObservareClient;
