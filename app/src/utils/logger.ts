import pino from "pino";
import config from "../config/config";

export const logger = pino({
  level: config.logLevel,
  transport:
    config.nodeEnv === "development"
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        }
      : undefined,
  base: {
    env: config.nodeEnv,
  },
});

// Create child loggers for different modules
export const createLogger = (module: string) => logger.child({ module });
