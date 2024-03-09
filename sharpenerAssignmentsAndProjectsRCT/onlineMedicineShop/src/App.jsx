import MidicineList from "./components/MidicineList";
import AddMedicine from "./components/AddMedicine";
import Cart from "./components/Cart";
import { useState } from "react";
const App = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
  return (
    <>
      <main style={{ position: "relative" }}>
        {show && <Cart handleHide={handleHide} />}
        <section style={{ display: "flex", alignItems: "center" }}>
          <AddMedicine />
          <button
            style={{ width: "75px", height: "30px", marginLeft: "200px" }}
            onClick={handleShow}
          >
            Cart
          </button>
        </section>
        <section>
          <MidicineList />
        </section>
      </main>
    </>
  );
};

export default App;
