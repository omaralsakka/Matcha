import { useEffect, useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useStoreNotifications, useStoreUser } from "../utils/getStoreStates";
import LoadingScreen from "./LoadingScreen";
import {
  clearNotifications,
  seenNotifications,
} from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
import ModalPopUp from "./homeComponents/ModalPopUp";

const History = () => {
  const notifications = useStoreNotifications();
  const { user } = useStoreUser();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const modalText = {
    title: "Clear notifications",
    body: "Do you wish to clear all your notifications? ",
    confirm: "Notifications cleared successfully",
  };

  useEffect(() => {
    if (confirm) {
      if (notifications.notifications.length) {
        dispatch(clearNotifications());
      }
    }
  }, [confirm]); // eslint-disable-line

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  useEffect(() => {
    if (notifications.notifications.length) {
      dispatch(seenNotifications());
    }
  }, []); // eslint-disable-line
  if (!user || !notifications || loading) {
    return <LoadingScreen />;
  } else {
    return (
      <>
        <Container className="mt-3 mb-5 col-lg-6">
          <h1>History</h1>
          <hr />
          <Card className="shadow">
            <Card.Header>
              <Container className="p-2">
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={handleShowModal}
                >
                  Clear all notifications
                </Button>
              </Container>
            </Card.Header>
            <Card.Body>
              {notifications.notifications.length ? (
                <Container>
                  {notifications.notifications.map((notification) => (
                    <Container className="p-0" key={Math.random()}>
                      <Container className="d-flex flex-wrap">
                        <span>
                          {notification.notifications.message}{" "}
                          <b>{notification.notifications.username}</b>
                        </span>
                        <span className="ms-auto my-sm-0 mt-2 text-muted">
                          {notification.date[0]}
                        </span>
                      </Container>
                      <hr />
                    </Container>
                  ))}
                </Container>
              ) : (
                <Card.Text className="fs-3 text-center p-3">
                  No notifications available
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Container>
        <ModalPopUp
          show={showModal}
          setShow={setShowModal}
          setConfirm={setConfirm}
          modalText={modalText}
        />
      </>
    );
  }
};

export default History;
