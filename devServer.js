import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { readFile } from "node:fs/promises";
import sendEmailHandler from "./api/send-email.js";

const root = new URL("./", import.meta.url).pathname;
const port = Number(process.env.PORT || 4173);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function createApiResponse(response) {
  return {
    status(code) {
      response.statusCode = code;
      return this;
    },
    json(body) {
      response.setHeader("Content-Type", "application/json; charset=utf-8");
      response.end(JSON.stringify(body));
    },
  };
}

async function readJsonBody(request) {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 1_000_000) throw new Error("Request body too large");
  }
  return body ? JSON.parse(body) : {};
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const safePath = normalize(decodeURIComponent(requestedPath)).replace(/^(\.\.(\/|\\|$))+/, "");
  const filePath = join(root, safePath);

  try {
    const file = await readFile(filePath);
    response.statusCode = 200;
    response.setHeader("Content-Type", contentTypes[extname(filePath)] || "application/octet-stream");
    response.end(file);
  } catch (error) {
    response.statusCode = error?.code === "ENOENT" ? 404 : 500;
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    response.end(response.statusCode === 404 ? "Not found" : "Local server error");
  }
}

const server = createServer(async (request, response) => {
  try {
    if (request.url === "/api/send-email") {
      request.body = await readJsonBody(request);
      await sendEmailHandler(request, createApiResponse(response));
      return;
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      response.statusCode = 405;
      response.end("Method not allowed");
      return;
    }

    await serveStatic(request, response);
  } catch (error) {
    console.error("Local development server error:", error?.message || error);
    if (!response.headersSent) {
      response.statusCode = 400;
      response.setHeader("Content-Type", "application/json; charset=utf-8");
    }
    response.end(JSON.stringify({ error: "Invalid request" }));
  }
});

server.listen(port, () => {
  console.log(`One Small Seed local development server: http://localhost:${port}`);
});
