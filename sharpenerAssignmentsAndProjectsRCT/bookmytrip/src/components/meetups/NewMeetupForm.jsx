"use client";
import { useRef } from "react";

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <div>
      <form className="p-4" onSubmit={submitHandler}>
        <div className="mb-2">
          <label
            className="block font-bold mb-2 text-black max-w-[150px]"
            htmlFor="title"
          >
            Meetup Title
          </label>
          <input
            className="block text-black rounded border border-[#ccc] p-1 w-full"
            type="text"
            required
            id="title"
            ref={titleInputRef}
          />
        </div>
        <div className="mb-2">
          <label
            className="block font-bold mb-2 text-black max-w-[150px]"
            htmlFor="image"
          >
            Meetup Image
          </label>
          <input
            className="block text-black rounded border border-[#ccc] p-1 w-full"
            type="url"
            required
            id="image"
            ref={imageInputRef}
          />
        </div>
        <div className="mb-2">
          <label
            className="block font-bold mb-2 text-black max-w-[150px]"
            htmlFor="address"
          >
            Address
          </label>
          <input
            className="block text-black rounded border border-[#ccc] p-1 w-full"
            type="text"
            required
            id="address"
            ref={addressInputRef}
          />
        </div>
        <div className="mb-2">
          <label
            className="block font-bold mb-2 text-black max-w-[150px]"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="block text-black rounded border border-[#ccc] p-1 w-full"
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className=" mt-4 text-right">
          <button
            className="cursor-pointer bg-[#77002e] text-white py-2 px-6 border border-[#77002e] rounded font-bold hover:bg-[#a50e48] active:bg-[#a50e48] "
            type="submit"
          >
            Add Meetup
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewMeetupForm;
