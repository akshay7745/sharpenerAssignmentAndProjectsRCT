import { useState } from "react";
import AddProduct from "./components/AddProduct";
import ShirtList from "./components/ShirtList";
import Cart from "./components/Cart";
function App() {
  const [clicked, setClicked] = useState(false);
  const show = () => {
    setClicked(true);
  };
  const hide = () => {
    setClicked(false);
  };
  return (
    <>
      <main style={{ position: "relative" }}>
        {clicked && <Cart hide={hide} />}
        {/* {!clicked && <Cart hide={hide} />} */}
        <section
          style={{
            border: "1px solid black",
            marginTop: "0px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 80px",
            }}
          >
            <h2 style={{ width: "1000px" }}>Add Product to the store</h2>
            <div>
              <button onClick={show} style={{ padding: "10px 25px" }}>
                Cart
              </button>
            </div>
          </div>
          <AddProduct />
        </section>
        <section>
          <ShirtList />
        </section>
      </main>
    </>
  );
}

export default App;
