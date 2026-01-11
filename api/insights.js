const setCors = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};

const parseBody = (req) => {
  if (!req.body) return {};
  if (typeof req.body === "object") return req.body;
  try {
    return JSON.parse(req.body);
  } catch (error) {
    return {};
  }
};

export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "OPENROUTER_API_KEY is missing." });
    return;
  }

  const payload = parseBody(req);
  const prompt = typeof payload.prompt === "string" ? payload.prompt.trim() : "";
  if (!prompt) {
    res.status(400).json({ error: "Prompt is required." });
    return;
  }

  const model = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";
  const referer = process.env.AI_SERVER_REFERER || "https://investverse-city.vercel.app";
  const systemPrompt =
    payload.system && typeof payload.system === "string"
      ? payload.system
      :
        "You are the Investverse City AI coach. Keep answers concise, actionable, and focused on investment and insurance education. Provide structured bullet points.";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": referer,
        "X-Title": "Investverse City",
      },
      body: JSON.stringify({
        model,
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
      res.status(response.status).json({
        error: errorPayload?.error?.message || "OpenRouter request failed.",
      });
      return;
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content ?? "";
    res.status(200).json({ text, model: data?.model || model });
  } catch (error) {
    res.status(500).json({ error: "Failed to reach OpenRouter." });
  }
}
