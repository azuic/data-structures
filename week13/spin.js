var fs = require('fs');

var data = JSON.parse(fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week13/spin.json'));

var spin = [];

for (var i=0; i<data.length; i++) {
  spin.push(data[i].mtspin);
}

fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week8-9/sp.json', JSON.stringify(spin));
