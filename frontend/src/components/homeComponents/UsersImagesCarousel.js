import { Carousel, Card } from "react-bootstrap";
const maleImages = require.context("../../media/male", true);
const femaleImages = require.context("../../media/female", true);

const UsersImagesCarousel = ({ userImages, userGender }) => {
  let img;

  return (
    <Carousel controls={false} pause="hover" style={{ zIndex: 1 }}>
      {userImages.map((image) => {
        if (image.picture.includes("./")) {
          switch (userGender) {
            case "female":
              img = femaleImages(image.picture);
              break;
            case "male":
              img = maleImages(image.picture);
              break;
            default:
          }
        } else {
          img = image.picture;
        }

        return (
          <Carousel.Item key={image.id}>
            <Card.Img src={img} className="card-img-users" />
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default UsersImagesCarousel;
