import { Container, Card } from "react-bootstrap";

const SentMessage = ({ message, time }) => {
  return (
    <>
      <Container className="p-2 bg-info rounded w-75 me-0 mb-3 mt-3">
        <Card.Text className="d-flex flex-column">
          <span className="fs-5">{message}</span>
          <br />
          <span className="text-muted fs-6 align-self-end">{time}</span>
        </Card.Text>
      </Container>
    </>
  );
};

export default SentMessage;
