import Accordion from "react-bootstrap/Accordion";
import VideoPlayer from "./VideoPlayer";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { useContext } from "react";
import { courseContext } from "../context/CourseContextProvider";
// import classes from "./CourseAccordion.module.css";

function CourseAccordion({ lectures, courseId }) {
  const { dispatch } = useContext(courseContext);
  console.log("Lectures from courseaccordion", lectures);
  return (
    <Accordion>
      {lectures?.map((lecture) => {
        console.log(lecture, "from accrodion map");
        const { lectureId, url, title, isCompleted } = lecture;
        return (
          <Accordion.Item key={lectureId} eventKey={lectureId}>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
              <Container>
                <Row>
                  <Col
                    className="me-5"
                    style={{ margin: "0", paddingRight: "0px" }}
                  >
                    <VideoPlayer url={url} />
                    <Button
                      variant={isCompleted ? "success" : "primary"}
                      disabled={isCompleted}
                      onClick={() => {
                        dispatch({
                          type: "lesson_completed",
                          payload: {
                            id: courseId,
                            lectureId: lectureId,
                          },
                        });
                      }}
                      className="mt-2"
                    >
                      {isCompleted ? "Completed" : "Mark As Completed"}
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default CourseAccordion;
