var request = require('request');
vat fs = require('fs');

request('https://parsons.nyc/aa/m01.html',function(error, response, body){
  if (!error && response.statusCode == 200){
    fs.writeFileSync('~/Documents/azuic/data-structures/aa-meeting-list/m01.txt',body)
  }
  else {console.log("Request failed!")}
});
