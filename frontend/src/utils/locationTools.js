require("dotenv").config();
import Geocode from "react-geocode";

const reverseGeocoder = () => {

	navigator.geolocation.getCurrentPosition((position) => {
		let lat = position.coords.latitude;
		let long = position.coords.longitude;
		/* Geocode.setApiKey("AIzaSyB_TnuRBpNYHV-t01uetyK-VvkK572uHL4");
		const resp = Geocode.fromLatLng(lat, long);
		console.log(resp); */
	});

}

export default reverseGeocoder;