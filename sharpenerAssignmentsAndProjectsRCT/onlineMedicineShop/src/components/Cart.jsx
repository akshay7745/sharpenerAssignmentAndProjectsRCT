import { useContext } from "react";
import { cartContext } from "../contexts/CartContextProvider";
import Modal from "./Modal";
import CloseButton from "react-bootstrap/CloseButton";
import { Button } from "react-bootstrap";
import { medicineContext } from "../contexts/MedicineContextProvider";
const Cart = ({ handleHide }) => {
  const { cartData, addItemToCart, restoreCartData } = useContext(cartContext);
  const { restoreMedicineData } = useContext(medicineContext);

  const saveCartData = async (data) => {
    const { cartData, medicineData, medicineId, itemId } = data;
    console.log(itemId, medicineId, "form cart 13");
    try {
      const res = await fetch(
        `https://crudcrud.com/api/98ff4bdeadcc46b980659074e5164fe4/cart/${itemId}`,
        {
          method: "PUT",
          body: JSON.stringify(cartData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const cartItemsRes = await fetch(
          `https://crudcrud.com/api/98ff4bdeadcc46b980659074e5164fe4/cart`
        );
        const cartItemsData = await cartItemsRes.json();
        console.log(cartItemsData, "from line no 34 cartItem inc dec");
        restoreCartData(cartItemsData);
        const medicineRes = await fetch(
          `https://crudcrud.com/api/98ff4bdeadcc46b980659074e5164fe4/medicines/${medicineId}`,
          {
            method: "PUT",
            body: JSON.stringify(medicineData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(
          medicineRes,
          "this response is after adding to the cart line no 35"
        );
        if (medicineRes.ok) {
          const allMedicinesRes = await fetch(
            "https://crudcrud.com/api/98ff4bdeadcc46b980659074e5164fe4/medicines"
          );
          const medicines = await allMedicinesRes.json();
          restoreMedicineData(medicines);
        } else {
          throw new Error("Fetching medicines failed after add to cart");
        }
      } else {
        throw new Error("Fetching Cart item failed");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const totalAmount = cartData.reduce((acc, item) => {
    return (acc += Number(item.price) * Number(item.quantity));
  }, 0);
  return (
    <Modal handleHide={handleHide}>
      <h2 style={{ textAlign: "center" }}>Cart Items</h2>
      <div
        style={{
          background: "rgb(248,248,255)",
          height: "400px",
          overflowY: "scroll",
        }}
      >
        {cartData.map((cartitem) => {
          const incCartQuantity = +cartitem.quantity + 1;
          const decCartQuantity = +cartitem.quantity - 1;

          const increasedStock = cartitem.totalStock - decCartQuantity;
          const decreasedStock = cartitem.totalStock - incCartQuantity;
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid black",
                padding: "10px",
              }}
              key={cartitem._id}
            >
              <div style={{ display: "flex" }}>
                <span> {cartitem.name} </span>
                <div>
                  <span style={{ marginLeft: "10px" }}> ₹{cartitem.price}</span>
                  <span> x </span>
                  <span>{cartitem.quantity}</span>
                  <span> = ₹{+cartitem.price * +cartitem.quantity}</span>
                </div>
              </div>

              <div>
                <Button
                  style={{ marginRight: "10px", padding: "0 20px" }}
                  disabled={Number(cartitem.quantity) === 1 ? true : false}
                  onClick={() => {
                    saveCartData({
                      cartData: {
                        name: cartitem.name,
                        price: cartitem.price,
                        totalStock: cartitem.totalStock,
                        description: cartitem.description,
                        quantity: `${decCartQuantity}`,
                        medicineId: cartitem.medicineId,
                      },
                      itemId: cartitem._id,
                      medicineId: cartitem.medicineId,
                      medicineData: {
                        name: cartitem.name,
                        price: cartitem.price,
                        totalStock: cartitem.totalStock,
                        description: cartitem.description,
                        stock: `${increasedStock}`,
                        addedToCart: true,
                      },
                    });
                  }}
                >
                  -
                </Button>
                <Button
                  style={{ marginRight: "10px", padding: "0 20px" }}
                  disabled={
                    Number(cartitem.totalStock) - Number(cartitem.quantity) ===
                    0
                      ? true
                      : false
                  }
                  onClick={() => {
                    saveCartData({
                      cartData: {
                        name: cartitem.name,
                        price: cartitem.price,
                        totalStock: cartitem.totalStock,
                        description: cartitem.description,
                        quantity: `${incCartQuantity}`,
                        medicineId: cartitem.medicineId,
                      },
                      itemId: cartitem._id,
                      medicineId: cartitem.medicineId,
                      medicineData: {
                        name: cartitem.name,
                        price: cartitem.price,
                        totalStock: cartitem.totalStock,
                        description: cartitem.description,
                        stock: `${decreasedStock}`,
                        addedToCart: true,
                      },
                    });
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          position: "fixed",
          top: 522,
          padding: "0 10px",
          fontSize: "22px",
        }}
      >
        <span style={{ marginRight: "240px" }}>Total Amount</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "fixed",
          top: 560,
          padding: "0 10px",
        }}
      >
        {/* <button onClick={handleHide}>close</button> */}
        <CloseButton style={{ marginRight: "348px" }} onClick={handleHide} />
        <Button
          variant="info"
          onClick={() => {
            alert("Thank you visit again");
          }}
        >
          Place Order
        </Button>
      </div>
    </Modal>
  );
};

export default Cart;
