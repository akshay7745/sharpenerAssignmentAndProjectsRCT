import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

function App() {
  const [showCartCard, setShowCartCard] = useState(false);

  const cartCardHandler = () => {
    setShowCartCard((prevState) => {
      if (prevState) {
        return false;
      } else {
        return true;
      }
    });
  };
  return (
    <Fragment>
      {showCartCard && <Cart onCartCardClick={cartCardHandler} />}
      <Header onCartCardClick={cartCardHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
