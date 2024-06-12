import { getBookedDatesByCabinId, getCabin } from "@lib/data-service";

export async function GET(
  req: Request,
  { params }: { params: { cabinId: string } }
) {
  const { cabinId } = params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(Number(cabinId)),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
