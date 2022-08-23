import { useState, useEffect } from "react";

const useImage = (defaultValue) => {
  const [value, setValue] = useState([]);
  useEffect(() => {
    if (defaultValue.length) {
      const imagesArr = defaultValue.map((image) => ({
        data_url: image.picture,
      }));
      setValue(imagesArr);
    }
  }, [defaultValue]);
  const maxNumber = 5;
  const onChange = (imageList, addUpdatedIndex) => {
    setValue(imageList);
  };
  const dataURLKey = "data_url";
  const acceptType = ["jpg", "png"];
  const maxFileSize = 5242880;
  return {
    value,
    maxNumber,
    onChange,
    dataURLKey,
    acceptType,
    maxFileSize,
  };
};

export default useImage;
