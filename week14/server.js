var express = require('express'), // npm install express
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = 'zuic';
db_credentials.host = 'dsdbinstance.ckrsutvzcxxy.us-east-1.rds.amazonaws.com';
db_credentials.database = 'ds';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// AWS DynamoDB credentials
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-1";

// respond to requests for /sensor
app.get('/sensor', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(HOUR FROM sensortime) as sensorhour, sensorvalue, COUNT(sensorvalue)
             FROM sensorData
             GROUP BY sensorhour
             ORDER BY sensorhour;`;

    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.send(qres.rows);
            client.end();
            console.log('1) responded to request for sensor data');
        }
    });
});

// // respond to requests for /aameetings
// app.get('/aameetings', function(req, res) {
//
//     // Connect to the AWS RDS Postgres database
//     const client = new Pool(db_credentials);
//
//     // SQL query
//     var thisQuery = `SELECT mtspin,  json_agg(json_build_object('day', mtday, 'time', mtstart)) as schedule, json_agg(json_build_object('lat',lat, 'long',long, 'address', address)) as location,  COUNT(DISTINCT address) as num_obs
//                  FROM aameetings
//                  WHERE mtspin!='null' AND (mtday='Saturday' OR mtday='Sunday')
//                  GROUP BY mtspin
//                  ;`;
//
//     client.query(thisQuery, (qerr, qres) => {
//         if (qerr) { throw qerr }
//         else {
//             res.send(qres.rows);
//             client.end();
//             console.log('2) responded to request for aa meeting data');
//         }
//     });
// });

// respond to requests for /deardiary
// app.get('/deardiary', function(req, res) {
//
//     // Connect to the AWS DynamoDB database
//     var dynamodb = new AWS.DynamoDB();
//
//     // DynamoDB (NoSQL) query
//     var params = {
//         TableName: "deardiary",
//         KeyConditionExpression: "#ae = :aerobicType and dt between :minDate and :maxDate", // the query expression
//         ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
//             "#ae" : "aerobic"
//         },
//         ExpressionAttributeValues: { // the query values
//             ":aerobicType": {S: "none"},
//             ":minDate": new Date("2018-11-01").getTime(),
//             ":maxDate": new Date("2018-11-24").getTime()
//         }
//     };
//
//     dynamodb.query(params, function(err, data) {
//         if (err) {
//             console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
//         }
//         else {
//             res.send(data.Items);
//             console.log('3) responded to request for dear diary data');
//         }
//     });
//
// });

// serve static files in /public
app.use(express.static('public'));

// listen on port 8000
app.listen(8000, function() {
    console.log('Server listening...');
});
