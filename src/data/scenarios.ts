export interface Scenario {
  id: string;
  customerName: string;
  bookingReference: string;
  title: string;
  description: string;
  initialMessage: string;
}

export const scenarios: Scenario[] = [
  {
    id: "priya",
    customerName: "Priya Nair",
    bookingReference: "SK4821X",
    title: "Cancelled flight",
    description: "Cancellation + refund + upgrade request",
    initialMessage:
      "My flight was cancelled and I'm furious. I want a full cash refund plus a free upgrade to business class on my return flight for the trouble.",
  },
  {
    id: "arvind",
    customerName: "Arvind Kulkarni",
    bookingReference: "TR1190B",
    title: "4-hour delay",
    description: "Delay + hotel request",
    initialMessage:
      "My flight has been delayed for four hours and I've already missed an important meeting. I want hotel accommodation since this has been such a long delay.",
  },
  {
    id: "meher",
    customerName: "Meher Kaur",
    bookingReference: "WL7742",
    title: "6-hour delay",
    description: "Hotel + higher-fare rebooking",
    initialMessage:
      "My flight is delayed by six hours. I want a full night's hotel stay, not just accommodation for the delayed hours. Also move me to the other flight instead. The fare difference is ₹2,000.",
  },
];