import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Customer } from "@/types/customer";

interface CustomerDetailsProps {
  customer: Customer;
}

export function CustomerDetails({ customer }: CustomerDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="font-medium">{customer.name}</p>

          <Badge variant="secondary" className="mt-2">
            {customer.loyaltyTier}
          </Badge>
        </div>

        <div className="space-y-1 text-sm">
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
        </div>

        <div className="border-t pt-3 text-sm">
          <p>
            <span className="font-medium">Booking:</span>{" "}
            {customer.bookingReference}
          </p>

          <p>
            <span className="font-medium">Flights:</span>{" "}
            {customer.travelHistory.flights}
          </p>

          <p>
            <span className="font-medium">Prior complaints:</span>{" "}
            {customer.travelHistory.priorComplaints}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
