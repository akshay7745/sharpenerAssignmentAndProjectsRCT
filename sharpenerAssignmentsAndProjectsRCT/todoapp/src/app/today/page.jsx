"use client";
import TodoForm from "@/components/createTodo/TodoForm";
import UpdateStatusButton from "@/components/createTodo/UpdateStatusButton";
import { useState, useEffect } from "react";
async function getTodos() {
  const res = await fetch("http://localhost:3000/api/today", {
    cache: "no-store",
  });
  const todoData = await res.json();
  console.log(todoData.data, "from line number 6 homepage..");
  return todoData.data;
}
async function updateTodo(data) {
  const res = await fetch("http://localhost:3000/api/completedtodos", {
    cache: "no-store",
    method: "PUT",
    body: JSON.stringify(data),
  });
}
export default function HomePage() {
  const [todoData, setTodoData] = useState([]);
  // const handleTodoData = () => {
  // setTodoData((prevState) => {
  //   return [...prevState, data];
  // });

  // };
  useEffect(() => {
    async function getData() {
      const todoData = await getTodos();
      const notCompletedTodos = todoData.filter(
        (todo) => todo.isCompleted === false
      );
      setTodoData(notCompletedTodos);
    }
    getData();
  }, []);

  return (
    <>
      <section className="flex justify-center mt-10">
        <TodoForm />
      </section>
      <main className="flex justify-center mt-7">
        <ul className="list-none">
          {todoData.length > 0 &&
            todoData.map((todoItem) => {
              return (
                <li
                  className="border-2 flex justify-between items-center rounded text-lg p-1 mb-4 bg-blue-500 border-blue-700"
                  key={todoItem._id}
                >
                  <span>{todoItem.todo}</span>{" "}
                  <UpdateStatusButton
                    todoData={{
                      todo: todoItem.todo,
                      isCompleted: true,
                      id: todoItem._id,
                    }}
                    buttonName="mark as completed"
                    updateTodoHandler={updateTodo}
                  />
                </li>
              );
            })}
        </ul>
        {todoData.length === 0 && (
          <h3 className="text-4xl mt-7">Your todo list is empty create one.</h3>
        )}
      </main>
    </>
  );
}
