import TodoForm from "@/components/createTodo/TodoForm";

async function getTodos() {
  const res = await fetch("http://localhost:3000/api/today", {
    cache: "no-store",
  });
  const todoData = await res.json();
  console.log(todoData.data, "from line number 6 homepage..");
  return todoData.data;
}
export default async function HomePage() {
  // const [todoData, setTodoData] = useState([]);
  // const handleTodoData = () => {
  // setTodoData((prevState) => {
  //   return [...prevState, data];
  // });

  // };
  const todoData = await getTodos();
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
                  className="border-2 rounded text-lg p-1 mb-4 bg-blue-500 border-blue-700"
                  key={todoItem._id}
                >
                  <span>{todoItem.todo}</span>{" "}
                  <button className="bg-fuchsia-500 p-3 rounded-md font-bold ml-8 text-base">
                    mark as completed
                  </button>
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
