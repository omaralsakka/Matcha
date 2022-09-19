import { Card, Image, Container } from "react-bootstrap";
import locationIcon from "../../media/location-icon.png";

const UserCardInfo = ({ user, distance }) => {
  return (
    <>
      <Card.Title className="fs-1">
        <strong>{user.fullname}</strong>
        <span className="mx-3 fs-3 text-muted">{user.age}</span>
      </Card.Title>

      <Container className="d-flex align-items-center gap-2 px-0 mb-4">
        <Container className="px-0 mx-0 cards-icons">
          <Image src={locationIcon} fluid />
        </Container>
        <Card.Text className="text-muted fs-6">
          Lives in {user.city}, {distance} away from you.
        </Card.Text>
      </Container>

      <Card.Title className="fs-3">
        <strong>About me</strong>
      </Card.Title>
      <Card.Text className="mb-3 fs-6 text-muted">{user.bio}</Card.Text>
      <Card.Text className="mb-3 text-muted">@{user.username}</Card.Text>
      <hr />
      <Card.Title className="fs-3 mb-3">
        <strong>Interests</strong>
      </Card.Title>
      <Card.Text className="mb-4">
        <span className="d-flex">
          {user.tags.map((tag) => (
            <span key={tag} className="cards-tags text-muted">
              {tag}
            </span>
          ))}
        </span>
      </Card.Text>
      <hr />
      <Card.Title className="fs-3 mb-3">
        <strong>Fame rate</strong>
      </Card.Title>
      <Card.Text className="text-muted fs-4">
        {user.liked_by ? user.liked_by.length : 0}
      </Card.Text>
    </>
  );
};

export default UserCardInfo;
