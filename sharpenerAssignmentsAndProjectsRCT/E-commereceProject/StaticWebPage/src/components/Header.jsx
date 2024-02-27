import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavbarText from "react-bootstrap/esm/NavbarText";
const Header = ({ onShow }) => {
  return (
    <Navbar bg="dark" expand data-bs-theme="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">SuperMart</Navbar.Brand>
        <Nav>
          <Nav.Item>
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#store">Store</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav onClick={onShow}>
          <NavbarText className="border-primary border-2   border p-1 rounded-2  ">
            Cart<span className="badge bg-secondary p-2 ms-1 ">2</span>
          </NavbarText>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
