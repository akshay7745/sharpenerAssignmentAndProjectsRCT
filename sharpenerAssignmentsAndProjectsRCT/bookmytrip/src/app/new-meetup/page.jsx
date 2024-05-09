"use client";
import NewMeetupForm from "@/components/meetups/NewMeetupForm";

function NewMeetupPage() {
  function AddMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
  }

  return <NewMeetupForm onAddMeetup={AddMeetupHandler} />;
}

export default NewMeetupPage;
