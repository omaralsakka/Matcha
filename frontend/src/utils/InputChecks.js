import ageConvertion from "./ageConvertion";

export const checkUserName = (username) => {
  const valid = /^[0-9a-zA-Z]{3,}$/;
  return valid.test(username);
};

export const checkPassword = (password) => {
  const valid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return valid.test(password);
};

export const checkFullName = (fullname) => {
  const valid = /^[a-zA-Z]+(\s[a-zA-Z]*){0,2}$/;
  if (fullname.length >= 6 && fullname.length <= 20 && valid.test(fullname)) {
    return true;
  }
  return false;
};

export const checkEmail = (email) => {
  const valid =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return valid.test(email);
};

export const checkAge = (age) => {
  const result = ageConvertion(age);
  if (result > 18) {
    return true;
  }
  return false;
};

const checkInputs = (username, password, fullname, email, age) => {
  return checkFullName(fullname) &&
    checkPassword(password) &&
    checkUserName(username) &&
    checkEmail(email) &&
    checkAge(age)
    ? true
    : false;
};

export default checkInputs;
