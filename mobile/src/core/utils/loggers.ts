type LogLevel = "info" | "warn" | "error" | "debug";

interface LoggerOptions {
  level?: LogLevel;
  data?: any;
  fileName?: string;
}



/**
 * Application logger for development debugging
 * 
 * Logs formatted messages with timestamp, log level, file location, and optional data.
 * Only active in development mode (__DEV__ = true).
 * 
 * @param message - The main log message to display
 * @param options - Optional configuration object
 * @param options.level - Log severity level: "info" | "warn" | "error" | "debug" (default: "debug")
 * @param options.data - Additional data to log (objects, arrays, etc.)
 * @param options.fileName - Override the auto-detected file name
 * 
 * @example
 * // Basic usage
 * appLogger("User logged in");
 * 
 * @example
 * // With log level and data
 * appLogger("API request failed", { 
 *   level: "error", 
 *   data: { statusCode: 500, endpoint: "/api/users" } 
 * });
 * 
 * @example
 * // With custom file name
 * appLogger("State updated", { 
 *   level: "info",
 *   fileName: "userStore.ts",
 *   data: newState 
 * });
 * 
 * @returns void - Logs to console in development, no-op in production
 */
export const appLogger = (message: string, options: LoggerOptions = {}) => {
  if (!__DEV__) return;

  const { level = "debug", data, fileName } = options;

  const stack = new Error().stack?.split("\n")[2] || "";
  const file = fileName || stack.trim().split(" ")[1] || "unknown-file";
  const prefix = `[${level.toUpperCase()}]`;
  const time = new Date().toISOString();

  console.log(
    `🐛 \x1b[33m ${prefix} ${time}\nFile: ${file}\nMessage: ${message}`,
    data ? "\nData:" : "",
    data ?? ""
  );
};
