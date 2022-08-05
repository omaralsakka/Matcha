require("dotenv").config();
import Geocode from "react-geocode";
import { useState, useEffect } from "react";

const reverseGeocoder = async (setResults) => {

	navigator.geolocation.getCurrentPosition(async (position) => {
		let lat = position.coords.latitude;
		let long = position.coords.longitude;
		Geocode.setApiKey("AIzaSyB_TnuRBpNYHV-t01uetyK-VvkK572uHL4");
		Geocode.fromLatLng(lat, long).then(response => {
			console.log(response.results[0].formatted_address);
		})
	}); // this function will log the location, still have to think about how to return the value if needed

}

/* const Location = () => {
	const [results, setResults] = useState("");

	useEffect(() => {
		reverseGeocoder(setResults);
	}, []);
	console.log(results);

	return (
		<div><p>{$results}</p></div>
	);
} */

export default reverseGeocoder;