import React from "react";
import { useState } from "react";

const Greetings = () => {
  const [changeText, setChangeText] = useState(false);

  return (
    <>
      <div>Greetings</div>
      {!changeText && <p>Old is gold</p>}
      {changeText && <p>Change is the only constant</p>}
      <button
        onClick={() => {
          setChangeText((pre) => !pre);
        }}
      >
        Change Text
      </button>
    </>
  );
};

export default Greetings;
