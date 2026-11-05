import { validateEnv } from "#config.ts";

validateEnv();

const { tokenize } = await import("#embedding/tokenizer.ts");

console.log(tokenize("Hello world"));
console.log(tokenize("माझं नाव शिवम आहे"));

const long = tokenize("word ".repeat(1000));
console.log(long.ids.length, long.truncated, long.tokens.at(-1));
