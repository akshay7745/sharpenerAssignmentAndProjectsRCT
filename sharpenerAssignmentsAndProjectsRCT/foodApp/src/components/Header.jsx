import { useState } from "react";
import { LOGO_URL } from "../utils/contants";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="app logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
          <li>Cart</li>
        </ul>
        <button
          onClick={() => {
            setBtnName((prevBtnName) => {
              return prevBtnName === "Login" ? "Logout" : "Login";
            });
          }}
          className="auth-btn"
        >
          {btnName}
        </button>
      </div>
    </div>
  );
};

export default Header;
