import Geocode from "react-geocode";
import { useState, useEffect } from "react";

const reverseGeocoder = async (setResults, setCoords) => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
	const coords = [lat, long];
	setCoords(coords);
    Geocode.setApiKey("");
    Geocode.fromLatLng(lat, long).then((response) => {
      setResults(response.results[6].formatted_address);
    });
  });
};

const useLocation = () => {
  const [results, setResults] = useState("");
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    reverseGeocoder(setResults, setCoords);
  }, []);

  return {
	  location : results,
	  coords : coords};
  };

export default useLocation;
