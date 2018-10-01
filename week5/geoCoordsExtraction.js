//require Modules
var request = require('request');
var async = require('async');
var fs = require('fs');

var apiKey = process.env.TAMU_KEY;

var meetingsData = [];
var lat

var rawData = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03.json');
var m03 = JSON.parse(rawData);
var addresses = m03.map(i => i.address.split(',')[0]);
console.log(addresses.length);
async.eachSeries(
  addresses,

  // requesting geo coords from API
  function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + value.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&format=json&version=4.01';
    request(
      apiRequest,
      function(err, resp, body) {
        if (err) {
          throw err;
        } else {
            var tamuGeo = JSON.parse(body);
            console.log(tamuGeo['FeatureMatchingResultType']);
            meetingsData.push(tamuGeo);
        }
      }
    );
    setTimeout(callback, 4000); // increase from 2000 to get complete list
  },

  // write into json file
  function() {
    fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03Geocodes.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(meetingsData.length);
  }
);


var m03Geocodes =   fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03Geocodes.json');
var m03Data = JSON.parse(m03Geocodes);

var m03LatLon = m03Data.map(i => ({'address':i.InputAddress.StreetAddress.slice(0,-13)+", New York, NY", 'latLon':{'Latitude':i.OutputGeocodes[0].OutputGeocode.Latitude,
          'Longitude':i.OutputGeocodes[0].OutputGeocode.Longitude}}));


fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03LatLon.json', JSON.stringify(m03LatLon));
