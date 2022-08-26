require("dotenv").config();
const axios = require('axios');

const getCoords = async (city) => {

	const params = {
	access_key: process.env.GEOAPI,
	query: city
	}

	const coords = await axios.get('http://api.positionstack.com/v1/forward', {params})
	.then(response => {
		return [response.data.data[0].latitude, response.data.data[0].longitude]
	}).catch(error => {
		console.log(error);
	});
	return coords;
}

module.exports = getCoords;