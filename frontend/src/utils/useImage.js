import { useState } from "react";

const useImage = () => {
  const [value, setValue] = useState([]);
  const maxNumber = 5;
  const onChange = (imageList, addUpdatedIndex) => {
    setValue(imageList);
  };
  const dataURLKey = "data_url";
  const acceptType = ["jpg", "png"];
  return {
    value,
    maxNumber,
    onChange,
    dataURLKey,
    acceptType,
  };
};

export default useImage;