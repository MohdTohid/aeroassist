export type LoyaltyTier = "Silver" | "Gold" | "Platinum";

export type FlightStatus = "Cancelled" | "Unaffected" | "Delayed";

export interface Customer {
  name: string;
  loyaltyTier: LoyaltyTier;
  bookingReference: string;
  email: string;
  phone: string;
  travelHistory: {
    flights: number;
    priorComplaints: number;
  };
}

export interface Flight {
  flightNumber: string;
  route: string;
  date: string;
  scheduledDeparture: string;
  status: FlightStatus;
  delayHours?: number;
  newDeparture?: string;
}

export interface Booking {
  customerName: string;
  bookingReference: string;
  flights: Flight[];
}
