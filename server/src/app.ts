import express, { NextFunction, Request, Response } from "express";

import basketRouter from "./routers/basket.router";
import cors from "cors";
import helmet from "helmet";
import { PORT } from "./utils/environment-variables";
import { RedisConnection } from "./utils/redisConnection";

const app = express();

app.use(express.json());
app.use(
  cors({
    methods: ["GET", "DELETE", "POST", "PUT"],
    origin: ["http://localhost:3005"],
    credentials: true,
  })
);
app.use(helmet());
// connect to redis
RedisConnection.getInstance().connect();

app.use("/", basketRouter);

// Health check route
app.get("/health", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check Redis connection by performing a simple operation
    await RedisConnection.getInstance().getClient().ping();
    res.status(200).json({ message: "OK", redis: "Connected" });
  } catch (error) {
    // If Redis ping fails, pass the error to the error-handling middleware
    next(error);
  }
});
// error handling
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(400).json({ message: error.message });
});

app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
