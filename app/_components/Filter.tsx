"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Filter = "all" | "large" | "medium" | "small";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";
  const handleFilter = (filter: Filter) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        onHandleFilter={handleFilter}
        isActive={activeFilter === "all"}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        onHandleFilter={handleFilter}
        isActive={activeFilter === "small"}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        onHandleFilter={handleFilter}
        isActive={activeFilter === "medium"}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        onHandleFilter={handleFilter}
        isActive={activeFilter === "large"}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({
  filter,
  onHandleFilter,
  isActive,
  children,
}: {
  filter: Filter;
  onHandleFilter: (filter: Filter) => void;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        isActive ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => onHandleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
