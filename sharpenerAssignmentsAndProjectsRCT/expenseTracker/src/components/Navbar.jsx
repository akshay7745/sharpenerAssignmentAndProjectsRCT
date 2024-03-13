import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../contexts/authSlice";
function Navigation() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (store) => store.authentication.isAuthentication
  );
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
        {!isAuthenticated && <NavLink to="/signup">Signup</NavLink>}
        {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
        {isAuthenticated && <NavLink to="/profile">Profile</NavLink>}
        {isAuthenticated && <NavLink to="/home">Welcome</NavLink>}
        {isAuthenticated && (
          <NavLink to="/login/verifyEmail">Verify Email</NavLink>
        )}
        {isAuthenticated && (
          <Button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
            type="button"
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}

export default Navigation;
