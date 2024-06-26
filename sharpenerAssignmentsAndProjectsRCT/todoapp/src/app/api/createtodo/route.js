import dbConnect from "@/lib/dbConnect";
import Todo from "@/models/Todo";
export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const newTodo = await Todo.create(body);
    revalidatePath("/today");
    return Response.json(
      {
        revalidated: true,
        message: "success",
        data: newTodo,
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
