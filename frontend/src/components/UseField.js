import { useState } from "react";

const UseField = (type, defaultValue) => {
  const [value, setValue] = useState(defaultValue);

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
