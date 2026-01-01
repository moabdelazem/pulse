import express from "express";
import { sql } from "drizzle-orm";
import pinoHttp from "pino-http";
import routes from "./routes";
import { db } from "./db";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFound";
import { logger } from "./utils/logger";

const app = express();

app.use(
  pinoHttp({
    logger,
    customLogLevel: (req, res, err) => {
      if (res.statusCode >= 500 || err) return "error";
      if (res.statusCode >= 400) return "warn";
      return "info";
    },
    customSuccessMessage: (req, res) => {
      return `${req.method} ${req.url} completed`;
    },
    customErrorMessage: (req, res, err) => {
      return `${req.method} ${req.url} failed`;
    },
    customProps: (req, res) => ({
      requestId: req.id,
      userAgent: req.headers["user-agent"],
      contentLength: res.getHeader("content-length"),
    }),
    serializers: {
      req: (req) => ({
        method: req.method,
        url: req.url,
        path: req.url?.split("?")[0],
        query: req.query,
        params: req.params,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
  })
);

app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
    });
  }
});

// API routes
app.use("/api", routes);

// 404 handler 
app.use(notFoundHandler);

// Error handler 
app.use(errorHandler);

export default app;
