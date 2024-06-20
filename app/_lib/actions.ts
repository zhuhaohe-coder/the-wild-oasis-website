"use server";

import { UserWithGuestId } from "@/type";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("github", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
export async function updateProfile(formData: FormData) {
  const authInfo = await auth();
  if (!authInfo) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = (
    formData.get("nationality") as string
  ).split("%");
  if (!/^[0-9X]{6,18}$/.test(nationalID as string))
    throw new Error("Please provide a valid national ID");
  const updateData = { nationalID, nationality, countryFlag };
  const { error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", (authInfo.user as UserWithGuestId).guestId);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId: any) {
  // await new Promise((res) => setTimeout(res, 2000));
  // throw new Error("Not implemented");

  const authInfo = await auth();
  if (!authInfo) throw new Error("You must be logged in");

  const guestBookings = await getBookings(
    (authInfo.user as UserWithGuestId).guestId
  );
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData: FormData) {
  const bookingId = +(formData.get("bookingId") as string);
  const numGuests = +(formData.get("numGuests") as string);
  const observations = formData.get("observations")?.slice(0, 1000);

  // 身份校验
  const authInfo = await auth();
  if (!authInfo) throw new Error("You must be logged in");
  const guestBookings = await getBookings(
    (authInfo.user as UserWithGuestId).guestId
  );
  // 权限校验
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  console.log(guestBookingIds, bookingId);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  const updatedFields = { numGuests, observations };
  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath(`/account/reservations`);
  redirect("/account/reservations");
}

export async function createReservation(bookingData: any, formData: FormData) {
  const authInfo = await auth();
  if (!authInfo) throw new Error("You must be logged in");
  const newBooking = {
    guestId: (authInfo.user as UserWithGuestId).guestId,
    ...bookingData,
    numGuests: +(formData.get("numGuests") as string),
    observations: formData.get("observations")?.slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };
  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
