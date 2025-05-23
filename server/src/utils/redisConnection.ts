import { createClient, RedisClientType } from "redis";
import { REDIS_URI, REDIS_PASSWORD } from "./environment-variables";

export interface IRedisConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  getClient(): RedisClientType;
}

export class RedisConnection implements IRedisConnection {
  private client: RedisClientType | null = null;
  private static instance: RedisConnection;

  private constructor() {}

  async connect(): Promise<void> {
    try {
      if (!REDIS_URI) {
        throw new Error("REDIS_URI environment variable is not defined");
      }

      this.client = createClient({
        url: REDIS_URI,
        password: REDIS_PASSWORD || undefined,
      });

      this.client.on("error", (error) => {
        console.error("Redis Client Error", error);
      });

      this.client.on("connect", () => {
        console.log("Connected to Redis");
      });

      await this.client.connect();
    } catch (error) {
      console.error("Redis connection failed", error);
      throw error;
    }
  }

  static getInstance(): RedisConnection {
    if (!RedisConnection.instance) {
      RedisConnection.instance = new RedisConnection();
    }
    return RedisConnection.instance;
  }

  async disconnect(): Promise<void> {
    if (this.client && this.client.isOpen) {
      await this.client.quit();
      this.client = null;
      console.log("Disconnected from Redis");
    }
  }

  isConnected(): boolean {
    return this.client?.isOpen ?? false;
  }

  getClient(): RedisClientType {
    if (!this.client) {
      throw new Error("RedisClient is not initialized");
    }
    return this.client;
  }
}

export const getRedisConnection = RedisConnection.getInstance;
