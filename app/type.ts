import { User } from "next-auth";

export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  description?: string;
}

export interface Booking {
  id: number;
  guestId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: string;
  cabins: Cabin;
}

export interface Guest {
  id: number;
  fullName: string;
  email: string;
  created_at: string;
  nationalID: string | null;
  nationality: string | null;
  countryFlag: string | null;
}

export interface ErrorProps {
  error: Error;
  reset: () => void;
}

export interface Settings {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export type UserWithGuestId = User & { guestId: string };
