export interface Cabin {
  id: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
}

export interface Booking {
  id: string;
  guestId: string;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: string;
  cabins: Cabin;
}
