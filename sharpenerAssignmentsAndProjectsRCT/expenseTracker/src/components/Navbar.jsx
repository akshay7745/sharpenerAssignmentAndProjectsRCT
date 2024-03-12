import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../contexts/AuthContextProvider";
import { useNavigate } from "react-router-dom";
function Navigation() {
  const { handleLogout } = useContext(authContext);
  const navigate = useNavigate();
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 90px",
        border: "1px solid black",
        alignItems: "center",
      }}
    >
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "500px",
          alignItems: "center",
        }}
      >
        <NavLink to="/">Signup</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/home">Welcome</NavLink>
        <NavLink to="/login/verifyEmail">Verify Email</NavLink>
        <Button
          onClick={() => {
            handleLogout();
            navigate("/login");
          }}
          type="button"
        >
          Logout
        </Button>
      </div>
    </header>
  );
}

export default Navigation;
