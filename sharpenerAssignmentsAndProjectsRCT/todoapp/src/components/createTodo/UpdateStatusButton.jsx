"use client";
export default function UpdateStatusButton({
  todoData,
  buttonName,
  updateTodoHandler,
}) {
  const { todo, isCompleted, id } = todoData;

  return (
    <button
      onClick={() =>
        updateTodoHandler({
          todo,
          isCompleted,
          id,
        })
      }
      className="bg-fuchsia-500 p-3 rounded-md font-bold ml-40 text-base mr-4 "
    >
      {buttonName}
    </button>
  );
}
