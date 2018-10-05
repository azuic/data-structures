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

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create a table:
var thisQuery = "CREATE TABLE location_info (address varchar(100), lat double precision, lon double precision);";
//var thisQuery = "DROP TABLE location_info;";
// Sample SQL statement to delete a table:
// var thisQuery = "DROP TABLE aalocations;";
// Sample SQL statement to query the entire contents of a table:
// var thisQuery = "SELECT * FROM aalocations;";

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});
