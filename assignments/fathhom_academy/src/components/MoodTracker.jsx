import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import MeditationVideo from "./MeditationVideo";
import ArticleList from "./ArticleList";

const MoodTracker = () => {
  const [mood, setMood] = useState("");
  //   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [moodData, setMoodData] = useState({});
  console.log("moodData", moodData);
  const handleSaveMood = () => {
    const newMoodData = {
      ...moodData,
      [new Date().toISOString().split("T")[0]]: mood,
    };
    setMoodData(newMoodData);
  };

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col>
            <h2 className="text-center display-3 mt-5">Mood Tracker</h2>

            <select className="p-1" value={mood} onChange={handleMoodChange}>
              <option disabled value="">
                How Are You Feeling Today ?
              </option>
              <option value="good">Good</option>
              <option value="ok">Ok</option>
              <option value="bad">Bad</option>
            </select>
            <Button onClick={handleSaveMood}>Save Mood</Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="mt-3">
          <Col>
            <h4 className="display-5 mb-4 text-center">
              {mood === ""
                ? "How are you feeling today ?"
                : `Are you feeling ${mood}!`}
            </h4>
          </Col>
        </Row>
        <Row className="gy-5" lg={3} md={2} xs={1}>
          <Col className=" text-center ">
            <MeditationVideo />
          </Col>
          <Col className=" text-center ">
            <MeditationVideo />
          </Col>
          <Col className=" text-center ">
            <MeditationVideo />
          </Col>
          <Col className=" text-center ">
            <MeditationVideo />
          </Col>
        </Row>
      </Container>
      <ArticleList />
    </>
  );
};

export default MoodTracker;
