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

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// // Sample SQL statement to create a table:
// var thisQuery = "CREATE TABLE aadata (mtzone int, mtgroup varchar(100), mtlocation varchar(100), mtaddress varchar(100), mtlat double precision, mtlon double precision, mtday varchar(10), mtstart time, mtend time, mttype varchar(10), mtspinterest varchar(100), mtwheelchair bool);";
//var thisQuery = "DROP TABLE location_info;";
// Sample SQL statement to delete a table:
// var thisQuery = "DROP TABLE aalocations;";
// Sample SQL statement to query the entire contents of a table:
// var thisQuery = "SELECT * FROM aalocations;";
var thisQuery = `CREATE TABLE aameetings (id serial PRIMARY KEY,
                                           address VARCHAR(100),
                                           lat DOUBLE precision,
                                           long DOUBLE precision,
                                           mtgroup VARCHAR(100),
                                           mtlocation VARCHAR(100),
                                           wheelchair BOOLEAN,
                                           mtday VARCHAR(20),
                                           mtstart VARCHAR(20),
                                           mtend VARCHAR(20),
                                           mttype VARCHAR(10),
                                           mtspin TEXT,
                                           mtzone SMALLINT
                                           );`;


client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
