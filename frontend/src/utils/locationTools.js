require("dotenv").config();
import Geocode from "react-geocode";
// npm i react-geocode

const reverseGeocoder = () => {

	let resp;

	navigator.geolocation.getCurrentPosition(async (position) => {
		let lat = position.coords.latitude;
		let long = position.coords.longitude;
		Geocode.setApiKey("AIzaSyB_TnuRBpNYHV-t01uetyK-VvkK572uHL4");
		resp = await Geocode.fromLatLng(lat, long);
		/* console.log(resp.results[0].formatted_address); */
	});

	setTimeout(() => {
		console.log(resp.results[0].formatted_address);
	}, "5000");
	
}

export default reverseGeocoder;