import Geocode from "react-geocode";
import { useState, useEffect } from "react";

const reverseGeocoder = async (setResults) => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    Geocode.setApiKey("AIzaSyB_TnuRBpNYHV-t01uetyK-VvkK572uHL4");
    Geocode.fromLatLng(lat, long).then((response) => {
      setResults(response.results[10].formatted_address);
    });
  });
};

const useLocation = () => {
  const [results, setResults] = useState("");

  useEffect(() => {
    reverseGeocoder(setResults);
  }, []);

  return results;
};

export default useLocation;
