"use server";

import { UserWithGuestId } from "@/type";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";

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
