import dbConnect from "@/lib/dbConnect";
import Trip from "@/models/Trip";

export async function GET() {
  await dbConnect();
  const tripData = await Trip.find({});
  return Response.json(
    {
      data: tripData,
      success: true,
    },
    {
      status: 200,
    }
  );
}
