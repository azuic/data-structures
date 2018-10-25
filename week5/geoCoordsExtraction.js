//require Modules
var request = require('request');
var async = require('async');
var fs = require('fs');

var apiKey = process.env.TAMU_KEY;

var meetingsData = [];
var lat

// var rawData = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week8-9/m09.json');
// var m09 = JSON.parse(rawData);
// var addresses = m09.map(i => i.address.split(',')[0]);

// var rawData = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03toFix.json');
// var m03tofix = JSON.parse(rawData);
// var addresses = m03tofix.map(i => i.address.split(',')[0]);
//
// console.log(addresses);
// async.eachSeries(
//   addresses,
//
//   // requesting geo coords from API
//   function(value, callback) {
//     var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
//     // apiRequest += 'streetAddress=' + value.split(' ').join('%20');
//     apiRequest += 'streetAddress=' + value;
//     apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
//     apiRequest += '&format=json&version=4.01';
//     request(
//       apiRequest,
//       function(err, resp, body) {
//         if (err) {
//           throw err;
//         } else {
//             var tamuGeo = JSON.parse(body);
//             console.log(tamuGeo['FeatureMatchingResultType']);
//             meetingsData.push(tamuGeo);
//         }
//       }
//     );
//     setTimeout(callback, 2000); // increase from 2000 to get complete list
//   },
//
//   // write into json file
//   function() {
//     fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03Fixes.json', JSON.stringify(meetingsData));
//     console.log('*** *** *** *** ***');
//     console.log('Number of meetings in this zone: ');
//     console.log(meetingsData.length);
//   }
// );


var m03Fixes =   fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03Fixes.json');
var m03fix = JSON.parse(m03Fixes);

var m03FixLatLon = m03fix.map(i => ({'address':i.InputAddress.StreetAddress.slice(0,-13)+", New York, NY", 'latLon':{'Latitude':i.OutputGeocodes[0].OutputGeocode.Latitude,
          'Longitude':i.OutputGeocodes[0].OutputGeocode.Longitude}}));


fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03FixLatLon.json', JSON.stringify(m03FixLatLon));
