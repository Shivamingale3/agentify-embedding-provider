import { startServer } from "#app.ts";
import { validateEnv } from "#config.ts";
validateEnv();
startServer();
