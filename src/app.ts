import http from "node:http";
import env from "#config.ts";

const sendJson = (res: http.ServerResponse, status: number, body: unknown) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
};

export function startServer(): http.Server {
  const server = http.createServer((req, res) => {
    const start = performance.now();
    res.on("finish", () => {
      const ms = (performance.now() - start).toFixed(1);
      console.log(`${req.method} ${req.url} ${res.statusCode} - ${ms}ms`);
    });

    if (req.method === "GET" && req.url === "/health") {
      return sendJson(res, 200, { status: "ok", env: env.ENV });
    }

    return sendJson(res, 404, { error: "Not Found" });
  });

  server.on("error", (err) => {
    console.error("❌ Server error:", err.message);
    process.exit(1);
  });

  server.listen(env.PORT, env.HOST, () => {
    console.log(`🚀 Server running on http://${env.HOST}:${env.PORT}`);
  });

  const shutdown = (signal: string) => {
    console.log(`${signal} received, shutting down...`);
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  return server;
}
