import { validateEnv } from "#config.ts";

validateEnv();

const { startServer } = await import("#app.ts");
startServer();
