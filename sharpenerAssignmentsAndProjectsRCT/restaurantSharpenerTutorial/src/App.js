import { Fragment, useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartCard from "./components/Cart/CartCard";
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
      <Header onCartCardClick={cartCardHandler} />
      <main>
        {showCartCard && <CartCard />}
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
