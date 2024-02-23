// import { useState } from "react";
import Header from "./components/Header.jsx";
import "./App.css";
// import { DUMMY_CANDIES } from "./constants/DummyCandies.js";
import AddNewCandy from "./components/AddNewCandy.jsx";
import CandyList from "./components/CandyList.jsx";
import { Fragment, useContext, useState } from "react";
import candyContext from "./context/candyContext.js";
import CartItems from "./components/CartItems.jsx";
function App() {
  const { cartItems } = useContext(candyContext);
  const [cartClick, setCartClick] = useState(true);
  console.log(cartItems);
  return (
    <Fragment>
      {cartClick && <CartItems />}
      <Header />
      <main>
        <AddNewCandy />
        <CandyList />
      </main>
    </Fragment>
  );
}

export default App;
