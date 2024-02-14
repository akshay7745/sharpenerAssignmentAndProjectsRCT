import React from "react";
const Input = (props) => {
  const { type, inputValue, inputId, labelName, onChange } = props;
  return (
    <>
      <label htmlFor={inputId}>{labelName}</label>
      <input type={type} value={inputValue} id={inputId} onChange={onChange} />
    </>
  );
};

export default Input;
