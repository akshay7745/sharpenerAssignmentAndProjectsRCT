import React, { useContext } from "react";
import { cartContext } from "../contexts/CartContextProvider";
import { productContext } from "../contexts/ProductContextProvider";

const ShirtList = () => {
  const { handleCartData, restoreCartData } = useContext(cartContext);
  const { handleProductData, restoreData, productData } =
    useContext(productContext);

  const saveToBackend = async (data) => {
    try {
      const res = await fetch(
        "https://crudcrud.com/api/3adec8f911224b2eb7f0b5e36a2aff63/cart",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const res = await fetch(
          "https://crudcrud.com/api/3adec8f911224b2eb7f0b5e36a2aff63/cart"
        );
        const cartData = await res.json();
        restoreCartData(cartData);
      } else {
        throw new Error(
          "Something went wrong while adding and storing product"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cartHandler = (data) => {
    handleCartData(data);
    saveToBackend(data);
  };
  return (
    <>
      <div>
        <h2>ShirtList</h2>
      </div>
      <table
        style={{
          border: "1px solid black",
          width: "800px",
          textAlign: "center",
        }}
      >
        <thead style={{ border: "1px solid black" }}>
          <tr>
            <th>Shirt Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>L</th>
            <th>M</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          {productData?.map((shirt) => {
            return (
              <tr style={{ border: "1px solid black" }} key={shirt.id}>
                <td>{shirt.shirtName}</td>
                <td>{shirt.description}</td>
                <td>₹ {shirt.price}</td>
                <td>
                  <button>Buy L {shirt.sizeL}</button>
                </td>
                <td>
                  <button>Buy M {shirt.sizeM}</button>
                </td>
                <td>
                  <button>Buy S {shirt.sizeS}</button>
                </td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ShirtList;
