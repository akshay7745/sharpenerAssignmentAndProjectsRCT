import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <Row className="justify-content-between ">
      <Col md={5}>
        <h2>Welcome to the expense app</h2>
      </Col>
      <Col md={5}>
        <span>
          Your profile is incomplete.<Link to="/profile">complete now</Link>{" "}
        </span>
      </Col>
    </Row>
  );
};

export default Home;
