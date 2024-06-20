"use client";

import { Cabin, UserWithGuestId } from "@/type";
import { createReservation } from "@lib/actions";
import { useStore } from "@lib/store";
import { differenceInDays } from "date-fns";
import SubmitButton from "./SubmitButton";

interface ReservationFormProps {
  cabin: Cabin;
  user: UserWithGuestId;
}

function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, resetRange } = useStore();
  const { maxCapacity, regularPrice, discount, id: cabinId } = cabin;
  const { from: startDate, to: endDate } = range;
  const numNights = differenceInDays(endDate as Date, startDate as Date);
  const cabinPrice = (regularPrice - discount) * numNights;

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId,
  };
  console.log(bookingData);

  const createReservationWithData = createReservation.bind(null, bookingData);

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image as string}
            alt={user.name as string}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createReservationWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>

          <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
