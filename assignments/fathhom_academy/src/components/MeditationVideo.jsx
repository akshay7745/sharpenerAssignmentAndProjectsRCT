import { Button, Card } from "react-bootstrap";
import VideoPlayer from "./VideoPlayer";

const MeditationVideo = () => {
  return (
    <Card>
      <Card.Body>
        <VideoPlayer url={"https://youtu.be/0BIaDVnYp2A?si=vQA82msVLVj6AG_L"} />
        <Card.Title>Feel Motivated</Card.Title>

        <Button variant="primary">Watch this video to calm mind</Button>
      </Card.Body>
    </Card>
  );
};

export default MeditationVideo;
