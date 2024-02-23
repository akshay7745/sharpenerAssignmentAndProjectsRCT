import { Fragment, useContext, useState } from "react";
import AddMedicine from "./components/AddMedicine";
import Header from "./components/Header";
import addMedicineContext from "./contexts/addMedicineContext";
// import cartContext from "./contexts/cartContext";
import Cart from "./components/Cart";
import Medicines from "./components/Medicines";
import cartContext from "./contexts/cartContext";

function App() {
  const data = useContext(cartContext);
  const [showCartList, setShowCartList] = useState(false);
  const hideCartList = () => {
    setShowCartList(false);
  };
  console.log(data);
  return (
    <Fragment>
      {showCartList && <Cart hideCartList={hideCartList} />}
      <Header showCartHandler={setShowCartList} />
      <AddMedicine />
      <Medicines />
    </Fragment>
  );
}

export default App;
