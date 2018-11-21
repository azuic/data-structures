var fs = require('fs');

var filePath = '/Users/zuic/Documents/azuic/data-structures/week10/M';
var suffix = 'CleanData.json';
var aameetings = [];

// address,mtgroup,lat,long, mtlocation, wheelchair ,mtdate, mtstart, mtend, mttype,mtspin,mtzone

var mdata;

mdata = JSON.parse(fs.readFileSync(filePath+'01'+suffix));
for (var i in mdata){
  var mt ={};
  mt.address = mdata[i].streetAddress;
  mt.mtgroup = mdata[i].group;
  mt.lat = mdata[i].lat;
  mt.long = mdata[i].long;
  mt.mtlocation = mdata[i].mtlocation;
  mt.wheelchair = mdata[i].wheelchair;
  mt.mtday = mdata[i].day;
  mt.mtstart = mdata[i].start;
  mt.mtend = mdata[i].end;
  mt.mttype = mdata[i].type;
  mt.mtspin = mdata[i].spinterest;
  mt.mtzone = mdata[i].zone;
  aameetings.push(mt);
}
mdata = JSON.parse(fs.readFileSync(filePath+'02'+suffix));
for (var i in mdata){
  var mt ={};
  mt.address = mdata[i].streetAddress;
  mt.mtgroup = mdata[i].group;
  mt.lat = mdata[i].lat;
  mt.long = mdata[i].long;
  mt.mtlocation = mdata[i].mtlocation;
  mt.wheelchair = mdata[i].wheelchair;
  mt.mtday = mdata[i].day;
  mt.mtstart = mdata[i].start;
  mt.mtend = mdata[i].end;
  mt.mttype = mdata[i].type;
  mt.mtspin = mdata[i].spinterest;
  mt.mtzone = mdata[i].zone;
  aameetings.push(mt);
}
mdata = JSON.parse(fs.readFileSync(filePath+'04'+suffix));
for (var i in mdata){
  var mt ={};
  mt.address = mdata[i].streetAddress;
  mt.mtgroup = mdata[i].group;
  mt.lat = mdata[i].lat;
  mt.long = mdata[i].long;
  mt.mtlocation = mdata[i].mtlocation;
  mt.wheelchair = mdata[i].wheelchair;
  mt.mtday = mdata[i].day;
  mt.mtstart = mdata[i].start;
  mt.mtend = mdata[i].end;
  mt.mttype = mdata[i].type;
  mt.mtspin = mdata[i].spinterest;
  mt.mtzone = mdata[i].zone;
  aameetings.push(mt);
}
mdata = JSON.parse(fs.readFileSync(filePath+'06'+suffix));
for (var i in mdata){
  var mt ={};
  mt.address = mdata[i].address;
  mt.mtgroup = mdata[i].group;
  mt.lat = mdata[i].latLong.Lat;
  mt.long = mdata[i].latLong.Lng;
  mt.mtlocation = mdata[i].mtlocation;
  mt.wheelchair = mdata[i].wheelchair;
  mt.mtday = mdata[i].mtDate;
  mt.mtstart = mdata[i].start;
  mt.mtend = mdata[i].end;
  mt.mttype = mdata[i].type;
  mt.mtspin = mdata[i].spinterest;
  mt.mtzone = mdata[i].zone;
  aameetings.push(mt);
}
mdata = JSON.parse(fs.readFileSync(filePath+'07'+suffix));
for (var i in mdata){
  var mt ={};
  mt.address = mdata[i].streetAddress;
  mt.mtgroup = mdata[i].group;
  mt.lat = mdata[i].latitude;
  mt.long = mdata[i].longitude;
  mt.mtlocation = mdata[i].mtlocation;
  mt.wheelchair = mdata[i].wheelchair;
  mt.mtday = mdata[i].day;
  mt.mtstart = mdata[i].start;
  mt.mtend = mdata[i].end;
  mt.mttype = mdata[i].type;
  mt.mtspin = mdata[i].spinterest;
  mt.mtzone = mdata[i].zone;
  aameetings.push(mt);
}
mdata = JSON.parse(fs.readFileSync(filePath+'08'+suffix));
for (var i in mdata){
  var mt ={};
  mt.address = mdata[i].streetAddress;
  mt.mtgroup = mdata[i].group;
  mt.lat = mdata[i].latitude;
  mt.long = mdata[i].longitude;
  mt.mtlocation = mdata[i].mtlocation;
  mt.wheelchair = mdata[i].wheelchair;
  mt.mtday = mdata[i].day;
  mt.mtstart = mdata[i].start;
  mt.mtend = mdata[i].end;
  mt.mttype = mdata[i].type;
  mt.mtspin = mdata[i].spinterest;
  mt.mtzone = mdata[i].zone;
  aameetings.push(mt);
}
mdata = JSON.parse(fs.readFileSync(filePath+'10'+suffix));
for (var i in mdata){
  var mt ={};
  mt.address = mdata[i].address;
  mt.mtgroup = mdata[i].group;
  mt.lat = mdata[i].latLong.Lat;
  mt.long = mdata[i].latLong.Lng;
  mt.mtlocation = mdata[i].mtlocation;
  mt.wheelchair = mdata[i].wheelchair;
  mt.mtday = mdata[i].mtDate;
  mt.mtstart = mdata[i].start;
  mt.mtend = mdata[i].end;
  mt.mttype = mdata[i].type;
  mt.mtspin = mdata[i].spinterest;
  mt.mtzone = mdata[i].zone;
  aameetings.push(mt);
}

mdata = JSON.parse(fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week8-9/m03toSql.json'));
for (var i in mdata){
  var mt ={};
  mt.address = mdata[i].address.replace(",","");
  mt.mtgroup = mdata[i].group;
  mt.lat = mdata[i].latLon.Latitude;
  mt.long = mdata[i].latLon.Longitude;
  mt.mtlocation = mdata[i].location;
  mt.wheelchair = mdata[i].wheelchair;
  mt.mtday = mdata[i].day;
  mt.mtstart = mdata[i].start;
  mt.mtend = mdata[i].end;
  mt.mttype = mdata[i].type;
  mt.mtspin = mdata[i].spinterest;
  mt.mtzone = mdata[i].zone;
  aameetings.push(mt);
}

mdata = JSON.parse(fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week8-9/m05toSql.json'));
for (var i in mdata){
var mt ={};
  mt.address = mdata[i].address.replace(",","");
  mt.mtgroup = mdata[i].group;
  mt.lat = mdata[i].latLon.Latitude;
  mt.long = mdata[i].latLon.Longitude;
  mt.mtlocation = mdata[i].location;
  mt.wheelchair = mdata[i].wheelchair;
  mt.mtday = mdata[i].day;
  mt.mtstart = mdata[i].start;
  mt.mtend = mdata[i].end;
  mt.mttype = mdata[i].type;
  mt.mtspin = mdata[i].spinterest;
  mt.mtzone = mdata[i].zone;
  aameetings.push(mt);
}
mdata = JSON.parse(fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week8-9/m09toSql.json'));
for (var i in mdata){
  var mt ={};
  mt.address = mdata[i].address.replace(",","");
  mt.mtgroup = mdata[i].group;
  mt.lat = mdata[i].latLon.Latitude;
  mt.long = mdata[i].latLon.Longitude;
  mt.mtlocation = mdata[i].location;
  mt.wheelchair = mdata[i].wheelchair;
  mt.mtday = mdata[i].day;
  mt.mtstart = mdata[i].start;
  mt.mtend = mdata[i].end;
  mt.mttype = mdata[i].type;
  mt.mtspin = mdata[i].spinterest;
  mt.mtzone = mdata[i].zone;
  aameetings.push(mt);
}
fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week10/aameetings.json', JSON.stringify(aameetings));
