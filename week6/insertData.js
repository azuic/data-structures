// modules
const { Client } = require('pg');
var async = require('async');
var fs = require('fs');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'zuic';
db_credentials.host = 'zuicdb.ckrsutvzcxxy.us-east-1.rds.amazonaws.com';
db_credentials.database = 'm03meetings';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var rawData = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03LatLon.json');
var m03Location = JSON.parse(rawData);


async.eachSeries(m03Location, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO location_info VALUES (E'" + value.address + "', " + value.latLon.Latitude + ", " + value.latLon.Longitude + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000);
});
