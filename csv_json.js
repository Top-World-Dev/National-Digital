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
  }).fromFile('./static/de.ryd.one-gas-stations.csv');
}

csvToJson()
.then(places => {
 
  const filepath = `./static/de.ryd.one-places.json`;

  fs.writeFile(filepath, JSON.stringify(places), (err) => {
    if (err) throw err;
  }); 

})
.catch(err => {
  // log error if any
  console.log(err);
});