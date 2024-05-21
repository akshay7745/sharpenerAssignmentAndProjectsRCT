import Image from "next/image";

const data = [
  {
    id: "m1",
    title: "first meeting",
    image:
      "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    address:
      "at - hassurchampu tal- slsli dist- belgaum karnataka house no - 12",
  },
  {
    id: "m2",
    title: "second meeting",
    image:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "lorem lslslsl lkiooiw lslls lslsls lslsl 88ois lslls",
    address:
      "at - hassurchampu tal- slsli dist- belgaum karnataka house no - 12",
  },
  {
    id: "m3",
    title: "third meeting",
    image:
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "lorem lslslsl lkiooiw lslls lslsls lslsl 88ois lslls",
    address:
      "at - hassurchampu tal- slsli dist- belgaum karnataka house no - 12",
  },
];
export default function MeetUp({ params }) {
  const meetingItem = data.find((item) => item.id === params.meetupId);
  console.log("consoling meetingItem from meetup single component");
  return (
    <div className="flex flex-col justify-center align-items-center text-center py-4">
      <Image
        src={meetingItem.image}
        width={700}
        alt="Meeting full image"
        height={600}
        className="m-auto"
      />
      <h2>{meetingItem.title}</h2>
      <p>{meetingItem.address}</p>
      <p>{meetingItem.description}</p>
    </div>
  );
}
