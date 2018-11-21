var fs = require('fs');
var mdata = JSON.parse(fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week10/aameetings.json'));
var unnestdata = [];

for (var i in mdata){
  for (var j=0; j<mdata[i].mtday.length; j++){
    var mt={};
    mt.address = mdata[i].address;
    mt.mtgroup = mdata[i].mtgroup;
    mt.lat = mdata[i].lat;
    mt.long = mdata[i].long;
    mt.mtlocation = mdata[i].mtlocation;
    mt.wheelchair = mdata[i].wheelchair;
    mt.mtday = mdata[i].mtday[j];
    mt.mtstart = mdata[i].mtstart[j];
    mt.mtend = mdata[i].mtend[j];
    mt.mttype = mdata[i].mttype[j];
    mt.mtspin = mdata[i].mtspin[j];
    mt.mtzone = mdata[i].mtzone;
    unnestdata.push(mt);
  }
}

fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week10/unnestaameetings.json', JSON.stringify(unnestdata));
