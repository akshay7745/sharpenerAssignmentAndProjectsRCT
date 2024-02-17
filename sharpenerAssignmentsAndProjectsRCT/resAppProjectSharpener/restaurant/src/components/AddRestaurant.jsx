import { useReducer } from "react";
const formReducer = (state, action) => {
  if (action.type === "ORDER_ID") {
    return {
      ...state,
      orderId: action.value,
    };
  } else if (action.type === "PRICE") {
    return {
      ...state,
      price: action.value,
    };
  } else if (action.type === "DISH") {
    return {
      ...state,
      dish: action.value,
    };
  } else {
    return {
      ...state,
      table: action.value,
    };
  }
};
const AddRestaurant = (props) => {
  const [formState, formDispatcher] = useReducer(formReducer, {
    orderId: "",
    price: "",
    dish: "",
    table: "",
  });
  const { orderId, price, dish, table } = formState;
  const submitHandler = (e) => {
    e.preventDefault();
    props.onRestarantAdd(formState);
  };
  const changeHandler = (e) => {
    const name = e.target.name;
    if (name === "id") {
      formDispatcher({ type: "ORDER_ID", value: e.target.value });
    } else if (name === "price") {
      formDispatcher({ type: "PRICE", value: e.target.value });
    } else if (name === "dish") {
      formDispatcher({ type: "DISH", value: e.target.value });
    } else {
      formDispatcher({ type: "TABLE", value: e.target.value });
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="order_id">Unique Order id: </label>
          <input
            type="number"
            value={orderId}
            id="order_id"
            name="id"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="price">Enter Price: </label>
          <input
            type="text"
            value={price}
            name="price"
            id="price"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="dish">Choose Dish: </label>
          <input
            type="text"
            value={dish}
            name="dish"
            id="dish"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="res_table">Choose a table: </label>
          <select
            id="res_table"
            name="table"
            value={table}
            onChange={changeHandler}
          >
            <option>Select table</option>
            <option value={"table1"}>Table 1</option>
            <option value={"table2"}>Table 2</option>
            <option value={"table3"}>Table 3</option>
          </select>
        </div>
        <div>
          <button type="submit">Add to Bill</button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
