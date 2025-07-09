type EnvSchemaType = z.infer<typeof envSchema>;

declare global {
  interface ProcessEnv extends EnvSchemaType {}
}
