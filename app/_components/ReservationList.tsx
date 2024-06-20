"use client";

import { Booking } from "@/type";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";
import { deleteReservation } from "@lib/actions";

function ReservationList({ bookings }: { bookings: any }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) =>
      curBookings.filter((booking: Booking) => booking.id !== bookingId)
  );

  const handleDelete = async (bookingId: string) => {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking: Booking) => (
        <ReservationCard
          booking={booking as unknown as Booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
