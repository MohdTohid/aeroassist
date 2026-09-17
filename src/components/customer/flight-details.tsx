import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Booking } from "@/types/customer";

interface FlightDetailsProps {
  booking: Booking;
}

export function FlightDetails({
  booking,
}: FlightDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Flight Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {booking.flights.map((flight) => (
          <div
            key={`${flight.flightNumber}-${flight.date}`}
            className="rounded-lg border p-3"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">
                {flight.flightNumber}
              </p>

              <Badge
                variant={
                  flight.status === "Cancelled"
                    ? "destructive"
                    : flight.status === "Delayed"
                      ? "secondary"
                      : "outline"
                }
              >
                {flight.status}
              </Badge>
            </div>

            <p className="mt-2 text-sm">
              {flight.route}
            </p>

            <p className="text-sm text-muted-foreground">
              {flight.date} · {flight.scheduledDeparture}
            </p>

            {flight.newDeparture && (
              <p className="mt-1 text-sm">
                New departure: {flight.newDeparture}
              </p>
            )}

            {flight.delayHours && (
              <p className="text-sm">
                Delay: {flight.delayHours} hours
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}