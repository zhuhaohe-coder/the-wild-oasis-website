import { Cabin } from "@/type";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "@lib/data-service";
import { auth } from "@lib/auth";
import LoginMessage from "./LoginMessage";

interface ReservationProps {
  cabin: Cabin;
}

async function Reservation({ cabin }: ReservationProps) {
  const authInfo = await auth();
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="grid grid-cols-2 border bg-primary-800 min-h-[400px]">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {authInfo?.user ? (
        <ReservationForm cabin={cabin} user={authInfo.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
