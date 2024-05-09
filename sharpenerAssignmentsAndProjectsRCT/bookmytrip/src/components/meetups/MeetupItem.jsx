"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  const router = useRouter();
  return (
    <li className={"w-6/12 my-4 mx-auto"}>
      <div className="bg-slate-50 rounded-md shadow-md">
        <div className="relative w-full h-80 overflow-hidden rounded-t-md">
          <Image
            src={props.image}
            alt={props.title}
            fill
            className="object-fit-cover"
          />
        </div>
        <div className="text-center p-4">
          <h3 className="text-xl text-[#2c292b]">{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className="p-6 text-center">
          <button
            onClick={() => router.push(`/${props.id}`)}
            className="cursor-pointer text-[#77002e] border border-solid border-[#77002e] bg-transparent py-2 px-6 rounded hover:text-white hover:bg-[#77002e]"
          >
            Show Details
          </button>
        </div>
      </div>
    </li>
  );
}

export default MeetupItem;
