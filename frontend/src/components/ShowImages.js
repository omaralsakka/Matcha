import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getUsersImages } from "../services/usersServices";

const ShowImages = () => {
  const [pictures, setPictures] = useState([]);
  useEffect(() => {
    getUsersImages(1).then((resp) => {
      setPictures(resp);
    });
  }, []);

  if (pictures.length) {
    return (
      <>
        <Container>
          {pictures.map((picture) => (
            <img alt="" src={picture} />
          ))}
        </Container>
      </>
    );
  } else {
    return <></>;
  }
};

export default ShowImages;
