import { Form, Container, Button } from "react-bootstrap";
import InputRange from "react-input-range";
import { InputTags } from "react-bootstrap-tagsinput";
import { useState } from "react";
import UseField from "./UseField";
import { useDispatch } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const city = UseField("text");
  const country = UseField("text");
  const [tags, setTags] = useState([]);
  const [ranges, setRanges] = useState({
    ageValues: {
      min: 21,
      max: 41,
    },
    fameValues: {
      min: 20,
      max: 60,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userSearch = {
      ageRange: {
        min: ranges.ageValues.min,
        max: ranges.ageValues.max,
      },
      fameRange: {
        min: ranges.fameValues.min,
        max: ranges.fameValues.max,
      },
      city: city.value,
      country: country.value,
      tags: tags,
    };
    // dispatch(saveSearch(userSearch));
  };
  return (
    <Container className="signup-container mt-5 mb-3 w-50 ">
      <h1 className="text-center">Advance search</h1>
      <hr />

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-5">
          <Form.Label className="fs-5">Age range</Form.Label>
          <div className="mt-4 w-50">
            <InputRange
              maxValue={61}
              minValue={18}
              formatLabel={(value) => `${value}`}
              value={ranges.ageValues}
              onChange={(value) => setRanges({ ...ranges, ageValues: value })}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label className="fs-5">Fame rating gap</Form.Label>
          <div className="mt-4 w-50">
            <InputRange
              maxValue={100}
              minValue={0}
              formatLabel={(value) => `${value}`}
              value={ranges.fameValues}
              onChange={(value) => setRanges({ ...ranges, fameValues: value })}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fs-5">Location</Form.Label>
          <div className="mb-3 w-50">
            <Form.Control {...city} placeholder="city"></Form.Control>
          </div>
          <div className="w-50">
            <Form.Control {...country} placeholder="country"></Form.Control>
          </div>
        </Form.Group>

        <Form.Group className="mb-5">
          <Form.Label>Tags</Form.Label>
          <InputTags
            maxLength={50}
            values={tags}
            onTags={(value) => setTags(value.values)}
          />
          <Form.Text muted>max length 50 characters</Form.Text>
        </Form.Group>
        <div className="d-flex" style={{ gap: "10px" }}>
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </Container>
  );
};

export default Search;
