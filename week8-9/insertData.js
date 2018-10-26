// modules
const { Client } = require('pg');
var async = require('async');
var fs = require('fs');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'zuic';
db_credentials.host = 'zuicdb.ckrsutvzcxxy.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aameetings';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var rawData = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week8-9/m09toSql.json');
var m05 = JSON.parse(rawData);


async.eachSeries(m05, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    // var thisQuery = "INSERT INTO aadata VALUES (E"+value.zone+", '"+value.group+"', '"+value.location+"', '"+value.address+"', "+value.latLon.Latitude+", "+value.latLon.Longitude+", '{"+value.day+"}', '{"+value.start+"}', '{"+value.end+"}', '{"+value.type+"}', '{"+value.spinterest+"}', '"+value.wheelchair+"');";

    var thisQuery = "INSERT INTO aainfo ( address,mtgroup,lat,long, mtlocation, wheelchair ,mtdate, mtstart, mtend, mttype,mtspin,mtzone) VALUES (E'"+value.address+"','"+value.group + "',"+value.latLon.Latitude+ ","+ value.latLon.Longitude+ ",'"+ value.location+"','"+value.wheelchair+ "','{"+ value.day + "}','{" + value.start + "}','{"+ value.end +"}','{"+value.type+"}','{"+ value.spinterest+ "}',"+ value.zone+");";
    setTimeout(callback, 1000);
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
});

// // drop tables
// const client = new Client(db_credentials);
// client.connect();
// var thisQuery = "DROP TABLE aainfo";
//     client.query(thisQuery, (err, res) => {
//         console.log(err, res);
//         client.end();
//     });
