import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/Todo";

export async function GET() {
  await dbConnect();
  try {
    const todoData = await Todo.find({});
    return Response.json(
      {
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
