"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

function MainNavigation() {
  const router = useRouter();
  return (
    <header className=" w-full h-20 flex justify-between items-center bg-[#77002e] py-0 px-[10%]">
      <div
        onClick={() => router.push("/")}
        className="text-[2rem] text-white font-bold cursor-pointer"
      >
        React Meetups
      </div>
      <nav>
        <ul className="list-none m-0 p-0 flex align-baseline">
          <li className={"ml-12"}>
            <Link
              className={
                "text-decoration-none text-2xl text-[#fcb8d2] hover:text-white active:text-white"
              }
              href="/"
            >
              All Meetups
            </Link>
          </li>
          <li className={"ml-12"}>
            <Link
              className="text-decoration-none text-2xl text-[#fcb8d2] hover:text-white active:text-white"
              href="/new-meetup"
            >
              Add New Meetup
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
