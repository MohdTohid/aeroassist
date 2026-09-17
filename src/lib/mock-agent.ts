import { bookings, customers } from "@/data/customers";

export function getMockAgentResponse(
  bookingReference: string,
  message: string,
): string {
  const customer = customers.find(
    (item) => item.bookingReference === bookingReference,
  );

  const booking = bookings.find(
    (item) => item.bookingReference === bookingReference,
  );

  if (!customer || !booking) {
    return "I couldn't find a booking matching those details. I'll escalate this to a human agent for assistance.";
  }

  const flight = booking.flights[0];

  if (flight.status === "Cancelled") {
    return `I'm sorry for the disruption, ${customer.name}. Your flight ${flight.flightNumber} from ${flight.route} on ${flight.date} has been cancelled.

Under our policy, you can choose between a free rebooking on the next available flight within 24 hours or a full refund.

If you choose a refund, it will be processed to your original payment method within 7 business days.

Your Gold status gives you priority access to rebooking, but it does not provide additional compensation. The requested business-class upgrade is outside the stated policy and would require human-agent assistance.`;
  }

  if (flight.delayHours && flight.delayHours > 5) {
    return `I'm sorry for the disruption, ${customer.name}. Your flight ${flight.flightNumber} is delayed by ${flight.delayHours} hours.

Under our policy, this qualifies for a meal voucher, lounge access, and hotel accommodation covering the delayed hours.

The policy does not provide a full night's hotel stay.

For the requested higher-fare flight with a ₹2,000 fare difference, supervisor approval is required because the difference exceeds ₹1,500. I'll escalate that request to a human agent.`;
  }

  if (flight.delayHours && flight.delayHours > 3) {
    return `I'm sorry for the disruption, ${customer.name}. Your flight ${flight.flightNumber} is delayed by ${flight.delayHours} hours.

Under our policy, you qualify for a meal voucher and lounge access.

A hotel is not included because hotel accommodation applies only to delays of more than 5 hours.`;
  }

  return "I can help with your booking using the available airline policies. Please tell me what you'd like assistance with.";
}
