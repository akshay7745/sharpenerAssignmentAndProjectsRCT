import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="text-center">
        <h2 className="bg-purple-600 text-white mb-6 text-6xl p-4">
          Welcome to Todo App
        </h2>
        <p className="text-purple-600 text-2xl hover:text-violet-700">
          <Link href={"/today"}>Create Todo</Link>
        </p>
      </div>
    </main>
  );
}
