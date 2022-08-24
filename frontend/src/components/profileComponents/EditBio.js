import { useDispatch } from "react-redux";
import UseField from "../UseField";
import EditTogglable from "./EditTogglable";
import { editUserData } from "../../reducers/loginReducer";
import { Form, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const EditBio = ({ tags }) => {
  const newBio = UseField("text", "");
  const dispatch = useDispatch();
  const [saveButton, setSaveButton] = useState(true);

  const handleSave = () => {
    const newInfo = { infoType: "bio", newBio: newBio.value };

    dispatch(editUserData(newInfo));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.target.value = "";
    newBio.onChange(e);
  };
  useEffect(() => {
    if (newBio.value.length) {
      setSaveButton(false);
    } else {
      setSaveButton(true);
    }
  }, [newBio.value]);
  return (
    <>
      <EditTogglable buttonText="Edit bio">
        <Form>
          <Form.Control
            as="textarea"
            {...newBio}
            maxLength={300}
            className="mb-3"
          />
          <Container className="d-flex gap-3">
            <Button disabled={saveButton} onClick={handleSave}>
              Save
            </Button>
            <Button variant="outline-dark" onClick={handleDelete}>
              Delete
            </Button>
          </Container>
        </Form>
      </EditTogglable>
    </>
  );
};

export default EditBio;
