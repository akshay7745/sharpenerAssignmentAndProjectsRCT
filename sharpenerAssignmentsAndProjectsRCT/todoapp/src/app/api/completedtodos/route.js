import dbConnect from "@/lib/dbConnect";

import Todo from "@/models/Todo";
export async function PUT(req) {
  await dbConnect();
  const { id, title, isCompleted } = await req.json();
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      title,
      isCompleted,
    });
    return Response.json(
      {
        success: true,
        message: "Todo status updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}
