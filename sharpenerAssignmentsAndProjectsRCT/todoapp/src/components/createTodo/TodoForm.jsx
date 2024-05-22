"use client";
import { useRef } from "react";

export default function TodoForm() {
  const todoInput = useRef(null);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formValue = todoInput.current.value;
    // handleTodo({ todo: formValue });
    const todoRes = await fetch("/api/createtodo", {
      method: "POST",
      body: JSON.stringify({
        todo: formValue,
        isCompleted: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const todo = await todoRes.json();

    // handleTodo(todo.data);
    todoInput.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit} className="text-black">
      <input
        ref={todoInput}
        placeholder="Create todo"
        type="text"
        name="todo"
        required
        className="p-2 px-16"
      />
      <button className="bg-emerald-400 text-bold p-2" type="submit">
        Add Todo
      </button>
    </form>
  );
}
