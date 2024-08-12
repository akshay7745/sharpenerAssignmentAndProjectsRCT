import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authenticationSlice";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const userId = useSelector((state) => state.authentication.userData.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userData");
    dispatch(logout());
    navigate("/signup");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to="/mails">
          <Navbar.Brand>MailBox</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Compose +</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/mails">
              <Nav.Link>Mails</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item>
                {userId === "" ? "Guest user" : userId}
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={userId ? () => handleLogout() : () => handleLogin()}
              >
                {userId === "" ? "Login" : "Logout"}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
