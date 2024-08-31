import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
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
            <LinkContainer to="/course">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              {/**
               * work on the nav drop down links
               */}
              <NavDropdown.Item href="#action/3.1">User Name</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
