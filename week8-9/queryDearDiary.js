// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "diary-v1",
    // KeyConditionExpression: "#ae = :aerobicType and dt between :minDate and :maxDate", // the query expression
    KeyConditionExpression: "#ae = :aerobicType", // the query expression
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#ae" : "aerobic"
    },
    ExpressionAttributeValues: { // the query values
        // ":aerobicType": {S: "core"},
        // ":minDate": {S: new Date("2018-09-27").valueOf().toString()},
        // ":maxDate": {S: new Date("2018-10-04").valueOf().toString()}
        ":aerobicType": {S: "core"}
    }
};

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});
