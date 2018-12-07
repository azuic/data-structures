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

diaryEntries.push(new DiaryEntry('2018-09-25', ["spinach","cucumber","tomato"], ["egg","milk","tofu"], ["corn"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-09-26', ["spinach","cucumber","tomato"], ["egg","milk","chicken"], ["corn"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-09-27', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-09-28', ["lettuce","cabbage","mushroom","carrot"], ["shrimp","beef","milk"], ["pumpkin"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-09-29', ["spinach","cucumber","tomato"], ["chicken","tofu","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-09-30', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-01', ["pepper","mushroom","spinach","tomato"], ["shrimp","beef","milk"], ["pasta"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-10-02', ["cucumber","tomato"], ["chicken","tofu","milk"], ["corn"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-03', ["bean","cauliflower"], ["pork","milk","chicken","fish"], ["pasta"],true,"upper body"));
diaryEntries.push(new DiaryEntry('2018-10-04', ["lettuce"], ["scallop","salmon","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-05', ["cabbage","tomato"], ["shrimp","beef","milk"], ["sweet potato"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-10-06', ["spinach","cucumber","tomato"], ["chicken","milk"], ["corn"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-07', ["cucumber","tomato"], ["egg","milk"], ["corn"],true,"none"));
diaryEntries.push(new DiaryEntry('2018-10-08', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], ["potato"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-09', ["tomato","broccoli"], ["shrimp","beef","milk"], ["sweet potato"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-10-10', ["spinach","cucumber","tomato"], ["chicken","tofu","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-11', ["broccoli"], ["egg","milk","tofu"], ["corn"],true,"upper body"));
diaryEntries.push(new DiaryEntry('2018-10-12', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], null,true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-13', ["lettuce","cabbage","mushroom","carrot"], ["shrimp","beef","milk"], null,true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-10-14', ["broccoli","cucumber","tomato"], ["chicken","tofu","milk"], ["corn"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-15', ["spinach","cucumber","tomato"], ["egg","milk","tofu","milk"], null,true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-10-16', ["broccoli","tomato"], ["egg","milk","tofu","milk"], null,true,"upper body"));
diaryEntries.push(new DiaryEntry('2018-10-17', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], ["pasta"],true,"core"));
diaryEntries.push(new DiaryEntry('2018-10-18', ["cabbage","mushroom"], ["shrimp","egg","milk"], ["udon"],false,"lower body"));
diaryEntries.push(new DiaryEntry('2018-10-19', ["broccoli"], ["chicken","tofu","milk"], null,false,"core"));
diaryEntries.push(new DiaryEntry('2018-10-20', ["tomato"], ["egg","milk","tofu"], ["corn"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-10-21', ["spinach","cucumber","tomato"], ["egg","milk","tofu"], ["corn"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-10-22', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], null,false,"core"));
diaryEntries.push(new DiaryEntry('2018-10-23', ["broccoli"], ["shrimp","beef","milk"], ["rice"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-10-24', ["broccoli"], ["chicken","tofu","milk"], ["corn"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-10-25', ["spinach"], ["egg","milk","tofu"], ["rice","noodle"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-10-26', ["tomato"], ["egg","milk","tofu"], ["noodle"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-10-27', ["cabbage","mushroom"], ["egg","beef","milk"], ["udon"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-10-28', ["cauliflower"], ["shrimp","beef","milk"], ["noodle"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-10-29', ["cauliflower","tomato"], ["chicken","milk"], ["corn"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-10-30', ["lettuce","edamame","avocado","seaweed"], ["scallop","salmon","milk"], ["noodle"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-10-31', ["tomato","mushroom","broccoli"], ["chicken","milk"], ["pasta"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-01', ["cauliflower"], ["chicken","milk"], ["potato"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-02', ["spinach","cucumber","tomato"], ["milk",], ["potato"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-03', ["bean sprout"], ["beef","milk"], ["pho"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-04', ["broccoli"], ["beef","milk"], ["rice"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-05', ["broccoli","tomato"], ["duck","milk"], ["noodle"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-06', ["bean","tomato"], ["milk"], ["noodle"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-07', ["bean"], ["beef","milk"], ["pho"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-08', ["tomato"], ["pork","milk"], ["rice"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-09', ["spinach","cucumber","tomato"], ["chicken","milk"], ["cookie"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-10', ["tomato"], ["beef","milk"], ["cookie"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-11', null, ["milk"], ["cookie"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-12', null, ["milk"], ["cookie"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-13', null, ["shrimp","milk"], ["croissant"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-14', ["tomato"], [,"milk","tofu"], ["pasta"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-15', ["tomato"], ["milk","tofu"], ["potato"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-16', ["tomato"], ["beef","chicken","milk"], ["cookie"],true,"lower body"));
diaryEntries.push(new DiaryEntry('2018-11-17', ["lettuce","edamame","avocado","seaweed"], ["milk"], null,false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-18', null, ["shrimp","milk"], ["cookie"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-19', ["tomato"], ["milk"], ["pasta"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-20', ["tomato"], ["milk"], ["croissant"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-21', ["cucumber","tomato"], ["egg","milk","tofu"], ["cookie"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-22', ["tomato"], ["tofu","milk"], ["croissant"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-23', ["broccoli"], ["shrimp","beef","milk"], ["udon","cookie"],false,"none"));
diaryEntries.push(new DiaryEntry('2018-11-24', ["cauliflower","tomato"], ["pork","milk"], ["potato"],false,"none"));

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
  params.TableName = "deardiary";
  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}
