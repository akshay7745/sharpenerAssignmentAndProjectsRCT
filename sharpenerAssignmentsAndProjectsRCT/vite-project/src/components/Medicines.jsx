import { useContext, useRef } from "react";
import addMedicineContext from "../contexts/addMedicineContext";
import cartContext from "../contexts/cartContext";

const Medicines = () => {
  const { medicineData } = useContext(addMedicineContext);
  const { addToCart } = useContext(cartContext);
  const inputRef = useRef();

  const submitCartHandler = (data) => {
    addToCart({ ...data, quantity: inputRef.current.value });
    inputRef.current.value = 1;
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
                  defaultValue={1}
                  ref={inputRef}
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
