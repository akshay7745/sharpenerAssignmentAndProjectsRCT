import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/Todo";
import { revalidatePath } from "next/cache";
export async function GET() {
  await dbConnect();
  try {
    const todoData = await Todo.find({});
    revalidatePath("/today");
    return Response.json(
      {
        revalidated: true,
        success: true,
        data: todoData,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 404,
      }
    );
  }
}
