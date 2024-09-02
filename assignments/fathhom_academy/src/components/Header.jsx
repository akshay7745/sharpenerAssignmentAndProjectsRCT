import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { authContext } from "../context/AuthContextProvider";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { handleLogout, userName } = useContext(authContext);
  const navigate = useNavigate();
  return (
    <Navbar
      bg="primary"
      data-bs-theme="dark"
      expand="lg"
      fixed="top"
      className="bg-body-primary"
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Fathhom Academy</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Courses</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/meditation">
              <Nav.Link>Meditation</Nav.Link>
            </LinkContainer>

            <NavDropdown title="Profile" id="basic-nav-dropdown">
              {/**
               * work on the nav drop down links
               */}
              {/* <NavDropdown.Item>
                {localStorage.getItem("userName")
                  ? localStorage.getItem("userName")
                  : "Guest"}
              </NavDropdown.Item> */}
              <NavDropdown.Item>
                <Button
                  onClick={() => {
                    handleLogout();
                    navigate("/login");
                  }}
                >
                  Logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
