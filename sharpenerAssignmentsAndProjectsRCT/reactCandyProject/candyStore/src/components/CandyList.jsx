import { useContext } from "react";
import candyContext from "../context/candyContext";

const CandyList = () => {
  const { candies, addToCart } = useContext(candyContext);

  const clickHandler = (data) => {
    addToCart(data);
  };
  return (
    <section>
      <h2>Candy List</h2>
      <ul>
        {candies.map((candy) => {
          const { name, price, description, id } = candy;
          return (
            <li key={id} style={{ display: "flex", gap: "20px", width: "70%" }}>
              <h3>{name}</h3>
              <span>{description}</span>
              <span>₹ {price}</span>
              <button
                onClick={() => {
                  clickHandler({ id, name, price, description, quantity: 1 });
                }}
              >
                Buy One
              </button>
              <button
                onClick={() => {
                  clickHandler({ id, name, price, description, quantity: 2 });
                }}
              >
                Buy Two
              </button>
              <button
                onClick={() => {
                  clickHandler({ id, name, price, description, quantity: 3 });
                }}
              >
                Buy Three
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CandyList;
