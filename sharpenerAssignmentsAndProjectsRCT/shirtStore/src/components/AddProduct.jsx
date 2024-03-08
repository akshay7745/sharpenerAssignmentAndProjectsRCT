import React, { useReducer, useContext } from "react";
import { productContext } from "../contexts/ProductContextProvider";

const formReducer = (state, action) => {
  const type = action.type;
  const val = action.payload;
  if (type === "NAME") {
    return { ...state, id: new Date().getTime(), shirtName: val };
  } else if (type === "DESCRIPTION") {
    return { ...state, description: val };
  } else if (type === "PRICE") {
    return { ...state, price: val };
  } else if (type === "L") {
    return { ...state, sizeL: val };
  } else if (type === "M") {
    return { ...state, sizeM: val };
  } else if (type === "S") {
    return { ...state, sizeS: val };
  } else {
    return {
      shirtName: "",
      description: "",
      sizeL: "",
      sizeM: "",
      sizeS: "",
      price: "",
    };
  }
};
const AddProduct = () => {
  const [formState, formDispatcher] = useReducer(formReducer, {
    shirtName: "",
    description: "",
    sizeL: "",
    sizeM: "",
    sizeS: "",
    price: "",
    id: "",
  });
  const { handleProductData, restoreData } = useContext(productContext);
  const { shirtName, description, sizeL, sizeM, sizeS, price } = formState;
  const changeHandler = (e) => {
    const name = e.target.name;

    if (name === "shirtName") {
      formDispatcher({ type: "NAME", payload: e.target.value });
    } else if (name === "description") {
      formDispatcher({ type: "DESCRIPTION", payload: e.target.value });
    } else if (name === "price") {
      formDispatcher({ type: "PRICE", payload: e.target.value });
    } else if (name === "l") {
      formDispatcher({ type: "L", payload: e.target.value });
    } else if (name === "m") {
      formDispatcher({ type: "M", payload: e.target.value });
    } else {
      formDispatcher({ type: "S", payload: e.target.value });
    }
  };
  const saveToBackend = async (data) => {
    try {
      const res = await fetch(
        "https://crudcrud.com/api/3adec8f911224b2eb7f0b5e36a2aff63/products",
        {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        console.log(res);
        // const res1 = await fetch(
        //   "https://crudcrud.com/api/2463b078dc5d4cefb0d220aea8b3f2f5/products"
        // );
        // const products = await res1.json();
        // restoreData(products);
      } else {
        throw new Error(
          "Something went wrong while adding and storing product"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // formDispatcher({ type: "RESET", payload: "" });
    saveToBackend(formState);
    handleProductData(formState);
  };
  return (
    <form
      onSubmit={submitHandler}
      style={{ display: "flex", marginTop: "0", alignItems: "center" }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="shirtName">Shirt Name</label>
        <input
          type="text"
          id="shirtName"
          placeholder="name"
          name="shirtName"
          value={shirtName}
          onChange={changeHandler}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="description"
          name="description"
          value={description}
          onChange={changeHandler}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          placeholder="price"
          name="price"
          value={price}
          onChange={changeHandler}
        />
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="L">L</label>
          <input
            type="number"
            onChange={changeHandler}
            id="l"
            name="l"
            value={sizeL}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="M">M</label>
          <input
            type="number"
            id="m"
            name="m"
            value={sizeM}
            onChange={changeHandler}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="S">S</label>
          <input
            type="number"
            id="s"
            name="s"
            value={sizeS}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div>
        <button type="submit"> Add Product</button>
      </div>
    </form>
  );
};

export default AddProduct;
