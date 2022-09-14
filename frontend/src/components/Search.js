import { Form, Container, Button, Alert } from "react-bootstrap";
import InputRange from "react-input-range";
import { InputTags } from "react-bootstrap-tagsinput";
import { useState } from "react";
import UseField from "./UseField";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSearch } from "../reducers/searchReducer";
import LoadingScreen from "./LoadingScreen";
import { useStoreUser } from "../utils/getStoreStates";
import allCountries from "../utils/allCountries";
import getCapital from "../utils/getCapital";
import { searchDefaultService } from "../services/userServices";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.search);
  const { user } = useStoreUser();
  const country = UseField("text", "");
  const [tags, setTags] = useState([]);
  const [alert, setAlert] = useState(false);
  const countries = allCountries();
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
	const setCountry = async (country) => {
		const location = await getCapital(country)
		const locationArr = location.split(", ");
		const userSearch = {
		  ageRange: {
			min: ranges.ageValues.min,
			max: ranges.ageValues.max,
		  },
		  fameRange: {
			min: ranges.fameValues.min,
			max: ranges.fameValues.max,
		  },
		  city: locationArr[0],
		  country: locationArr[1],
		  tags: tags,
		};
		dispatch(updateUserSearch(user.user_id, userSearch)).then(
		  (resp) => {
			if (resp.user_id) {
			  setAlert(true);
			  setTimeout(() => {
				setAlert(false);
			  }, 5000);
			}
		  }
		);
	}
	if(country.value.length === 0) {
		setCountry(user.country);
	} else {
		setCountry(country.value);
	}
  };

  const setDefault = (e) => {
	e.preventDefault();
	searchDefaultService(user);

	setAlert(true);
	setTimeout(() => {
	  setAlert(false);
	}, 5000);
  }

  if (!user || !search) {
    return <LoadingScreen />;
  } else {
    return (
      <Container className="signup-container mt-5 mb-3 w-50 ">
        <h1 className="text-center">Advanced search</h1>
        <hr />
        {alert && (
          <Alert
            variant="success"
            className="location-alert location-alert-success text-center"
          >
            Settings have been saved
          </Alert>
        )}
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
                onChange={(value) =>
                  setRanges({ ...ranges, fameValues: value })
                }
              />
            </div>
          </Form.Group>

		  <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
			<Form.Select {...country}>
				<option value="">...</option>
				{countries.map(country => <option key={country} value={country}>{country}</option>)}
			</Form.Select>
			<Form.Text>If you choose to use this option your search will be placed to the capital city of the chosen country!</Form.Text>
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
            <Button type="submit" >Save</Button>
			<Button onClick={setDefault}>Set all to default</Button>
          </div>
        </Form>
      </Container>
    );
  }
};

export default Search;
