import { NextResponse } from "next/server";

export const runtime = "nodejs";

function jsonError(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return jsonError("Missing ANTHROPIC_API_KEY env var on the server.", 500);

  let body;
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid JSON body.");
  }

  const prompt = typeof body?.prompt === "string" ? body.prompt : "";
  const model = typeof body?.model === "string" ? body.model : "claude-sonnet-4-20250514";
  const max_tokens = Number.isFinite(body?.max_tokens) ? body.max_tokens : 1000;

  if (!prompt.trim()) return jsonError("Missing prompt.");

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      const msg = data?.error?.message || `Anthropic error (${r.status})`;
      return jsonError(msg, 500);
    }

    const text = Array.isArray(data?.content) ? data.content.map((b) => b?.text || "").join("") : "";
    return NextResponse.json({ text });
  } catch (e) {
    return jsonError(e?.message || "Upstream request failed.", 500);
  }
}

