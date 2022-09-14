const geoip = require("geoip-lite");
const axios = require("axios");

const ipLocator = async (ip) => {
  let geo = geoip.lookup("194.136.126.35");
  let city = geo.city;
  let capital = geo.timezone.split("/");
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/capital/${capital[1]}`
    );
    if (response.data.length) {
      const country = response.data[0].name.common;
      const location = city + ", " + country;
      return location;
    }
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

module.exports = ipLocator;
