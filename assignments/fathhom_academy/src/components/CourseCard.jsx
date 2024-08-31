import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const CourseCard = () => {
  return (
    <Card style={{ width: "18rem", margin: "0 auto" }}>
      <Card.Img
        variant="top"
        src="https://img.freepik.com/free-vector/data-base-administrator-online-service-platform-admin-manager-data-center-modern-computer-technology-it-profession-idea-online-course-flat-vector-illustration_613284-2645.jpg?size=626&ext=jpg&ga=GA1.1.77852075.1725111883&semt=ais_hybrid"
      />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          {`Some quick example text to build on the card title and make up the
          bulk of the card's content.`}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
