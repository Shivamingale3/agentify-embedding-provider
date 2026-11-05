import z from "zod";
import envSchema, { type Env } from "#validation/env.schema.ts";

let env!: Readonly<Env>;

export function validateEnv(): void {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    console.error(z.prettifyError(result.error));
    process.exit(1);
  }

  env = Object.freeze(result.data);
}

export { env as default };
