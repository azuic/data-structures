// //require Modules
// var request = require('request');
// var async = require('async');
// var fs = require('fs');
// 
// // read json data
// var rawGeoData = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03Geocodes.json');
// var m03Geocodes = JSON.parse(rawGeoData);
//
// var rawLatLon = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03LatLon.json');
// var m03LatLon = JSON.parse(rawLatLon);
//
// // get index
// var indLatLon = m03LatLon.map(e => e.address).indexOf('206208 E 11TH ST, New York, NY');
// var indGeo = m03Geocodes.map(e => e.InputAddress.StreetAddress).indexOf("206208 E 11TH ST New York NY ");
//
// // request the indGeo-th address again
// var apiKey = process.env.TAMU_KEY;
// async.eachSeries(
//   // add "-" to street number
//   ["206&ndash208 E 11TH ST New York NY "],
//
//   // requesting geo coords from API
//   function(value, callback) {
//     var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
//     apiRequest += 'streetAddress=' + value.split(' ').join('%20');
//     apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
//     apiRequest += '&format=json&version=4.01';
//     request(
//       apiRequest,
//       function(err, resp, body) {
//         if (err) {
//           throw err;
//         } else {
//             var tamuGeo = JSON.parse(body);
//             console.log(tamuGeo);
//             m03Geocodes[indGeo]=tamuGeo;
//         }
//       }
//     );
//     setTimeout(callback, 2000); // increase from 2000 to get complete list
//   },
//
//   // write into json file
//   function() {
//     fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03Geocodes.json', JSON.stringify(m03Geocodes));
//     console.log('*** *** *** *** ***');
//     console.log('Number of meetings in this zone: ');
//     console.log(m03Geocodes.length);
//   }
// );
// console.log(tamuGeo);
//
// m03LatLon[indLatLon] = {'address':m03Geocodes[indGeo].InputAddress.StreetAddress.slice(0,-13)+", New York, NY", 'latLon':{'Latitude':m03Geocodes[indGeo].OutputGeocodes[0].OutputGeocode.Latitude,
//           'Longitude':m03Geocodes[indGeo].OutputGeocodes[0].OutputGeocode.Longitude}};
//
//
// fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03LatLon.json', JSON.stringify(m03LatLon));
