var fs = require('fs');
var cheerio = require('cheerio');

// read zone 3 file
var content = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week13/options.txt');

// load to an object
var $ = cheerio.load(content);
// $ for selecting variables

// create an array to store all the addresses
var day=[];
var time=[];
var type=[];
var spin=[];

var days = $('select[id="day"]').html().split("<option>");
days.shift();
day = days.map(element => element.substring(0,element.indexOf('<')));

var times = $('select[id="StartTime"]').html().split("</option>");
times.shift();
time = times.map(element => element.slice(-8));
time.pop();

var types = $('select[id="meetingtype"]').html().split("<option>");
types.shift();
type = types.map(element => element.substring(0,element.indexOf(' ')));


var sp = $('select[id="SpecialInterest"]').html().split("<option>");
sp.shift();
spin = sp.map(element => element.substring(0,element.indexOf('<')));


var options = {day,time,type,spin};
options = JSON.stringify(options);
fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week13/options.json',options);
