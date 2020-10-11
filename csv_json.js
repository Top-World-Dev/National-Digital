const csv = require('csvtojson');
const fs = require('fs');




const csvToJson = async() => {
  return json = await csv({
    colParser: {
      'map_id': 'number',
      'lat': 'number',
      'lng': 'number'
    }
  }).fromFile('./static/de.ryd.one-places.csv');
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