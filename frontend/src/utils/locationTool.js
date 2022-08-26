import axios from "axios";
import { useState, useEffect } from "react";

const GEOAPI = process.env.REACT_APP_GEOAPI;

const reverseGeocoder = (setResults, setCoords) => {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
	const coords = [lat, long];
	setCoords(coords);
	const params = {
		access_key: GEOAPI,
		query: lat + ", " + long
	}
	axios.get('http://api.positionstack.com/v1/reverse', {params}).then((response) => {
		const formattedLocation = response.data.data[0].county + ", " + response.data.data[0].country;
		setResults(formattedLocation);
	})
  });
};

const useLocation = () => {
  const [results, setResults] = useState("");
  const [coords, setCoords] = useState([0.0, 0.0]);

  useEffect(() => {
    reverseGeocoder(setResults, setCoords);
  }, []);

  return {
	  location : results,
	  coords : coords};
  };

export default useLocation;
