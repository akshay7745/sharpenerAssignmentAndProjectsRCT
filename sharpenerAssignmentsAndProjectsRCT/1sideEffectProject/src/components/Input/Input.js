import React, { useImperativeHandle, useRef } from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  const { type, inputValue, inputId, labelName, onChange } = props;

  const inputRef = useRef();
  const activate = () => {
    inputRef.current.focus();
  };
  useImperativeHandle(ref, () => {
    return {
      activate: activate,
    };
  });
  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={inputId}>{labelName}</label>
      <input type={type} value={inputValue} id={inputId} onChange={onChange} />
    </div>
  );
});

export default Input;
