"use client";

import { customers, bookings } from "@/data/customers";

import { CustomerDetails } from "@/components/customer/customer-details";
import { FlightDetails } from "@/components/customer/flight-details";
import { ChatWindow } from "@/components/chat/chat-window";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-semibold">
              AeroAssist
            </h1>

            <p className="text-sm text-muted-foreground">
              AI Customer Resolution Agent
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            Demo
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-[300px_1fr_300px]">
        {/* Demo Customer Data */}
        <aside className="space-y-4">
          <div className="rounded-xl border p-4">
            <h2 className="font-semibold">
              Demo Customer Data
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Reference information for testing AeroAssist.
              The agent does not automatically receive this
              information.
            </p>

            <div className="mt-4 space-y-4">
              {customers.map((customer) => {
  const booking = bookings.find(
    (item) =>
      item.bookingReference === customer.bookingReference,
  );

  const flight = booking?.flights[0];

  return (
    <div
      key={customer.bookingReference}
      className="rounded-lg border p-3"
    >
      <div className="font-medium">
        {customer.name}
      </div>

      <div className="mt-2 space-y-1 text-xs text-muted-foreground">
        <div>
          PNR:{" "}
          <span className="select-all font-medium text-foreground">
            {customer.bookingReference}
          </span>
        </div>

        {flight && (
          <>
            <div>
              Flight: {flight.flightNumber}
            </div>

            <div>
              Route: {flight.route}
            </div>

            <div>
              Date: {flight.date}
            </div>

            <div>
              Status: {flight.status}
            </div>

            {flight.delayHours !== undefined &&
              flight.delayHours > 0 && (
                <div>
                  Delay: {flight.delayHours} hours
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
})}
            </div>
          </div>
        </aside>

        {/* Agent */}
        <section className="min-h-[650px] overflow-hidden rounded-xl border">
          <ChatWindow />
        </section>

        {/* Informational Details */}
        <aside className="space-y-4">
          <div className="rounded-xl border p-4">
            <h2 className="font-semibold">
              Agent Testing
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Start the conversation naturally. AeroAssist
              should ask for missing information when required.
            </p>

            <div className="mt-4 rounded-lg bg-muted p-3 text-xs">
              <div className="font-medium">
                Suggested test
              </div>

              <div className="mt-2 text-muted-foreground">
                Type: "Hi"
              </div>

              <div className="text-muted-foreground">
                Then describe your issue without providing
                the PNR initially.
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}