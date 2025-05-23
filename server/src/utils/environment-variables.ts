import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { DOT_ENV_PATH } from "./paths";

expand(config({ path: DOT_ENV_PATH }));

export const PORT: number = +(process.env.PORT ?? 3005);
export const REDIS_URI: string = process.env.REDIS_URI ?? "redis://redis:6379";
export const REDIS_PASSWORD: string | undefined = process.env.REDIS_PASSWORD;
