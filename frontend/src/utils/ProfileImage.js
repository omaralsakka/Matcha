import { useEffect, useState } from "react";
import { getUserProfileImage } from "../services/usersServices";
import { Image } from "react-bootstrap";
const maleImages = require.context("../media/male/", true);
const femaleImages = require.context("../media/female", true);

const ProfileImage = ({ userGender, userId }) => {
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    getUserProfileImage(userId).then((resp) => {
      let img;

      if (resp.picture.includes("./")) {
        switch (userGender) {
          case "female":
            img = femaleImages(resp.picture);
            break;
          case "male":
            img = maleImages(resp.picture);
            break;
          default:
        }
        setProfileImage(img);
      } else {
        setProfileImage(resp.picture);
      }
    });
  }, []); // eslint-disable-line
  return (
    <Image
      src={profileImage}
      rounded
      className="w-100"
      style={{ objectFit: "cover", minHeight: "30px", maxHeight: "42px" }}
    />
  );
};

export default ProfileImage;
