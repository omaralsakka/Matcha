import { Container, Button, Card } from "react-bootstrap";
import { useStoreNotifications, useStoreUser } from "../utils/getStoreStates";
import LoadingScreen from "./LoadingScreen";
// import { useDispatch } from "react-redux";

const History = () => {
  const notifications = useStoreNotifications();
  const { user } = useStoreUser();
  //   const dispatch = useDispatch();

  const handleClearNotifications = () => {};
  if (!user || !notifications) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <Container className="mt-3 mb-5 col-sm-6">
          <h1>History</h1>
          <hr />
          <Card className="shadow">
            <Card.Header>
              <Container className="p-2">
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={handleClearNotifications}
                >
                  Clear all notifications
                </Button>
              </Container>
            </Card.Header>
            <Card.Body>
              <Container>
                {notifications.notifications.map((notification) => (
                  <Container key={Math.random()}>
                    <span>
                      {notification.notifications.message}{" "}
                      <b>{notification.notifications.username}</b>
                    </span>
                    <hr />
                  </Container>
                ))}
              </Container>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
};

export default History;
