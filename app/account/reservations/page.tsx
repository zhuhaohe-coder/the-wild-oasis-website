import { Booking, UserWithGuestId } from "@/type";
import ReservationCard from "@components/ReservationCard";
import ReservationList from "@components/ReservationList";
import { auth } from "@lib/auth";
import { getBookings } from "@lib/data-service";
import Link from "next/link";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  // CHANGE
  const authInfo = await auth();
  const guest = authInfo?.user as UserWithGuestId;
  const bookings = await getBookings(guest.guestId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
