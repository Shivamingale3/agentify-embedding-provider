import env from "#config.ts";
import { readFileSync } from "node:fs";
import { Tokenizer } from "@huggingface/tokenizers";

const tokenizer = new Tokenizer(
  JSON.parse(readFileSync(env.TOKENIZER_PATH, "utf8")),
  JSON.parse(readFileSync(env.TOKENIZER_CONFIG_PATH, "utf8")),
);

const EOS_ID = tokenizer.token_to_id("</s>");
if (EOS_ID === undefined) throw new Error("Tokenizer has no </s> token");

export interface Tokenized {
  ids: number[];
  tokens: string[];
  truncated: boolean;
}

export function tokenize(text: string): Tokenized {
  const { ids, tokens } = tokenizer.encode(text);

  if (ids.length <= env.MAX_TOKENS) {
    return { ids, tokens, truncated: false };
  }

  const keep = env.MAX_TOKENS - 1;
  return {
    ids: [...ids.slice(0, keep), EOS_ID],
    tokens: [...tokens.slice(0, keep), "</s>"],
    truncated: true,
  };
}
