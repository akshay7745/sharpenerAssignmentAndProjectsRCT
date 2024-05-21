"use client";
import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/navigation";

function NewMeetupPage() {
  const router = useRouter();
  async function AddMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/");
  }
  return <NewMeetupForm onAddMeetup={AddMeetupHandler} />;
}

export default NewMeetupPage;
