// require modules
var fs = require('fs');
var cheerio = require('cheerio');

// read zone 3 file
var content = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week1/aa-meeting-list/m03.txt');

// load to an object
var $ = cheerio.load(content);
// $ for selecting variables
