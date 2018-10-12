var diaryEntries = [];

class DiaryEntry {
  constructor(primaryKey, date, veggies, protein, carbs,cardio,weight) {
    this.pk = {};
    this.pk.N = primaryKey.toString();
    this.date = {};
    this.date.S = new Date(date).toDateString();
    if (veggies != null) {
      this.veggies = {};
      this.veggies.SS = veggies;
    }
    if (protein != null) {
      this.protein = {};
      this.protein.SS = protein;
    }
    if (carbs != null) {
      this.carbs = {};
      this.carbs.SS = carbs;
    }
    this.cardio = {};
    this.cardio.BOOL = cardio;
    this.weight = {};
    this.weight.BOOL = weight;
  }
}

diaryEntries.push(new DiaryEntry(0, '2018-09-26', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], null,true,true));
diaryEntries.push(new DiaryEntry(1, '2018-09-27', ["pumpkin","lettuce","cabbage","mushroom","carrot"], ["shrimp","beef"], ["rice"],true,true));
diaryEntries.push(new DiaryEntry(2, '2018-09-28', ["spinach","cucumber","tomato"], ["chicken","tofu"], ["corn"],true,false));
diaryEntries.push(new DiaryEntry(3, '2018-09-29', ["spinach","cucumber","tomato"], ["egg","milk","tofu"], ["corn"],true,true));

// console.log(diaryEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

for (var i=0; i<diaryEntries.length; i++){
  var params = {};
  params.Item = diaryEntries[i];
  params.TableName = "dear-diary";

  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}
