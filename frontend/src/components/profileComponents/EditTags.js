import { useDispatch } from "react-redux";
import { editUserData } from "../../reducers/loginReducer";
import EditTogglable from "./EditTogglable";
import { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { InputTags } from "react-bootstrap-tagsinput";

const EditTags = ({ userTags }) => {
  const [tags, setTags] = useState();
  const [saveButton, setSaveButton] = useState(true);
  const [maxLength, setMaxLength] = useState(20);
  const dispatch = useDispatch();

  const handleTags = (value) => {
    setTags(value.values);
    setMaxLength(handleMaxLength(tags));
  };

  const handleMaxLength = (tags) => {
    let currentLen = 20;

    if (tags) {
      const currentTags = tags.join("");
      currentLen = 20 - currentTags.length;
      if (currentLen <= 0) {
        return 0;
      }
    }
    return currentLen;
  };

  const handleSave = () => {
    const tagInput = tags.map((tag) => { return tag.replace(/['"]/g, "")});
    const newInfo = { infoType: "tags", tags: tagInput };
    dispatch(editUserData(newInfo));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setTags([])
  };
  useEffect(() => {
    setTags(userTags);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (tags) {
      setMaxLength(handleMaxLength(tags))
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
            maxLength={maxLength}
            values={tags}
            onTags={handleTags}
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
