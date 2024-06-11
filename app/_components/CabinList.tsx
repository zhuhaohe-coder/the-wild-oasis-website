import CabinCard from "@components/CabinCard";
import { Cabin } from "@/type";
import { getCabins } from "@lib/data-service";
// import { unstable_noStore as noStore } from "next/cache";

interface FilterProps {
  filter: "all" | "large" | "medium" | "small";
}

async function CabinList({ filter }: FilterProps) {
  // noStore(); // 禁用缓存

  const cabins: Cabin[] = await getCabins();

  if (!cabins) return null;

  let displayCabin: Cabin[] = [];
  if (filter === "all") {
    displayCabin = cabins;
  }
  if (filter === "large") {
    displayCabin = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }
  if (filter === "medium") {
    displayCabin = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  }
  if (filter === "small") {
    displayCabin = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabin.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
