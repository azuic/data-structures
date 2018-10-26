var diaryEntries = [];

class DiaryEntry {
  constructor(dt, veggies, protein, carbs,cardio,aerobic) {
    this.dt = {};
    this.dt.S = new Date(dt).toDateString();
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
    this.aerobic = {};
    this.aerobic.S = aerobic;
  }
}

diaryEntries.push(new DiaryEntry('2018-09-25', ["spinach","cucumber","tomato"], ["egg","milk","tofu"], ["corn"],true,"leg"));
diaryEntries.push(new DiaryEntry('2018-09-26', ["spinach","cucumber","tomato"], ["egg","milk","tofu"], ["corn"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-09-27', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-09-28', ["pumpkin","lettuce","cabbage","mushroom","carrot"], ["shrimp","beef"], ["rice"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-09-29', ["spinach","cucumber","tomato"], ["chicken","tofu"], ["corn"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-09-30', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-01', ["pumpkin","lettuce","cabbage","mushroom","carrot"], ["shrimp","beef"], ["rice"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-10-02', ["spinach","cucumber","tomato"], ["chicken","tofu"], ["corn"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-03', ["spinach","cucumber","tomato b"], ["egg","milk","tofu"], ["corn"],true,"upper body"));
diaryEntries.push(new DiaryEntry('2018-10-04', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-05', ["pumpkin","lettuce","cabbage","mushroom","carrot"], ["shrimp","beef"], ["rice"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-10-06', ["spinach","cucumber","tomato"], ["chicken","tofu"], ["corn"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-07', ["spinach","cucumber","tomato"], ["egg","milk","tofu"], ["corn"],true,"none"));
diaryEntries.push(new DiaryEntry('2018-10-08', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-09', ["pumpkin","lettuce","cabbage","mushroom","carrot"], ["shrimp","beef"], ["rice"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-10-10', ["spinach","cucumber","tomato"], ["chicken","tofu"], ["corn"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-11', ["spinach","cucumber","tomato"], ["egg","milk","tofu"], ["corn"],true,"none"));
diaryEntries.push(new DiaryEntry('2018-10-12', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-13', ["pumpkin","lettuce","cabbage","mushroom","carrot"], ["shrimp","beef"], ["rice"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-10-14', ["spinach","cucumber","tomato"], ["chicken","tofu"], ["corn"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-15', ["spinach","cucumber","tomato"], ["egg","milk","tofu"], ["corn"],true,"none"));
diaryEntries.push(new DiaryEntry('2018-10-16', ["spinach","cucumber","tomato"], ["egg","milk","tofu"], ["corn"],true,"none"));
diaryEntries.push(new DiaryEntry('2018-10-17', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-18', ["pumpkin","lettuce","cabbage","mushroom","carrot"], ["shrimp","beef"], ["rice"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-10-19', ["spinach","cucumber","tomato"], ["chicken","tofu"], ["corn"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-20', ["spinach","cucumber","tomato"], ["egg","milk","tofu"], ["corn"],true,"none"));
diaryEntries.push(new DiaryEntry('2018-10-21', ["spinach","cucumber","tomato"], ["egg","milk","tofu"], ["corn"],true,"none"));
diaryEntries.push(new DiaryEntry('2018-10-22', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-23', ["pumpkin","lettuce","cabbage","mushroom","carrot"], ["shrimp","beef"], ["rice"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-10-24', ["spinach","cucumber","tomato"], ["chicken","tofu"], ["corn"],true,"core"));

// console.log(diaryEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

for (var i=0; i<diaryEntries.length; i++){
  var params = {
  };
  params.Item = diaryEntries[i];
  params.TableName = "diary-v1";
  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}
