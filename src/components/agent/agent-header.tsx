"use client";

import { PlaneTakeoff, ShieldCheck } from "lucide-react";

export function AgentHeader() {
  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-slate-800 dark:bg-[#07111f]/95">
      <div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
            <PlaneTakeoff className="h-5 w-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[15px] font-bold tracking-tight sm:text-base">
                AeroAssist
              </h1>

              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                AI
              </span>
            </div>

            <p className="hidden text-[11px] text-slate-400 sm:block">
              Customer Resolution Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600 sm:flex dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Verified environment
          </div>
        </div>
      </div>
    </header>
  );
}
