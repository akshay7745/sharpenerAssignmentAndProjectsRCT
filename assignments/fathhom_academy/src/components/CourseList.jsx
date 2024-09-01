import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./CourseList.module.css";
import CourseCarousel from "./CourseCarousel";
import CourseCard from "./CourseCard";

import { useContext } from "react";
import { courseContext } from "../context/CourseContextProvider";
const CourseList = () => {
  // imported courses from course context and created course list
  const { courses } = useContext(courseContext);
  return (
    <>
      <section className={classes.section}>
        <Container className="mt-5">
          <CourseCarousel />
        </Container>
      </section>

      <section className={classes.section} style={{ marginBottom: "75px" }}>
        <Container className="mt-5">
          <Row className="gy-5" lg={3} md={2} xs={1}>
            {courses.map((course) => {
              const { courseId } = course;
              return (
                <Col key={courseId} className=" text-center ">
                  <CourseCard course={course} />
                </Col>
              );
            })}

            {/* <Col className=" text-center ">
              <CourseCard />
            </Col>
            <Col className=" text-center ">
              <CourseCard />
            </Col>
            <Col className=" text-center ">
              <CourseCard />
            </Col>
            <Col className=" text-center ">
              <CourseCard />
            </Col>
            <Col className=" text-center ">
              <CourseCard />
            </Col>
            <Col className=" text-center ">
              <CourseCard />
            </Col>
            <Col className=" text-center ">
              <CourseCard />
            </Col>
            <Col className=" text-center ">
              <CourseCard />
            </Col>
            <Col className=" text-center ">
              <CourseCard />
            </Col> */}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CourseList;
