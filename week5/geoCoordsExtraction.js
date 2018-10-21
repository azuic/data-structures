//require Modules
var request = require('request');
var async = require('async');
var fs = require('fs');

var apiKey = process.env.TAMU_KEY;

var meetingsData = [];
var lat

var rawData = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week8-9/m09.json');
var m09 = JSON.parse(rawData);
var addresses = m09.map(i => i.address.split(',')[0]);
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
    setTimeout(callback, 2000); // increase from 2000 to get complete list
  },

  // write into json file
  function() {
    fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week8-9/m09Geocodes.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(meetingsData.length);
  }
);


var m09Geocodes =   fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week8-9/m09Geocodes.json');
var m09Data = JSON.parse(m09Geocodes);

var m09LatLon = m09Data.map(i => ({'address':i.InputAddress.StreetAddress.slice(0,-13)+", New York, NY", 'latLon':{'Latitude':i.OutputGeocodes[0].OutputGeocode.Latitude,
          'Longitude':i.OutputGeocodes[0].OutputGeocode.Longitude}}));


fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week8-9/m09LatLon.json', JSON.stringify(m09LatLon));
