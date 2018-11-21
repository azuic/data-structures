// modules
const { Client } = require('pg');
var async = require('async');
var fs = require('fs');

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'zuic';
db_credentials.host = 'dsdbinstance.ckrsutvzcxxy.us-east-1.rds.amazonaws.com';
db_credentials.database = 'ds';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

var rawData = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week10/unnestaameetings.json');
var mdata = JSON.parse(rawData);


async.eachSeries(mdata, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();

    var thisQuery = "INSERT INTO aameetings ( address,mtgroup,lat,long, mtlocation, wheelchair ,mtday, mtstart, mtend, mttype,mtspin,mtzone) VALUES (E'"+value.address+"','"+value.mtroup + "',"+value.lat+ ","+ value.long+ ",'"+ value.mtlocation+"','"+value.wheelchair+ "','{"+ value.mtday + "}','{" + value.mtstart + "}','{"+ value.mtend +"}','{"+value.mttype+"}','{"+ value.mtspin+ "}',"+ value.mtzone+");";
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
