require("dotenv").config();
const NodeGeocoder = require('node-geocoder');

const getCoords = async (city) => {

	const options = {
		provider: 'google',
		apiKey: process.env.GEOAPI,
		formatter: null
	};
	const geocoder = NodeGeocoder(options);
	const res = await geocoder.geocode(city);
	const coords = [res[0].latitude, res[0].longitude];
	return coords;
}

module.exports = getCoords;