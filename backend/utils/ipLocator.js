const geoip = require('geoip-lite');

const ipLocator = (ip) => {
	let geo = geoip.lookup(ip);
	return geo;
}

module.exports = ipLocator;