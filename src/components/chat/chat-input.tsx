"use client";

import { FormEvent, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({
  onSend,
  disabled,
}: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const message = value.trim();

    if (!message || disabled) {
      return;
    }

    onSend(message);
    setValue("");
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      const message = value.trim();

      if (!message || disabled) {
        return;
      }

      onSend(message);
      setValue("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-slate-200 bg-white p-3 sm:p-4 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2 transition-all focus-within:border-blue-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/5 dark:border-slate-800 dark:bg-slate-900 dark:focus-within:border-blue-800 dark:focus-within:bg-slate-950">
        <Textarea
          value={value}
          onChange={(event) =>
            setValue(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask AeroAssist about a customer or booking..."
          rows={2}
          disabled={disabled}
          className="min-h-[54px] resize-none border-0 bg-transparent px-2 py-2 text-sm shadow-none focus-visible:ring-0"
        />

        <div className="flex items-center justify-between px-1 pb-1 pt-2">
          <div className="hidden items-center gap-1.5 text-[10px] text-slate-400 sm:flex">
            <Sparkles className="h-3 w-3" />
            AI-powered resolution
            <span className="mx-1">·</span>
            Enter to send
          </div>

          <Button
            type="submit"
            size="icon"
            disabled={disabled || !value.trim()}
            className="ml-auto h-9 w-9 rounded-xl bg-slate-900 shadow-sm transition-all hover:bg-blue-600 disabled:opacity-40 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="mt-2 text-center text-[10px] text-slate-400">
        AeroAssist uses verified booking data and airline resolution policies.
      </p>
    </form>
  );
}