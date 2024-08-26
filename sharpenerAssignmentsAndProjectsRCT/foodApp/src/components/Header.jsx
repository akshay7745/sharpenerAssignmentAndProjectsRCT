import { useState } from "react";
import { LOGO_URL } from "../utils/contants";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} alt="app logo" />
      </div>
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
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
