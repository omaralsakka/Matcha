import { Form, Button, Container } from "react-bootstrap";
import UseField from "../UseField";
import "react-bootstrap-tagsinput/dist/index.css";
import { useState } from "react";
import { infoFormService } from "../../services/userServices";
import useLocation from "../../utils/locationTool";
import TagsInput from "./TagsInput";
import AlertInput from "../../utils/AlertInput";
import ScrollTop from "../../utils/scrollTop";

const InfoForm = ({ setVisibleForm }) => {
  const gender = UseField("text", "");
  const sexualPreference = UseField("text", "");
  const bio = UseField("text", "");
  const [tags, setTags] = useState([]);
  let location = useLocation(); 
  ScrollTop("infoForm");
  const handleSubmit = (e) => {
    e.preventDefault();
    let sexuality;
    switch (gender) {
      case "male":
        if (sexualPreference.value === "women") {
          sexuality = "straight";
        } else if (sexualPreference.value === "men") {
          sexuality = "gay";
        } else if (sexualPreference.value === "both") {
          sexuality = "bi";
        }
        break;
      case "female":
        if (sexualPreference.value === "women") {
          sexuality = "gay";
        } else if (sexualPreference.value === "men") {
          sexuality = "straight";
        } else if (sexualPreference.value === "both") {
          sexuality = "bi";
        }
        break;
      default:
        sexuality = "straight";
    }

    const userTags = tags.map((tag) => { return tag.replace(/['"]/g, "")});
    const userBio = bio.value.replace(/[']/g, "\"");
    
    const userInfo = {
      gender: gender.value,
      sexualPreference: sexuality,
      bio: userBio,
      tags: userTags,
      location: location.location,
      coords: location.coords,
    };
    infoFormService(userInfo).then(() => setVisibleForm(2));
  };

  const checkInfoInputs = (gender, sexPref, bio, tags) => {
    if (gender && sexPref && bio && tags.length) return true;
    return false;
  };

  return (
    <>
      <Container id="infoForm" className="signup-container mb-3 mt-5">
        {location.location.length === 0 ? (
          <AlertInput
            variant="warning"
            text="Please accept the use of location services for optimal experience!"
          />
        ) : (
          <AlertInput
            variant="success"
            text="Thank you for sharing your location!"
          />
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="text-center mb-3">
            <Form.Label className="fs-3">Tell us more about you</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select {...gender}>
              <option value="">...</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Interested in</Form.Label>
            <Form.Select {...sexualPreference}>
              <option value="">...</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="both">Both</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tell the world about yourself</Form.Label>
            <Form.Control as="textarea" {...bio} maxLength={300}></Form.Control>
            <Form.Text muted>max length 300 characters</Form.Text>
          </Form.Group>
          <TagsInput tags={tags} setTags={setTags} />
          <Button
            variant="dark"
            className="landing-signup-Button"
            disabled={
              checkInfoInputs(
                gender.value,
                sexualPreference.value,
                bio.value,
                tags
              )
                ? false
                : true
            }
            type="submit"
          >
            Save
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default InfoForm;
