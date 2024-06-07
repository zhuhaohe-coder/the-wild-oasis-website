import Spinner from "@components/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center flex-col">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}
