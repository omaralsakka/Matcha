require("dotenv").config();
import Geocode from "react-geocode";
// npm i react-geocode

const reverseGeocoder = () => {

	navigator.geolocation.getCurrentPosition((position) => {
		let lat = position.coords.latitude;
		let long = position.coords.longitude;

		/* Geocode.setApiKey(process.env.GEOAPI);
		const resp = Geocode.fromLatLng(lat, long);
		console.log(resp); */

		/* Geocode.fromLatLng(lat, long).then(
			(response) => {
				let address = response.results[0].formatted_address;
				console.log(address)
			},
			(error) => {
				console.error(error);
			}
		); */
	});
}

export default reverseGeocoder;