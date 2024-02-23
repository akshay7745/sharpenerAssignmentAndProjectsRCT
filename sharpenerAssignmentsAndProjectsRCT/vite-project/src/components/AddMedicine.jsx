import { useContext, useReducer } from "react";
import addMedicineContext from "../contexts/addMedicineContext";
const formReducer = (state, action) => {
  if (action.type === "NAME") {
    return {
      ...state,
      name: action.data,
      id: new Date(),
    };
  } else if (action.type === "PRICE") {
    return {
      ...state,
      price: action.data,
    };
  } else if (action.type === "DESCRIPTION") {
    return {
      ...state,
      description: action.data,
    };
  } else {
    return {
      name: "",
      description: "",
      price: "",
      id: "",
    };
  }
};
const AddMedicine = () => {
  const [formState, formDispatcher] = useReducer(formReducer, {
    name: "",
    description: "",
    price: "",
    id: "",
  });

  const { addMedicineHandler } = useContext(addMedicineContext);

  const { name, description, price } = formState;

  const handleChange = (e) => {
    if (e.target.id === "name") {
      formDispatcher({ type: "NAME", data: e.target.value });
    } else if (e.target.id === "description") {
      formDispatcher({ type: "DESCRIPTION", data: e.target.value });
    } else if (e.target.id === "price") {
      formDispatcher({ type: "PRICE", data: e.target.value });
    } else {
      formDispatcher({ type: "SUBMIT" });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addMedicineHandler(formState);
    formDispatcher({ type: "SUBMIT" });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Medicine name</label>
        <input type="text" value={name} onChange={handleChange} id="name" />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          value={description}
          onChange={handleChange}
          id="description"
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input type="number" onChange={handleChange} value={price} id="price" />
      </div>

      <div>
        <button>Add Product</button>
      </div>
    </form>
  );
};

export default AddMedicine;
