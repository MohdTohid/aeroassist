import { Bot, UserRound } from "lucide-react";

import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div
        className={`max-w-[88%] sm:max-w-[75%] ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`mb-1 px-1 text-[10px] font-medium uppercase tracking-wider ${
            isUser ? "text-right text-slate-400" : "text-slate-400"
          }`}
        >
          {isUser ? "You" : "AeroAssist"}
        </div>

        <div
          className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? "rounded-br-md bg-slate-900 text-white shadow-sm dark:bg-blue-600"
              : "rounded-bl-md border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          }`}
        >
          {message.content}
        </div>
      </div>

      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <UserRound className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
