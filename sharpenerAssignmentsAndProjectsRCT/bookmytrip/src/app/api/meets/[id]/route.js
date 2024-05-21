import dbConnect from "@/lib/dbConnect";
import Trip from "@/models/Trip";

export async function GET(req, { params }) {
  await dbConnect();
  try {
    const tripData = await Trip.findById(params.id);
    return Response.json(
      {
        data: tripData,
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
      },
      {
        status: 404,
      }
    );
  }
}
