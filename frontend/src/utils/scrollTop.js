import { useEffect } from "react";

const ScrollTop = (id) => {
  useEffect(() => {
    const element = document.getElementById(id);
    element.scrollIntoView();
  }, [id]);
};

export default ScrollTop;
