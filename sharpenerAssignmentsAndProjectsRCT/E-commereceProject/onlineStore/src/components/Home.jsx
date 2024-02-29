import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
const Home = () => {
  return (
    <>
      <Row className="mt-2 bg-secondary py-5 ">
        <Col md={12}>
          <h1 className="mt-5 display-1 text-center text-white fw-bold ">
            The Generics
          </h1>
        </Col>
        <Col md={12} className="my-4">
          <h3 className="text-light text-center ">Get our latest album</h3>
        </Col>
        <Col md={12}>
          <h4 className="text-center">
            {" "}
            <i
              className="bi bi-play-circle display-3 mx-5"
              style={{ color: "	#483D8B" }}
            ></i>
          </h4>
        </Col>
      </Row>
      <Row className="justify-content-center ">
        <Col md={6}>
          <h2 className="text-center">Tours</h2>
          <Table className="text-center" size="sm">
            <tbody>
              <tr>
                <td>JUL16</td>
                <td>DETROIT, MI</td>
                <td>DTE ENERGY MUSIC THEATRE</td>
                <td>
                  <Button>Buy Tickets</Button>
                </td>
              </tr>
              <tr>
                <td>JUL19</td>
                <td>TORONTO,ON</td>
                <td>BUDWEISER STAGE</td>
                <td>
                  <Button>Buy Tickets</Button>
                </td>
              </tr>
              <tr>
                <td>JUL22</td>
                <td>BRISTOW, VA</td>
                <td>JIGGY LUBE LIVE</td>
                <td>
                  <Button>Buy Tickets</Button>
                </td>
              </tr>{" "}
              <tr>
                <td>JUL29</td>
                <td>PHOENIX, AZ</td>
                <td>AK-CHIN PAVILION</td>
                <td>
                  <Button>Buy Tickets</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default Home;
