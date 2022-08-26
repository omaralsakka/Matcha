import { Form, Button, Container, Alert } from "react-bootstrap";
import UseField from "../UseField";
// import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import { useState } from "react";
import { infoFormService } from "../../services/userServices";
import useLocation from "../../utils/locationTool";
import TagsInput from "./TagsInput";

const InfoForm = ({ setVisibleForm }) => {
  const gender = UseField("text", "");
  const sexualPreference = UseField("text", "");
  const bio = UseField("text", "");
  const [tags, setTags] = useState([]);
  let location = useLocation(); // dont use this unless forced and make sure there is no infinite render

  const handleSubmit = (e) => {
    e.preventDefault();

    const userInfo = {
      gender: gender.value,
      sexualPreference: sexualPreference.value,
      bio: bio.value,
      tags: tags,
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
      <Container className="signup-container mb-3 mt-5">
        {location.location.length === 0 ? (
          <Alert variant="warning" className="location-alert">
            Please accept the use of <strong>location services</strong> for
            optimal experience! Other users will be recomended based on your
            location.
          </Alert>
        ) : (
          <Alert
            variant="success"
            className="location-alert location-alert-success"
          >
            Thank you for sharing your location!
          </Alert>
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
              <option value="nonbinary">Non-binary</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sexual preference</Form.Label>
            <Form.Select {...sexualPreference}>
              <option value="">...</option>
              <option value="straight">straight</option>
              <option value="gay">gay</option>
              <option value="bi">bi</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tell the world about yourself</Form.Label>
            <Form.Control as="textarea" {...bio} maxLength={300}></Form.Control>
            <Form.Text muted>max length 300 characters</Form.Text>
          </Form.Group>
          <TagsInput tags={tags} setTags={setTags} />
          {/* check that tags are working */}
          {/* <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <InputTags
              maxLength={50}
              values={tags}
              onTags={(value) => setTags(value.values)}
            />
            <Form.Text muted>max length 20 characters</Form.Text>
          </Form.Group> */}
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
