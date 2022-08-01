import { useState } from "react";

const UseField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return {
    type,
    onChange,
    value,
  };
};
export default UseField;
