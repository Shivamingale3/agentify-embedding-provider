import envSchema, { type Env } from "#validation/env.schema.ts";
import z from "zod";

let validated: Readonly<Env> | undefined;

export function validateEnv(): Readonly<Env> {
  if (validated) return validated;

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("❌ Invalid environment variables:");
    console.error(z.prettifyError(result.error));
    process.exit(1);
  }

  validated = Object.freeze(result.data);
  return validated;
}

const env = new Proxy({} as Readonly<Env>, {
  get(_target, key) {
    if (!validated) {
      throw new Error(
        `env.${String(key)} was read before validateEnv() ran. Call validateEnv() at startup first.`,
      );
    }
    return validated[key as keyof Env];
  },
});

export default env;
