import { Form } from "react-bootstrap";
import allCountries from "../../../utils/allCountries";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUsersByCountry } from "../../../reducers/usersReducer";

const LocationSearch = ({ user }) => {
  const [country, setCountry] = useState(false);

  const countries = allCountries();
  const dispatch = useDispatch();

  useEffect(() => {
    if (country) {
      if (user) {
        dispatch(getUsersByCountry(country, user));
      }
    }
  }, [country]);

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  return (
    <Form.Group className="mb-4">
      <Form.Label>Location</Form.Label>
      <Form.Select
        onChange={handleCountry}
        size="sm"
        aria-label="Select country"
      >
        <option>Select country</option>
        {countries.map((country) => (
          <option value={country} key={countries.indexOf(country)}>
            {country}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default LocationSearch;
