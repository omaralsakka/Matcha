require("dotenv").config();
import Geocode from "react-geocode";

const reverseGeocoder = (lat, long) => {

	Geocode.setApiKey(process.env.GEOAPI);
	let address;

	Geocode.fromLatLng(lat, long).then(
		(response) => {
			address = response.results[0].formatted_address;
		},
		(error) => {
			console.error(error);
		}
	);
	return(address);
}

export default reverseGeocoder;