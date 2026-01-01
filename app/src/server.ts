import app from "./app";
import config from "./config/config";
import { pool } from "./db";
import { logger } from "./utils/logger";

const server = app.listen(config.port, () => {
  console.log(`
██████╗ ██╗   ██╗██╗     ███████╗███████╗
██╔══██╗██║   ██║██║     ██╔════╝██╔════╝
██████╔╝██║   ██║██║     ███████╗█████╗  
██╔═══╝ ██║   ██║██║     ╚════██║██╔══╝  
██║     ╚██████╔╝███████╗███████║███████╗
╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝
`)
  logger.info({ port: config.port }, "Server started");
});

const gracefulShutdown = async (signal: string) => {
  logger.info({ signal }, "Received shutdown signal");

  server.close(async () => {
    logger.info("HTTP server closed");

    try {
      await pool.end();
      logger.info("Database pool closed");
      process.exit(0);
    } catch (error) {
      logger.error({ error }, "Error closing database pool");
      process.exit(1);
    }
  });

  // Force exit after 10 seconds if graceful shutdown fails
  setTimeout(() => {
    logger.error("Graceful shutdown timed out, forcing exit");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
