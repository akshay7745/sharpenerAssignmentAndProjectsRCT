import { useReducer, useContext } from "react";
import { productContext } from "../contexts/ProductContextProvider";

const formReducer = (state, action) => {
  const type = action.type;
  const val = action.payload;
  if (type === "NAME") {
    return { ...state, shirtName: val };
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
  });
  const { shirtName, description, sizeL, sizeM, sizeS, price } = formState;
  const { addSingleProduct } = useContext(productContext);
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
        "https://crudcrud.com/api/ecc4d0efc47244d9994e0757d5eb6781/products",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const resData = await res.json();
        console.log("Getting added product from the crudcrud", resData);
        addSingleProduct(resData);
      }
    } catch (error) {
      console.log(
        "Something went wrong while adding the product in the store..."
      );
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // formDispatcher({ type: "RESET", payload: "" });
    saveToBackend(formState);
    // handleProductData(formState);
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
          required
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
          required
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
          required
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
            required
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
            required
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
            required
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
