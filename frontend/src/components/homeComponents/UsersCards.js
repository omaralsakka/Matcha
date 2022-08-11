import { Card } from "react-bootstrap";

const UsersCards = () => {
  return (
    <Card style={{ width: "18rem" }} className="mx-1">
      <Card.Img variant="top" data-src="holder.js/100px160" />
      <Card.Body>
        <Card.Title>Name</Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">tags comes here</small>
      </Card.Footer>
    </Card>
  );
};

export default UsersCards;
