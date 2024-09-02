import { Card, Col, Container, Row } from "react-bootstrap";

const ArticleList = () => {
  return (
    <>
      <h4 className="text-center mt-5 display-4">
        Important Articles to improve the mental health
      </h4>
      <Container className="mt-4">
        <Row className="gy-5 mb-5" lg={3} md={2} xs={1}>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Motivation</Card.Title>

                <Card.Text>
                  Motivation is crucial as it drives individuals to achieve
                  their goals and overcome obstacles. It fuels persistence,
                  enhances performance, and fosters personal growth. By
                  providing direction and purpose, motivation helps maintain
                  focus and commitment, even in challenging times. It also
                  boosts self-confidence and satisfaction, leading to a more
                  fulfilling life. In a professional context, motivated
                  employees are more productive, innovative, and engaged,
                  contributing to the overall success of an organization
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Motivation</Card.Title>

                <Card.Text>
                  Motivation is crucial as it drives individuals to achieve
                  their goals and overcome obstacles. It fuels persistence,
                  enhances performance, and fosters personal growth. By
                  providing direction and purpose, motivation helps maintain
                  focus and commitment, even in challenging times. It also
                  boosts self-confidence and satisfaction, leading to a more
                  fulfilling life. In a professional context, motivated
                  employees are more productive, innovative, and engaged,
                  contributing to the overall success of an organization
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Motivation</Card.Title>

                <Card.Text>
                  Motivation is crucial as it drives individuals to achieve
                  their goals and overcome obstacles. It fuels persistence,
                  enhances performance, and fosters personal growth. By
                  providing direction and purpose, motivation helps maintain
                  focus and commitment, even in challenging times. It also
                  boosts self-confidence and satisfaction, leading to a more
                  fulfilling life. In a professional context, motivated
                  employees are more productive, innovative, and engaged,
                  contributing to the overall success of an organization
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ArticleList;
