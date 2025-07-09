import { object, string, enum as zEnum } from 'zod/v4';

const envSchema = object({
  BLOB_READ_WRITE_TOKEN: string(),
  DATABASE_URI: string(),
  PAYLOAD_SECRET: string(),
  PREVIEW_SECRET: string(),

  NODE_ENV: zEnum(['development', 'test', 'production']).optional(),

  VERCEL_ENV: string().optional(),
  VERCEL_PROJECT_PRODUCTION_URL: string().optional(),
  VERCEL_TARGET_ENV: string().optional(),
  VERCEL_URL: string().optional(),

  NEXT_PUBLIC_VERCEL_BRANCH_URL: string().optional(),
  NEXT_PUBLIC_VERCEL_ENV: string().optional(),
  NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: string().optional(),
  NEXT_PUBLIC_VERCEL_TARGET_ENV: string().optional(),
  NEXT_PUBLIC_VERCEL_URL: string().optional(),
});

const env = envSchema.parse(process.env);

export default env;
