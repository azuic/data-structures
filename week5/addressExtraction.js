// Revision of assignment 2

// require modules
var fs = require('fs');
var cheerio = require('cheerio');

// read zone 3 file
var content = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week1_3/aa-meeting-list/m05.txt');

// load to an object
var $ = cheerio.load(content);
// $ for selecting variables

// create an array to store all the addresses
var m05=[];

// [] can take in any attr filter
// must include everything inside ''
$('td[style="border-bottom\\:1px solid #e3e3e3; width\\:260px"]').each(
  function(i,elem){
    $(this).find('h4,b,br,div,span,img').remove();
    // remove redundant html elements

    var address = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,' ').trim();
    // remove empty lines and extra spaces

    m05.push({'address':address});
    // add each address as a json object to the array
  }
);


fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week8-9/m05.json', JSON.stringify(m05));
// save json file
