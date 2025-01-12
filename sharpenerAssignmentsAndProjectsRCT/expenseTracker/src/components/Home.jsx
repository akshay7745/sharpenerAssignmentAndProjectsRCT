import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  const displayName = useSelector((store) => store.authentication.displayName);
  const profilePicture = useSelector(
    (store) => store.authentication.profilePicture
  );
  return (
    <>
      <Row className="text-center mt-5 bg-dark text-bg-dark">
        <Col>
          <h2 className="fs-1">
            Welcome to the Expense Tracker (Expense Manager) App.
          </h2>
        </Col>
      </Row>
      <Row className="text-center mt-4">
        <Col>
          {displayName === "" && profilePicture === "" ? (
            <span className="fs-5">
              Your profile is incomplete.
              <Link to="/profile"> Complete Now</Link>
            </span>
          ) : (
            <span className="fs-5">
              Your profile is complete.
              <Link to="/profile"> Click To Update </Link>
            </span>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Home;
