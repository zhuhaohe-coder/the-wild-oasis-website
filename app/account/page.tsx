import { auth } from "@lib/auth";

export const metadata = {
  title: "Guest Area",
};

export default async function Page() {
  const authInfo = await auth();
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {authInfo?.user?.name}
    </h2>
  );
}
