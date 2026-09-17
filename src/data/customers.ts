import type { Booking, Customer } from "@/types/customer";

export const customers: Customer[] = [
  {
    name: "Priya Nair",
    loyaltyTier: "Gold",
    bookingReference: "SK4821X",
    email: "priya.nair@example.com",
    phone: "+91-98xxxxxxx1",
    travelHistory: {
      flights: 6,
      priorComplaints: 1,
    },
  },
  {
    name: "Arvind Kulkarni",
    loyaltyTier: "Silver",
    bookingReference: "TR1190B",
    email: "arvind.kulkarni@example.com",
    phone: "+91-98xxxxxxx2",
    travelHistory: {
      flights: 3,
      priorComplaints: 0,
    },
  },
  {
    name: "Meher Kaur",
    loyaltyTier: "Platinum",
    bookingReference: "WL7742",
    email: "meher.kaur@example.com",
    phone: "+91-98xxxxxxx3",
    travelHistory: {
      flights: 10,
      priorComplaints: 1,
    },
  },
];

export const bookings: Booking[] = [
  {
    customerName: "Priya Nair",
    bookingReference: "SK4821X",
    flights: [
      {
        flightNumber: "SK-204",
        route: "Delhi → Goa",
        date: "23 Sep 2026",
        scheduledDeparture: "18:40",
        status: "Cancelled",
      },
      {
        flightNumber: "Return flight",
        route: "Goa → Delhi",
        date: "25 Sep 2026",
        scheduledDeparture: "16:20",
        status: "Unaffected",
      },
    ],
  },

  {
    customerName: "Arvind Kulkarni",
    bookingReference: "TR1190B",
    flights: [
      {
        flightNumber: "SK-118",
        route: "Mumbai → Bengaluru",
        date: "23 Sep 2026",
        scheduledDeparture: "07:10",
        status: "Delayed",
        delayHours: 4,
        newDeparture: "11:10",
      },
    ],
  },

  {
    customerName: "Meher Kaur",
    bookingReference: "WL7742",
    flights: [
      {
        flightNumber: "SK-305",
        route: "Delhi → Hyderabad",
        date: "23 Sep 2026",
        scheduledDeparture: "14:00",
        status: "Delayed",
        delayHours: 6,
        newDeparture: "20:00",
      },
    ],
  },
];
