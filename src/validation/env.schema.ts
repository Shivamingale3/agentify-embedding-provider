import z from "zod";

const envSchema = z.object({
  ENV: z.enum(["development", "staging", "production"]).default("development"),
  HOST: z.string().default("127.0.0.1"),
  PORT: z.coerce.number().int().positive().max(65535).default(7070),
  MODEL_PATH: z.string(),
  TOKENIZER_PATH: z.string(),
  TOKENIZER_CONFIG_PATH: z.string(),
  SPARSE_PATH: z.string(),
  THREADS: z.coerce.number().int().positive().default(3),
  MAX_TOKENS: z.coerce.number().int().positive().default(512),
});
export type Env = z.infer<typeof envSchema>;

export default envSchema;
