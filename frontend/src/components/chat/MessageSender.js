import { Container, Card } from "react-bootstrap";
import ProfileImage from "../../utils/ProfileImage";

export const ReceivedMessage = ({ userGender, userId, message, time }) => {
  return (
    <Container className="d-flex p-0">
      <Container
        className="col-md-1 col-sm-2 col-2 m-0 me-1 d-flex align-items-center"
        style={{ minWidth: "60px" }}
      >
        <ProfileImage userGender={userGender} userId={userId} />
      </Container>
      <Container className="p-2 bg-light rounded w-75 ms-0 mb-3 mt-3">
        <Card.Text className="d-flex flex-column">
          <span className="fs-5">{message}</span>
          <br />
          <span className="text-muted fs-6 align-self-end">{time}</span>
        </Card.Text>
      </Container>
    </Container>
  );
};

export const SentMessage = ({ message, time }) => {
  return (
    <>
      <Container className="p-2 bg-info rounded w-75 me-0 mb-3 mt-3">
        <Container></Container>
        <Card.Text className="d-flex flex-column">
          <span className="fs-5">{message}</span>
          <br />
          <span className="text-muted fs-6 align-self-end">{time}</span>
        </Card.Text>
      </Container>
    </>
  );
};

// export default ReceivedMessage;
