import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
function App() {
  const [showCartCard, setShowCartCard] = useState(false);
  const showCartCardHandler = () => {
    setShowCartCard((prevState) => {
      if (!prevState) {
        return true;
      }
    });
  };
  const hideCartCardHandler = () => {
    setShowCartCard((prevState) => {
      if (prevState) {
        return false;
      }
    });
  };
  return (
    <Fragment>
      {showCartCard && <Cart onCartCardClick={hideCartCardHandler} />}
      <Header onCartCardClick={showCartCardHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
