async function getTodos() {
  const res = await fetch("http://localhost:3000/api/today", {
    cache: "no-store",
  });
  const todoData = await res.json();
  console.log(todoData.data, "from line number 6 homepage..");
  return todoData.data;
}

export default async function CompletedTodos() {
  const data = await getTodos();
  const completedTasks = data.filter((todo) => todo.isCompleted);
  return (
    <main className="flex justify-center mt-7">
      {completedTasks.length === 0 && (
        <h3 className="text-4xl mt-7">
          Go ahead complete your todos and improve the productivity...
        </h3>
      )}
      <ul className="list-none">
        {completedTasks.length > 0 &&
          completedTasks.map((todoItem) => {
            return (
              <li
                className="border-2 flex justify-between items-center rounded text-lg p-1 mb-4 bg-blue-500 border-blue-700"
                key={todoItem._id}
              >
                <span>{todoItem.todo}</span>{" "}
                <button className="bg-fuchsia-500 p-3 rounded-md font-bold ml-40 text-base">
                  Completed
                </button>
              </li>
            );
          })}
      </ul>
    </main>
  );
}
