import CabinCard from "@components/CabinCard";
import { Cabin } from "@/type";
import { getCabins } from "@lib/data-service";

async function CabinList() {
  const cabins: Cabin[] = await getCabins();

  if (!cabins) return null;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;