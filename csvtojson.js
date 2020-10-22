const csv = require('csvtojson');
const fs = require('fs');

const csvToJson = async() => {
  return json = await csv({
    colParser: {
      'id': 'number',
      'lat': 'number',
      'lon': 'number',
      'houseNumber': 'number',
      'zip': 'number'
    }
  }).fromFile('./ryd-locations.csv');
}

csvToJson()
.then(places => {
 
  const filepath = `./static/mapdata.json`;

  fs.writeFile(filepath, JSON.stringify(places), (err) => {
    if (err) throw err;
  }); 

})
.catch(err => {
  // log error if any
  console.log(err);
});