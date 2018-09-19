// require modules
var fs = require('fs');
var cheerio = require('cheerio');

// read zone 3 file
var content = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week1/aa-meeting-list/m03.txt');

// load to an object
var $ = cheerio.load(content);
// $ for selecting variables

// create an array to store all the addresses
var m03=[];

// [] can take in any attr filter
// must include everything inside ''
$('td[style="border-bottom\\:1px solid #e3e3e3; width\\:260px"]').each(
  function(i,elem){
    m03[i] = $(this).html(); // extract addresses into a text file
    m03[i] = m03[i].replace(/<br>/g,''); // remove <br>
    m03[i] = m03[i].replace(/^\s*$[\n\r]{1,}/gm, ''); // remove empty lines
    m03[i] = m03[i].split('<div')[0]; // remove characters after <div ...
    m03[i] = m03[i].split('<span')[0]; // remove characters after <span ...
    m03[i] = m03[i].split('</b>')[1]; // remove characters before ...</b>
    m03[i] = m03[i].trim(); // remove white space
    m03[i] = m03[i].replace(/(\r\n|\n|\r)/gm,''); // remove line breaks
    m03[i] = m03[i].replace(/\s+/g,' '); // remove extra spaces
  }
);

fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week2/m03Addresses.txt', m03); // save as a text file
console.log(m03); // print the addresses
