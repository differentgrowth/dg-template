/** biome-ignore-all lint/style/useNamingConvention: env vars convention */
declare global {
  type ProcessEnv = {
    AUTOLOGIN: string;

    BLOB_READ_WRITE_TOKEN: string;
    DATABASE_URI: string;
    PAYLOAD_SECRET: string;
    PREVIEW_SECRET: string;
    RESEND_API_KEY: string;

    NODE_ENV: string;

    VERCEL_ENV: string;
    VERCEL_PROJECT_PRODUCTION_URL: string;
    VERCEL_TARGET_ENV: string;
    VERCEL_URL: string;

    NEXT_PUBLIC_VERCEL_BRANCH_URL: string;
    NEXT_PUBLIC_VERCEL_ENV: string;
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: string;
    NEXT_PUBLIC_VERCEL_TARGET_ENV: string;
    NEXT_PUBLIC_VERCEL_URL: string;
  };
}
