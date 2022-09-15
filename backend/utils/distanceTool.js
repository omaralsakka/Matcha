const distance = require('gps-distance');

const distanceTool = (coordsObj) => {
    const result = distance(coordsObj.start[0], coordsObj.start[1], coordsObj.end[0], coordsObj.end[1]);
    const strResult = result.toString();
    if(strResult === '0'){
        return strResult;
    }
    return strResult.slice(0, -13);
}

module.exports = distanceTool;