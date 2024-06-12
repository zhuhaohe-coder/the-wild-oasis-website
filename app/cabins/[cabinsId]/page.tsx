import { Cabin as CabinType } from "@/type";
import Cabin from "@components/Cabin";
import Reservation from "@components/Reservation";
import Spinner from "@components/Spinner";
import { getCabin, getCabins } from "@lib/data-service";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { cabinsId: string };
}) {
  const cabin: Cabin = await getCabin(params.cabinsId);
  const { name } = cabin;
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins: Cabin[] = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));
  return ids;
}

export default async function Page({
  params,
}: {
  params: { cabinsId: string };
}) {
  const cabin: CabinType = await getCabin(params.cabinsId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve cabin {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
