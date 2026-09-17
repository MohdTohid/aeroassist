"use client";

import { customers, bookings } from "@/data/customers";

import { ChatWindow } from "@/components/chat/chat-window";
import { AgentHeader } from "@/components/agent/agent-header";
import { AgentStatus } from "@/components/agent/agent-status";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Copy,
  Plane,
  UserRound,
} from "lucide-react";

function getStatusClasses(status: string) {
  switch (status) {
    case "Cancelled":
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300";

    case "Delayed":
      return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300";

    default:
      return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300";
  }
}

function copyText(value: string) {
  if (typeof navigator !== "undefined") {
    navigator.clipboard.writeText(value);
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f8fc] text-slate-950 dark:bg-[#07111f] dark:text-white">
      <AgentHeader />

      <div className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
                Resolution Workspace
              </h1>

              <AgentStatus />
            </div>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              AI-assisted customer support with verified booking context.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex dark:text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            System operational
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[290px_minmax(0,1fr)_310px]">
          {/* LEFT — DEMO DATA */}
          <aside className="order-2 lg:order-1">
            <div className="sticky top-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
              <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                    <UserRound className="h-4 w-4" />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold">
                      Demo Customer Data
                    </h2>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Reference only
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-4">
                {customers.map((customer) => {
                  const booking = bookings.find(
                    (item) =>
                      item.bookingReference === customer.bookingReference,
                  );

                  const flight = booking?.flights[0];

                  if (!flight) {
                    return null;
                  }

                  return (
                    <div
                      key={customer.bookingReference}
                      className="group rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition-all hover:border-blue-200 hover:bg-blue-50/30 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-900"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {customer.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                            {customer.loyaltyTier} member
                          </p>
                        </div>

                        <Badge
                          variant="outline"
                          className={`shrink-0 text-[10px] ${getStatusClasses(
                            flight.status,
                          )}`}
                        >
                          {flight.status}
                        </Badge>
                      </div>

                      <div className="mt-4 rounded-lg border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-950">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                            PNR
                          </span>

                          <button
                            type="button"
                            onClick={() => copyText(customer.bookingReference)}
                            className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800"
                            title="Copy PNR"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <p className="mt-1 select-all font-mono text-sm font-semibold tracking-wide">
                          {customer.bookingReference}
                        </p>
                      </div>

                      <div className="mt-3 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Plane className="h-3.5 w-3.5" />
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            {flight.flightNumber}
                          </span>
                          <ChevronRight className="h-3 w-3" />
                          <span>{flight.route}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>{flight.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock3 className="h-3.5 w-3.5" />
                          <span>{flight.scheduledDeparture}</span>

                          {flight.newDeparture && (
                            <>
                              <ChevronRight className="h-3 w-3" />
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                {flight.newDeparture}
                              </span>
                            </>
                          )}
                        </div>

                        {flight.delayHours !== undefined &&
                          flight.delayHours > 0 && (
                            <div className="pt-1 font-medium text-amber-600 dark:text-amber-400">
                              {flight.delayHours}-hour delay
                            </div>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-slate-100 px-5 py-3 dark:border-slate-800">
                <p className="text-[11px] leading-relaxed text-slate-400">
                  This information is provided for demonstration and testing.
                  AeroAssist does not automatically use this panel as
                  conversation context.
                </p>
              </div>
            </div>
          </aside>

          {/* CENTER — CHAT */}
          <section className="order-1 min-h-[calc(100vh-150px)] overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.07)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none lg:order-2">
            <ChatWindow />
          </section>

          {/* RIGHT — WORKSPACE INFO */}
          <aside className="order-3">
            <div className="sticky top-6 space-y-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
                <div className="border-b border-slate-100 px-5 py-4 dark:border-slate-800">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Agent Workspace
                  </p>

                  <h2 className="mt-1 text-sm font-semibold">How to test</h2>
                </div>

                <div className="p-5">
                  <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        1
                      </div>

                      <div>
                        <p className="text-sm font-medium">Start naturally</p>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                          Begin with something simple like “Hi” or describe your
                          problem without giving the PNR.
                        </p>
                      </div>
                    </div>

                    <div className="my-4 h-px bg-slate-200 dark:bg-slate-800" />

                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        2
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          Provide information when asked
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                          Use one of the PNRs in the reference panel when
                          AeroAssist requests it.
                        </p>
                      </div>
                    </div>

                    <div className="my-4 h-px bg-slate-200 dark:bg-slate-800" />

                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        3
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          Test the resolution
                        </p>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                          Ask for refunds, rebooking, compensation, escalation,
                          or other supported actions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 dark:border-blue-950 dark:from-blue-950/30 dark:to-slate-950">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />

                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                    AI Resolution
                  </p>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Customer and flight information is verified by the backend
                  before being supplied to the AI agent.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
