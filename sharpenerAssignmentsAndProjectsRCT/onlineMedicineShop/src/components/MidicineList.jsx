import { useContext } from "react";
import { medicineContext } from "../contexts/MedicineContextProvider";
import { cartContext } from "../contexts/CartContextProvider";

const MidicineList = () => {
  const { medicineData, restoreMedicineData } = useContext(medicineContext);
  const { addItemToCart } = useContext(cartContext);
  const saveCartData = async (data) => {
    const { cartData, medicineData, medicineId } = data;
    try {
      const res = await fetch(
        "https://crudcrud.com/api/92780c94fd844895bb4af50ad05a6dfc/cart",
        {
          method: "POST",
          body: JSON.stringify(cartData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const cartItem = await res.json();
        addItemToCart(cartItem);
        const medicineRes = await fetch(
          `https://crudcrud.com/api/92780c94fd844895bb4af50ad05a6dfc/medicines/${medicineId}`,
          {
            method: "PUT",
            body: JSON.stringify(medicineData),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (medicineRes.ok) {
          const allMedicinesRes = await fetch(
            "https://crudcrud.com/api/92780c94fd844895bb4af50ad05a6dfc/medicines"
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
  const cartHandler = (data) => {
    saveCartData(data);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3>Medicine List</h3>
      <table
        style={{
          textAlign: "center",
          width: "900px",
          border: "1px solid black",
        }}
      >
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Available Stock</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {medicineData?.map((medicine) => {
            const { name, description, price, stock, _id: id } = medicine;
            return (
              <tr key={id}>
                <td>{name}</td>
                <td>{description}</td>
                <td>{price}</td>
                <td>{Number(stock) <= 0 ? "Out of stock" : stock}</td>
                <td>
                  <button
                    onClick={() => {
                      cartHandler({
                        cartData: { name, price },
                        medicineData: {
                          name,
                          description,
                          price,
                          stock: Number(stock) - 1,
                        },
                        medicineId: id,
                      });
                    }}
                    disabled={Number(stock) <= 0 ? true : false}
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MidicineList;
