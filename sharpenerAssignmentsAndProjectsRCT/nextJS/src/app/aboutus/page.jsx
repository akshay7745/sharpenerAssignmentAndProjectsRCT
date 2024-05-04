import Link from "next/link";

export default function AboutUs() {
  const details = [
    { id: 1, name: "Yash", role: "Senior Developer" },
    { id: 2, name: "Vaibhav", role: "Backend Developer" },
    { id: 3, name: "Suresh", role: "Frontend Developer" },
  ];
  return (
    <ul>
      {details.map((dev) => {
        return (
          <Link key={dev.id} href={`/aboutus/${dev.id}`}>
            <li>{dev.name}</li>
          </Link>
        );
      })}
    </ul>
  );
}
