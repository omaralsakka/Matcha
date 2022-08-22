const axios = require('axios');

const getCapital = async (country) => {
	// change first letter of country to capital
	try {
		const response = await axios.get(`https://restcountries.com/v2/name/${country}`)
		if(response.data.length) {
			const capital = response.data[0].capital;
			const location = capital + ', ' + country;
			return (location);
		} else {
			return false;
		}
	} catch (error) {
		console.log(error.message)
		return false
	}
}

export default getCapital;
