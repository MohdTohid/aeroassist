import { NextResponse } from "next/server";

const AGENT_API_URL = process.env.AGENT_API_URL ?? "http://127.0.0.1:8000";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const pnr = typeof body.pnr === "string" ? body.pnr.trim() : "";

    const userMessage =
      typeof body.user_message === "string" ? body.user_message.trim() : "";

    if (!pnr || !userMessage) {
      return NextResponse.json(
        {
          error: "pnr and user_message are required",
        },
        {
          status: 400,
        },
      );
    }

    const agentResponse = await fetch(`${AGENT_API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pnr,
        user_message: userMessage,
      }),
      cache: "no-store",
    });

    const data = await agentResponse.json();

    if (!agentResponse.ok) {
      return NextResponse.json(
        {
          error: data?.detail ?? "The AI agent could not process the request.",
        },
        {
          status: agentResponse.status,
        },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("AeroAssist API error:", error);

    return NextResponse.json(
      {
        error: "Unable to connect to the AI agent.",
      },
      {
        status: 502,
      },
    );
  }
}
