const { Client } = require('pg');
const cTable = require('console.table');

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

// Sample SQL statement to query meetings on Monday that start on or after 7:00pm:
var thisQuery = "SELECT * FROM aameetings LIMIT 5";

client.query(thisQuery, (err, res) => {
    if (err) {throw err}
    else {
        console.table(res.rows);
        console.log(res);
        client.end();
    }
});
