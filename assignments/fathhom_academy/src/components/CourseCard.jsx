import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { courseContext } from "../context/CourseContextProvider";
const CourseCard = ({ course }) => {
  const { dispatch } = useContext(courseContext);
  const navigate = useNavigate();
  const {
    courseName,
    description,
    instructor,
    courseId,
    courseImg,
    isEnrolled,
  } = course;
  return (
    <Card style={{ width: "18rem", margin: "0 auto" }}>
      <Card.Img variant="top" src={courseImg} />
      <Card.Body>
        <Card.Title>{courseName}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button
          variant={isEnrolled ? "success" : "warning"}
          className="me-3"
          disabled={isEnrolled}
          onClick={() => {
            dispatch({
              type: "course_enrollment",
              payload: {
                id: courseId,
              },
            });
          }}
          type="button"
        >
          {isEnrolled ? "Enrolled" : "Enroll"}
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            navigate(`/course/${courseId}`);
          }}
          type="button"
          disabled={!isEnrolled}
        >
          {isEnrolled ? "Start Learning" : "Enroll to unlock"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
