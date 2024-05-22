import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-20 h-14 bg-violet-900">
      <div className="relative">
        <Link href={"/"}>
          <Image
            src="https://i.pinimg.com/564x/52/6a/bf/526abf16cc3e74882fa7304abc0f841c.jpg"
            alt="Todo app logo"
            width={50}
            height={50}
          />
        </Link>
      </div>
      <nav>
        <ul className="list-none flex justify-around gap-9 items-center font-bold text-xl tracking-wide">
          <li>
            <Link href={"/today"}>Todos</Link>
          </li>
          <li>
            <Link href={"/today/completedtodos"}> Completed Todos</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
