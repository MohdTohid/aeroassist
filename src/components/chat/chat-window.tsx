"use client";

import { useState } from "react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatWindowProps {
  bookingReference: string;
  initialMessage?: string;
}

export function ChatWindow({
  bookingReference,
  initialMessage,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>(
    initialMessage
      ? [
          {
            id: crypto.randomUUID(),
            role: "user",
            content: initialMessage,
          },
        ]
      : [],
  );

  const [loading, setLoading] = useState(false);

  async function sendMessage(message: string) {
    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    setMessages((current) => [...current, userMessage]);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingReference,
          message,
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response ?? "Something went wrong.",
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I couldn't process that request. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.length === 0 && (
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <h2 className="text-lg font-semibold">
                Customer Resolution Agent
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Ask about this customer's booking or disruption.
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {loading && (
          <div className="text-sm text-muted-foreground">
            Agent is processing...
          </div>
        )}
      </div>

      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
