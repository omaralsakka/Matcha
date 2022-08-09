import { Form, Button, Container } from "react-bootstrap";
import UseField from "./UseField";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import { useState } from "react";
import { infoFormService } from "../services/Services";

const InfoForm = () => {
	const gender = UseField("text");
	const sexualPreference = UseField("text");
	const bio = UseField("text");
	const [tags, setTags] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const userInfo = {
			gender: gender.value,
			sexualPreference: sexualPreference.value,
			bio: bio.value,
			tags: tags
		};
		infoFormService(userInfo);
	};

	const checkInfoInputs = (gender, sexPref, bio, tags) => {
		if(gender && sexPref && bio && tags.length)
			return (true);
		return (false);
	};
	
  return (
    <>
      <Container className="signup-container mb-3 mt-5">
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
              <option value="transgender">Transgender</option>
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

          <Form.Group className="mb-3">
            <Form.Label>Tags</Form.Label>
            <InputTags
              maxLength={50}
              values={tags}
              onTags={(value) => setTags(value.values)}
            />
            <Form.Text muted>max length 50 characters</Form.Text>
          </Form.Group>
          <Button variant="dark" className="landing-signup-Button" disabled={
			  checkInfoInputs(
				gender.value,
				sexualPreference.value,
				bio.value,
				tags,
 			)
				? false
				: true}
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
