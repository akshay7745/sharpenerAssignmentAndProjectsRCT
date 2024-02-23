import { useContext, useState } from "react";
import addMedicineContext from "../contexts/addMedicineContext";
import cartContext from "../contexts/cartContext";

const Medicines = () => {
  const [medicineCount, setMedicineCount] = useState(1);
  const { medicineData, addMedicineHandler } = useContext(addMedicineContext);
  const { addToCart, cartItems } = useContext(cartContext);

  const changeHandler = (e) => {
    setMedicineCount(e.target.value);
  };
  const submitCartHandler = (data) => {
    addToCart({ ...data, quantity: medicineCount });
  };
  return (
    <ul>
      {medicineData.map((medicine) => {
        const { name, price, description, id } = medicine;
        return (
          <li
            key={id}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "90%",
              margin: "0 auto",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
              }}
            >
              <span>{name}</span>
              <span>{description}</span>
              <span>₹ {price}</span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitCartHandler({ id, name, price });
                }}
              >
                <label htmlFor="quantity">Quantity: </label>
                <input
                  type="number"
                  id="quantity"
                  value={medicineCount}
                  onChange={changeHandler}
                />
                <button>Add to Cart</button>
              </form>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Medicines;
