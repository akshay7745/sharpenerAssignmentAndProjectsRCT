import ReactDOM from "react-dom/client";
import { CartContextProvider } from "./components/context/cartContext";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartContextProvider>
    <App />
  </CartContextProvider>
);
