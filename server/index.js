import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

const loadEnvFile = (path) => {
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf8");
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const idx = trimmed.indexOf("=");
    if (idx === -1) return;
    const key = trimmed.slice(0, idx).trim();
    if (process.env[key]) return;
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  });
};

loadEnvFile(resolve(rootDir, ".env.local"));
loadEnvFile(resolve(rootDir, ".env"));

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
const PORT = Number(process.env.AI_SERVER_PORT || 8787);
const ALLOWED_ORIGIN = process.env.AI_SERVER_ORIGIN || "*";
const REFERER = process.env.AI_SERVER_REFERER || "http://localhost:8080";

const setCors = (res) => {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const readBody = (req, limit = 20000) =>
  new Promise((resolveBody, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > limit) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => resolveBody(data));
    req.on("error", reject);
  });

const sendJson = (res, status, payload) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload));
};

const server = createServer(async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === "/api/health" && req.method === "GET") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.url === "/api/insights" && req.method === "POST") {
    if (!OPENROUTER_API_KEY) {
      sendJson(res, 500, { error: "OPENROUTER_API_KEY is missing." });
      return;
    }

    let payload;
    try {
      const rawBody = await readBody(req);
      payload = JSON.parse(rawBody || "{}");
    } catch (error) {
      sendJson(res, 400, { error: "Invalid JSON payload." });
      return;
    }

    const prompt = typeof payload.prompt === "string" ? payload.prompt.trim() : "";
    if (!prompt) {
      sendJson(res, 400, { error: "Prompt is required." });
      return;
    }

    const systemPrompt =
      payload.system && typeof payload.system === "string"
        ? payload.system
        :
          "You are the Investverse City AI coach. Keep answers concise, actionable, and focused on investment and insurance education. Provide structured bullet points.";

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": REFERER,
          "X-Title": "Investverse City",
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
          temperature: 0.4,
          max_tokens: 420,
        }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        sendJson(res, response.status, {
          error: errorPayload?.error?.message || "OpenRouter request failed.",
        });
        return;
      }

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content ?? "";
      sendJson(res, 200, { text, model: data?.model || OPENROUTER_MODEL });
    } catch (error) {
      sendJson(res, 500, { error: "Failed to reach OpenRouter." });
    }

    return;
  }

  sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`AI server listening on http://localhost:${PORT}`);
});
