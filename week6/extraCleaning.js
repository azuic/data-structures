// require modules
var fs = require('fs');
var cheerio = require('cheerio');

// read zone 3 file
var content = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week6/special_interest.txt');

// load to an object
var $ = cheerio.load(content);
// $ for selecting variables

// create an array to store all the addresses
var spInterest=[];

// [] can take in any attr filter
// must include everything inside ''
$.each(
  function(i,elem){

    var interest = $(this).html().replace(/<\/option>/g,'').replace(/^\s*$[\n\r]{1,}/gm, '').split('<option>')[i];

    m03.push({'interest_id':i, 'interest':interest});
    // add each address as a json object to the array
  }
);


fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week6/spinterest.json', JSON.stringify(m03));
// save json file
