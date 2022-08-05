require("dotenv").config();
import Geocode from "react-geocode";

const reverseGeocoder = () => {

	let lat;
	let long;

	navigator.geolocation.getCurrentPosition(function(position) {
	  lat = position.coords.latitude;
	  long = position.coords.longitude;
	  
	  Geocode.setApiKey(process.env.GEOAPI);
	  let address;
 
	  Geocode.fromLatLng(lat, long).then(
		  (response) => {
			  address = response.results[0].formatted_address;
			  return(address)
		  },
		  (error) => {
			  console.error(error);
		  }
	  );
	});
}

export default reverseGeocoder;