import { useReducer } from "react";
import { useContext } from "react";
import candyContext from "../context/candyContext";
const formReducer = (state, action) => {
  if (action.type === "CANDY_NAME") {
    return {
      ...state,
      name: action.payload,
    };
  } else if (action.type === "CANDY_PRICE") {
    return {
      ...state,
      price: +action.payload,
    };
  } else if (action.type === "FORM_SUBMITTED") {
    return {
      name: "",
      description: "",
      price: "",
      id: "",
    };
  } else if (action.type === "CANDY_ID") {
    return {
      ...state,
      id: action.payload,
    };
  } else {
    return {
      ...state,
      description: action.payload,
    };
  }
};

const AddNewCandy = () => {
  const [candyState, candyDispatcher] = useReducer(formReducer, {
    name: "",
    description: "",
    price: "",
    id: "",
  });
  const { addNewCandy } = useContext(candyContext);
  const { name, description, price,id } = candyState;
  const changeHandler = (e) => {
    let action = "";
    if (e.target.id === "name") {
      action = "CANDY_NAME";
    } else if (e.target.id === "price") {
      action = "CANDY_PRICE";
    } else if (e.target.id === "id") {
      action = "CANDY_ID";
    } else {
      action = "CANDY_DESCRIPTION";
    }
    candyDispatcher({ type: action, payload: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    addNewCandy(candyState);
    candyDispatcher({ type: "FORM_SUBMITTED" });
  };
  return (
    <form onSubmit={submitHandler}>
      <h2>Add new candy to the store</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={changeHandler} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          value={description}
          id="description"
          onChange={changeHandler}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          value={price}
          id="price"
          onChange={changeHandler}
        />
      </div>
      <div>
        <label htmlFor="id">ID</label>
        <input type="number" value={id} id="id" onChange={changeHandler} />
      </div>
      <button type="submit">Add Candy</button>
    </form>
  );
};

export default AddNewCandy;
