var request = require('request');
var fs = require('fs');

var src = ['https://parsons.nyc/aa/m01.html',
           'https://parsons.nyc/aa/m02.html',
           'https://parsons.nyc/aa/m03.html',
           'https://parsons.nyc/aa/m04.html',
           'https://parsons.nyc/aa/m05.html',
           'https://parsons.nyc/aa/m06.html',
           'https://parsons.nyc/aa/m07.html',
           'https://parsons.nyc/aa/m08.html',
           'https://parsons.nyc/aa/m09.html',
           'https://parsons.nyc/aa/m10.html'];
var myPath = '/Users/zuic/Documents/azuic/data-structures/week1/loop';
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
