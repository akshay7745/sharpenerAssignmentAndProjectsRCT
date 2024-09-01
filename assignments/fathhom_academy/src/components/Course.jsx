import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CourseAccordion from "./CourseAccordion";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { courseContext } from "../context/CourseContextProvider";
import ProgressBar from "react-bootstrap/ProgressBar";
const Course = () => {
  const { courseId: cId } = useParams();
  console.log(cId, "from course component");
  const { courses } = useContext(courseContext);
  const course = courses?.find((course) => course?.courseId === cId);
  const {
    courseName,
    instructor,
    description,
    courseImg,
    lectures,
    isEnrolled,
    courseId,
    progress,
  } = course;
  return (
    <section className="mb-5">
      <h2 className="text-center mb-4 display-5 ">Welcome to course</h2>
      <Container>
        <Row className="mb-5">
          <Col sm={12} md={4}>
            <Card>
              <Card.Img variant="top" src={courseImg} />
              <Card.Body>
                <Card.Title className="text-center">{courseName}</Card.Title>
                <Card.Text>
                  {description}
                  <span className="text-center fs-5 d-block">
                    Instructor -:
                    <span className="text-primary">{instructor}</span>
                  </span>
                </Card.Text>
                <ProgressBar
                  className="mb-2 fw-bold"
                  now={progress}
                  label={`${progress}%`}
                />
                <p className="text-center fs-6 fw-bold">Progress Tracking</p>
                <div className="d-grid">
                  <Button disabled variant="outline-success" size="lg">
                    Happy Learning
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} className="offset-md-2" md={6}>
            <CourseAccordion lectures={lectures} courseId={courseId} />
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
