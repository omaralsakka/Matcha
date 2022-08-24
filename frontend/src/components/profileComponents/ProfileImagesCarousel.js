import { Carousel, Card, Image } from "react-bootstrap";

const ProfileImagesCarousel = ({ userPictures }) => {
  return (
    <Carousel controls={false} pause="hover">
      {userPictures.map((image) => (
        <Carousel.Item key={image.id}>
          <Card.Img src={image.picture} className="card-img-profile" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProfileImagesCarousel;
