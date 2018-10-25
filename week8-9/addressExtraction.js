// Revision of assignment 2

// require modules
var fs = require('fs');
var cheerio = require('cheerio');

// read zone 3 file
var content = fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week1_3/aa-meeting-list/m03.txt');

// load to an object
var $ = cheerio.load(content);
// $ for selecting variables

// create an array to store all the addresses
var m03data =   fs.readFileSync('/Users/zuic/Documents/azuic/data-structures/week5/m03LatLon.json');
var m03 = JSON.parse(m03data);

// location
$('h4[style="margin:0;padding:0;"]').each(
  function(i,elem){

    var location = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,' ').replace('&apos;','\'').trim();
    // remove empty lines and extra spaces and reformat hypostrophy

    m03[i].location=location;
    // add each loaction as a json object to the array
  }
);

// meeting group
$('td[style="border-bottom\\:1px solid #e3e3e3; width\\:260px"]').each(
  function(i,elem){
    var group= $(elem).find('b').text().trim().split(" -")[0].replace(/\s\s/g,'').replace(/-/g,' ').trim();
    // remove empty lines and extra spaces
    m03[i].group=group;
    // add each meeting group as a json object to the array
  }
);

// wheelchair
$('td[style="border-bottom\\:1px solid #e3e3e3; width\\:260px"]').each(
  function(i,elem){
    var wheelchairAccess = $(this).find('span').html(); // find span element
    if (wheelchairAccess == null) {
      m03[i].wheelchair = false;
    } else {
      m03[i].wheelchair = true;
    }
    // add each wheelchair access as a json object to the array
  }
);

// day
$('td[style="border-bottom\\:1px solid #e3e3e3;width\\:350px;"]').each(
  function(i,elem){
    var sections = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,'').split('<br><br>');
    // remove empty lines and extra spaces and split each day
    // console.log(sections);
    var day=[];
    for (var j=0; j<sections.length; j++){
      var sec = sections[j].split('<b>')[1];
      if (sec != undefined){
        day.push(sec.substring(0, sec.indexOf('sFrom')));
        // console.log(sec);
      }
    }
    //
    //add each day as a json object to the array
    // console.log(m03[i]);
    m03[i].day = day;
  }
);

// schedule
$('td[style="border-bottom\\:1px solid #e3e3e3;width\\:350px;"]').each(
  function(i,elem){
    var sections = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,' ').split('<br> <br>');
    // remove empty lines and extra spaces and split each day
    // console.log(sections);
    var start=[];
    var end=[];
    for (var j=0; j<sections.length; j++){

      var st = sections[j].split('</b>')[1];
      var et = sections[j].split('</b>')[2];
      if (st != undefined && et != undefined){
        start.push(st.substring(1, st.indexOf(' <')));
        end.push(et.substring(1, et.indexOf(' <')))
        // console.log(sec);
      }
      // type.push(sections[i].split('<b>')[2].substring(13,indexOf(' =')));
      // spinterest.push(sections[i].split('<b>')[3].substring(17)));
    }
    // console.log(start);
    // console.log(end);
    // add each time schedule as a json object to the array
    m03[i].start = start;
    m03[i].end = end;
  }
);

// type $ special interest
$('td[style="border-bottom\\:1px solid #e3e3e3;width\\:350px;"]').each(
  function(i,elem){
    var sections = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,' ').split('<br> <br>');
    // remove empty lines and extra spaces and split each day
    var type=[];
    var spinterest=[];
    for (var j=0; j<sections.length-1; j++){
      var sec = sections[j].split('<br><b>');
      sec.shift(); // remove the first element in sections (day and time)
      sec = sec.join('').trim(); // concat the elements into a string
      var tpStr = "Meeting Type</b> ";
      var spStr = "Special Interest</b> ";
      var tp;
      var sp;
      if (sec.includes(tpStr)) {
        tp = sec.substring(sec.indexOf(tpStr)+tpStr.length,sec.indexOf(' ='));
      }
      type.push(tp);
      if (sec.includes(spStr)) {
        sp = sec.substring(sec.indexOf(spStr)+spStr.length);
      }
      spinterest.push(sp);

    }
    // console.log(type);
    // console.log(spinterest);
    // add each type and special interest as a json object to the array
    m03[i].type = type;
    m03[i].spinterest = spinterest;
  }
);

for (var i=0; i<m03.length; i++){
  m03[i].zone = 3;
}

fs.writeFileSync('/Users/zuic/Documents/azuic/data-structures/week8-9/m03update.json', JSON.stringify(m03));
// save json file
