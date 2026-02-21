import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required — set it to your PostgreSQL connection string"),
  CLERK_SECRET_KEY: z.string().min(1, "CLERK_SECRET_KEY is required — get it from your Clerk dashboard"),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
});

function parseEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    console.error(`\nMissing or invalid environment variables:\n${formatted}\n`);
    console.error("Copy .env.example to .env and fill in the required values.\n");
    process.exit(1);
  }

  return result.data;
}

export const env = parseEnv();
