import { useContext } from "react";
import { medicineContext } from "../contexts/MedicineContextProvider";
import { cartContext } from "../contexts/CartContextProvider";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
const MidicineList = () => {
  const { medicineData, restoreMedicineData } = useContext(medicineContext);
  const { addItemToCart } = useContext(cartContext);
  const saveCartData = async (data) => {
    const { cartData, medicineData, medicineId } = data;
    try {
      const res = await fetch(
        "https://crudcrud.com/api/98ff4bdeadcc46b980659074e5164fe4/cart",
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
        console.log(cartItem, "from line no 24 cartItem");
        addItemToCart(cartItem);
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
  const cartHandler = (data) => {
    saveCartData(data);
  };
  return (
    <div
      className="mt-4 mb-4"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3 className="display-6 text-center ">Medicine List</h3>
      {medicineData?.length > 0 ? (
        <Table
          striped
          bordered
          className="text-center  "
          style={{
            // textAlign: "center",
            width: "900px",
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
          <tbody className="table-group-divider ">
            {medicineData?.map((medicine) => {
              const {
                name,
                description,
                price,
                stock,
                _id,
                totalStock,
                addedToCart,
              } = medicine;
              return (
                <tr key={_id}>
                  <td className="">{name}</td>
                  <td>{description}</td>
                  <td>₹ {price}</td>
                  <td>{Number(stock) <= 0 ? "Out of stock" : stock}</td>
                  <td>
                    <Button
                      type={"button"}
                      variant={Number(stock) <= 0 ? "secondary" : "primary"}
                      disabled={Number(stock) <= 0 ? true : false}
                      onClick={() => {
                        if (addedToCart === false) {
                          cartHandler({
                            cartData: {
                              name,
                              price,
                              totalStock,
                              description,
                              quantity: 1,
                              medicineId: _id,
                            },
                            medicineData: {
                              name,
                              description,
                              price,
                              totalStock,
                              addedToCart: true,
                              stock: `${Number(stock) - 1}`,
                            },
                            medicineId: _id,
                          });
                        } else {
                          alert("Already added to cart");
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <h2 className="text-center ">No medicine found , please add one...</h2>
      )}
    </div>
  );
};

export default MidicineList;
