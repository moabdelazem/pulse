import dotenv from "dotenv";

dotenv.config({ quiet: true });

type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  logLevel: LogLevel;
}

const config: Config = {
  port: Number(process.env.PORT) || 3333,
  nodeEnv: process.env.NODE_ENV || "development",
  databaseUrl: process.env.DATABASE_URL || "",
  logLevel: (process.env.LOG_LEVEL as LogLevel) || "info",
};

export default config;
