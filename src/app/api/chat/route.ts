import { NextResponse } from "next/server";
import { getMockAgentResponse } from "@/lib/mock-agent";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const bookingReference = body.bookingReference;
    const message = body.message;

    if (!bookingReference || !message) {
      return NextResponse.json(
        {
          error: "bookingReference and message are required",
        },
        { status: 400 },
      );
    }

    const response = getMockAgentResponse(bookingReference, message);

    return NextResponse.json({
      response,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Invalid request",
      },
      { status: 400 },
    );
  }
}
