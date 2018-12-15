var request = require('request');
var fs = require('fs');

var url = 'https://parsons.nyc/aa/m';
var src =[];
for (var i=0; i<10; i++){
  var k = i+1;
  if (i<9){
    src[i] = url+'0'+k+'.html';
  } else {
    src[i] = url+k+'.html';
  }
};

var myPath = '/Users/zuic/Documents/azuic/data-structures/week1_3/loop';
process.chdir(myPath);
// save requested files to the folder under myPath

for (let i=0; i<src.length; i++){
  // let makes i accessible within the nested functions!!
  request(src[i],
      function(error, response, body){
        if (!error && response.statusCode == 200){
          fs.writeFileSync(src[i].slice(-8,-4)+'txt',body)
        }
        else {console.log("Request failed!")}
      }
  )
};
