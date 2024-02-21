import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { useState } from "react";
import { useContext } from "react";
import cartContext from "../context/cartContext";
const MealItemForm = (props) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useContext(cartContext);
  const changeHandler = (e) => {
    if (e.target.value !== "") {
      setQuantity(+e.target.value);
    } else {
      setQuantity("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addItem({ ...props.itemData, quantity: quantity });
    setQuantity(1);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label={"Quantity"}
        input={{
          id: "quantity",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          value: quantity,
          onChange: changeHandler,
        }}
      />
      <button>+Add</button>
    </form>
  );
};

export default MealItemForm;
