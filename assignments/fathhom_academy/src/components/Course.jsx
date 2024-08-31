import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CourseAccordion from "./CourseAccordion";
const Course = () => {
  return (
    <section className="mb-5">
      <h2 className="text-center mb-3 display-5 ">Welcome to course</h2>
      <Container>
        <Row className="mb-5">
          <Col sm={11} md={4}>
            <Card style={{ width: "500px" }}>
              <Card.Img
                variant="top"
                src="https://img.freepik.com/free-vector/data-base-administrator-online-service-platform-admin-manager-data-center-modern-computer-technology-it-profession-idea-online-course-flat-vector-illustration_613284-2645.jpg?size=626&ext=jpg&ga=GA1.1.77852075.1725111883&semt=ais_hybrid"
              />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the cards content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} className="offset-md-1" md={7}>
            <CourseAccordion />
          </Col>
        </Row>
      </Container>
      <h5 className="text-center display-6 mb-4">Frequently asked questions</h5>
      <Container>
        <Row>
          <Col>
            <CourseAccordion />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Course;
