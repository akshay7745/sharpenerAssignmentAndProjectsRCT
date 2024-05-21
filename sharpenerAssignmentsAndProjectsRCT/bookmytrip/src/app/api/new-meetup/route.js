import dbConnect from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";
import Trip from "@/models/Trip";

export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  try {
    const newTrip = await Trip.create(body);
    revalidatePath("/", "page");
    return Response.json(
      {
        message: "success",
        res: newTrip,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
