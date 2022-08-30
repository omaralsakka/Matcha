const getDate = () => {
  let currentdate = new Date();
  let datetime =
    currentdate.getFullYear() +
    "." +
    (currentdate.getMonth() + 1) +
    "." +
    currentdate.getDate() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return datetime;
};

export default getDate;
