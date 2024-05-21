import MeetupList from "@/components/meetups/MeetupList";
export const metadata = {
  title: "React Meetups",
  description: "Home to all react devs to find the perfect trip planner.",
};
//   {
//     id: "m1",
//     title: "first meeting",
//     image:
//       "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     address:
//       "at - hassurchampu tal- slsli dist- belgaum karnataka house no - 12",
//   },
//   {
//     id: "m2",
//     title: "second meeting",
//     image:
//       "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     description: "lorem lslslsl lkiooiw lslls lslsls lslsl 88ois lslls",
//     address:
//       "at - hassurchampu tal- slsli dist- belgaum karnataka house no - 12",
//   },
//   {
//     id: "m3",
//     title: "third meeting",
//     image:
//       "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     description: "lorem lslslsl lkiooiw lslls lslsls lslsl 88ois lslls",
//     address:
//       "at - hassurchampu tal- slsli dist- belgaum karnataka house no - 12",
//   },
// ];
async function getMeetupData() {
  const data = await fetch("http://localhost:3000/api/meets");
  const allData = await data.json();
  return allData.data;
}
export default async function Home() {
  const meetUpData = await getMeetupData();
  // console.log(meetdata, "from line number 37 home page...");
  return (
    <main>
      <MeetupList meetups={meetUpData} />
    </main>
  );
}
