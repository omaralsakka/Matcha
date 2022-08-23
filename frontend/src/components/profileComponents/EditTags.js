import { useDispatch } from "react-redux";
import { editUserBio } from "../../reducers/loginReducer";
import EditTogglable from "./EditTogglable";
import { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { InputTags } from "react-bootstrap-tagsinput";

const EditTags = ({ userTags }) => {
  const [tags, setTags] = useState();
  const [saveButton, setSaveButton] = useState(true);
  console.log("this is tags: ", tags);
  const dispatch = useDispatch();

  const handleSave = () => {
    // dispatch(editUserBio(newBio.value));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.target.value = "";
  };
  useEffect(() => {
    setTags(userTags);
  }, []);

  useEffect(() => {
    if (tags) {
      if (tags.length) {
        setSaveButton(false);
      } else {
        setSaveButton(true);
      }
    }
  }, [tags]);
  return (
    <>
      <EditTogglable buttonText="Edit interests">
        <Form>
          <InputTags
            maxLength={50}
            values={tags}
            onTags={(value) => setTags(value.values)}
          />
          <Container className="d-flex gap-3 mt-3">
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

export default EditTags;
