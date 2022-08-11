import { Card, Col } from "react-bootstrap";
import pic from "../../media/cp2.jpg";

const UsersCards = ({ user, profilePictures }) => {
  return (
    <Col>
      <Card style={{ width: "23rem" }}>
        <Card.Img variant="top" src={pic} />
        <Card.Body>
          <Card.Title>{user.fullname}</Card.Title>
          <Card.Text>
            Age: {user.age}
            <br /> City: {user.city}
          </Card.Text>
          <Card.Text>
            <strong>About me: </strong>
            <br />
            {user.bio}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            {user.tags.map((tag) => `#${tag} `)}
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default UsersCards;
