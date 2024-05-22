import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
    trim: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
