import { useContext, useReducer } from "react";
import { medicineContext } from "../contexts/MedicineContextProvider";

const medicineReducer = (state, action) => {
  const type = action.type;
  const val = action.payload;
  if (type === "NAME") {
    return {
      ...state,
      name: val,
    };
  } else if (type === "DESCRIPTION") {
    return {
      ...state,
      description: val,
    };
  } else if (type === "PRICE") {
    return {
      ...state,
      price: val,
    };
  } else if (type === "STOCK") {
    return {
      ...state,
      stock: val,
    };
  }

  return {
    name: "",
    description: "",
    price: "",
    stock: "",
  };
};
const AddMedicine = () => {
  const [medicineState, medicineDispatcher] = useReducer(medicineReducer, {
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const { name, description, price, stock } = medicineState;

  const { addAMedicine } = useContext(medicineContext);
  const changeHandler = (e) => {
    const name = e.target.name;
    if (name === "name") {
      medicineDispatcher({ type: "NAME", payload: e.target.value });
    } else if (name === "description") {
      medicineDispatcher({ type: "DESCRIPTION", payload: e.target.value });
    } else if (name === "price") {
      medicineDispatcher({ type: "PRICE", payload: e.target.value });
    } else if (name === "stock") {
      medicineDispatcher({ type: "STOCK", payload: e.target.value });
    }
  };

  const saveMedicineData = async (data) => {
    try {
      const res = await fetch(
        "https://crudcrud.com/api/92780c94fd844895bb4af50ad05a6dfc/medicines",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const medicine = await res.json();
        addAMedicine(medicine);
      } else {
        throw new Error(
          "Something went wrong while adding a medicine to the store."
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(medicineState);
    saveMedicineData(medicineState);
  };
  return (
    <div>
      <h2>Add medicine to the store</h2>
      <form onSubmit={submitHandler} style={{ display: "flex" }}>
        <div>
          <label htmlFor="name">Medicine Name</label>
          <input
            onChange={changeHandler}
            type="text"
            value={name}
            name="name"
            id="name"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            onChange={changeHandler}
            type="text"
            name="description"
            id="description"
            value={description}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            onChange={changeHandler}
            type="number"
            name="price"
            id="price"
            value={price}
            required
          />
        </div>
        <div>
          <label htmlFor="stock">Available Quantity</label>
          <input
            onChange={changeHandler}
            type="number"
            id="stock"
            name="stock"
            value={stock}
            required
          />
        </div>
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default AddMedicine;
