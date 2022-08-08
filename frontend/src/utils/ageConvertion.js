const ageConvertion = (age) => {
  let birthday = new Date(age);
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs);
  const result = Math.abs(ageDate.getUTCFullYear() - 1970);

  return result;
};

export default ageConvertion;
