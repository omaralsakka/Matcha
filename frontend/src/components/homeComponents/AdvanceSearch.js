import { useEffect, useState } from "react";
import { Button, Offcanvas, Form } from "react-bootstrap";
import allCountries from "../../utils/allCountries";
import { useDispatch } from "react-redux";
import { getUsersByCountry } from "../../reducers/usersReducer";
import { useStoreUser } from "../../utils/getStoreStates";

const AdvanceSearch = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useStoreUser();

  const [country, setCountry] = useState(false);
  const countries = allCountries();
  const dispatch = useDispatch();

  const handleCountry = (e) => {
    setCountry(e.target.value);
  };

  useEffect(() => {
    if (country) {
      if (user) {
        dispatch(getUsersByCountry(country, user));
      }
    }
  }, [country]);

  return (
    <>
      <Button onClick={handleShow}>Advanced search</Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Advance Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form.Group>
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdvanceSearch;
