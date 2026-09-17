"use client";

import { useState } from "react";
import {
  Bot,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";

import type {
  ChatMessage as ChatMessageType,
  ChatResponse,
} from "@/types/chat";

export function ChatWindow() {
  const [messages, setMessages] = useState<
    ChatMessageType[]
  >([]);

  const [pnr, setPnr] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(message: string) {
    const userMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(pnr ? { pnr } : {}),
          user_message: message,
        }),
      });

      const data =
        (await response.json()) as
          | ChatResponse
          | { error?: string };

      if (!response.ok) {
        throw new Error(
          "error" in data
            ? data.error
            : "Agent request failed.",
        );
      }

      const agentResponse = data as ChatResponse;

      /*
       * Once the backend returns a verified PNR,
       * keep it as the conversation's booking context.
       */
      if (agentResponse.pnr) {
        setPnr(agentResponse.pnr);
      }

      const assistantMessage: ChatMessageType = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: agentResponse.reply,
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(error);

      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I couldn't connect to the resolution agent. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-full min-h-[calc(100vh-150px)] flex-col">
      {/* Chat header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5 sm:px-5 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm">
            <Bot className="h-4.5 w-4.5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold">
                AeroAssist
              </h2>

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>

            <p className="text-[11px] text-slate-400">
              Customer resolution agent
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-1.5 text-[10px] text-slate-400 sm:flex">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          Secure session
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        {messages.length === 0 ? (
          <div className="flex min-h-full items-center justify-center">
            <div className="w-full max-w-md text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-500/20">
                <MessageCircle className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                How can I help?
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Start a conversation naturally. AeroAssist will
                ask for the information it needs to resolve the
                customer's request.
              </p>

              <div className="mt-6 grid gap-2 text-left sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-medium">
                    Start with
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    “Hi”
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs font-medium">
                    Or describe
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    your flight issue
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-5">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                  <Bot className="h-4 w-4" />
                </div>

                <div className="rounded-2xl rounded-bl-md border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ChatInput
        onSend={sendMessage}
        disabled={loading}
      />
    </div>
  );
}