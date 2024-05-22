import dbConnect from "@/lib/dbConnect";

import Todo from "@/models/Todo";
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const deletedTodo = await Todo.findByIdAndDelete(params.id);
    return Response.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}
