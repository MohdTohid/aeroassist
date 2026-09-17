"use client";

import { useMemo, useState } from "react";

import { customers, bookings } from "@/data/customers";
import { scenarios } from "@/data/scenarios";

import { CustomerDetails } from "@/components/customer/customer-details";
import { FlightDetails } from "@/components/customer/flight-details";
import { ChatWindow } from "@/components/chat/chat-window";
import { ScenarioSelector } from "@/components/scenarios/scenario-selector";

export default function Home() {
  const [selectedScenario, setSelectedScenario] = useState("priya");

  const scenario = scenarios.find((item) => item.id === selectedScenario)!;

  const customer = useMemo(
    () =>
      customers.find(
        (item) => item.bookingReference === scenario.bookingReference,
      )!,
    [scenario],
  );

  const booking = useMemo(
    () =>
      bookings.find(
        (item) => item.bookingReference === scenario.bookingReference,
      )!,
    [scenario],
  );

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold">AeroAssist</h1>

            <p className="text-sm text-muted-foreground">
              AI Customer Resolution Agent
            </p>
          </div>

          <div className="text-sm text-muted-foreground">Demo</div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-[280px_1fr_300px]">
        <aside className="space-y-4">
          <ScenarioSelector
            selectedScenario={selectedScenario}
            onSelect={setSelectedScenario}
          />
        </aside>

        <section className="min-h-[650px] overflow-hidden rounded-xl border">
          <ChatWindow
            key={scenario.id}
            pnr={scenario.bookingReference}
            initialMessage={scenario.initialMessage}
          />
        </section>

        <aside className="space-y-4">
          <CustomerDetails customer={customer} />

          <FlightDetails booking={booking} />
        </aside>
      </div>
    </main>
  );
}
