import { Alert } from "react-bootstrap";

const AlertInput = ({ variant, text }) => {
  return (
    <Alert className="mt-3 fs-7 p-2" variant={variant}>
      {text}
    </Alert>
  );
};

export default AlertInput;
