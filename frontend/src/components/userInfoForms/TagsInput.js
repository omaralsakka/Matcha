import { Form } from "react-bootstrap";
import { InputTags } from "react-bootstrap-tagsinput";
import { useState } from "react";

const TagsInput = ({ tags, setTags }) => {
  const [maxLength, setMaxLength] = useState(20);

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
  return (
    <Form.Group className="overflow-hidden mb-3">
      <Form.Label>Tags</Form.Label>
      <InputTags maxLength={maxLength} values={tags} onTags={handleTags} />
      <Form.Text muted>max length 20 characters</Form.Text>
    </Form.Group>
  );
};

export default TagsInput;
