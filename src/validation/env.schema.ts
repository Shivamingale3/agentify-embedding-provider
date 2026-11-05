import z from "zod";

const envSchema = z.object({
  ENV: z.enum(["development", "staging", "production"]).default("development"),
  HOST: z.string().default("127.0.0.1"),
  PORT: z.coerce.number().default(7070),
  MODEL_PATH: z.string(),
  TOKENIZER_PATH: z.string(),
  SPARSE_PATH: z.string(),
  THREADS: z.coerce.number(),
  MAX_TOKENS: z.coerce.number(),
});
export type Env = z.infer<typeof envSchema>;

export default envSchema;
