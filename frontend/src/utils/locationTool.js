import Geocode from "react-geocode";
import { useState, useEffect } from "react";

const reverseGeocoder = async (setResults) => {

	navigator.geolocation.getCurrentPosition(async (position) => {
		let lat = position.coords.latitude;
		let long = position.coords.longitude;
		Geocode.setApiKey(/* ask luke the api key */);
		Geocode.fromLatLng(lat, long).then(response => {
			setResults(response.results[6].formatted_address);
		})
	});
}

const useLocation = () => {
	const [results, setResults] = useState("");

	useEffect(() => {
		reverseGeocoder(setResults);
	}, []);

	return (results);
}

export default useLocation;