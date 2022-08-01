import { Form } from "react-bootstrap";

const FormCheck = ({ consent, setConsent }) => {
  return (
    <Form.Check
      type="switch"
      id="custom-switch"
      label="I agree"
      onClick={() => (consent ? setConsent(false) : setConsent(true))}
    />
  );
};

export default FormCheck;
