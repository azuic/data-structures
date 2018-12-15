var express = require('express'), // npm install express
    app = express();
const { Pool } = require('pg');
var AWS = require('aws-sdk');

// AWS RDS credentials
var db_credentials = new Object();
db_credentials.user = 'zuic';
db_credentials.host = 'dsdbinstance.ckrsutvzcxxy.us-east-1.rds.amazonaws.com';
db_credentials.database = 'ds';
db_credentials.password = process.env.AWSRDS_PW;
db_credentials.port = 5432;

// AWS DynamoDB credentials
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-1";

app.get('/style.css', function(req, res){
  res.sendFile('/public/style.css');
});
app.get('/dat.gui.css', function(req, res){
  res.sendFile('/public/dat.gui.css');
});
app.get('/dat.gui.js', function(req, res){
  res.sendFile('/public/dat.gui.js');
});
app.get('/index', function(req, res){
  res.sendFile('/public/index.html');
});

// respond to requests for /sensor
app.get('/ss', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(HOUR FROM sensortime) as sensorhour, sensorvalue, COUNT(*)
             FROM sensorData
             GROUP BY sensorhour,sensorvalue
             ORDER BY sensorhour;`;

    client.connect();
    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.send(qres.rows);
            client.end();
            console.log('1) responded to request for sensor data');
        }
    });
});

var ss1 = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Infrared Sensor at Mirror</title>
    <meta name="author" content="Zui Chen">
    <link rel="stylesheet" href="/style.css">
    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
  </head>
  <body>
    <script type="text/javascript">
      var data =`;

var ss2 = `;

var look = new Array(24);
var nolook = new Array(24);
var noWifi = new Array(24);

for (var i=0; i<data.length; i++){
  var hour = data[i].sensorhour;
  var value = data[i].sensorvalue;
  var count = data[i].num_obs;
  if (value==true){
    look[hour] = parseInt(count);
  } else if (value==false){
    nolook[hour] = parseInt(count);
  } else {
    noWifi[hour] = parseInt(count);
  }
}
console.log(look);
console.log(nolook);
console.log(noWifi);
var hours = [];
for (var i = 0; i<24; i++) {
  if (look[i]==null){look[i]=0}
  var total = look[i]+nolook[i]+noWifi[i];
  p1 = look[i]/total;
  p2 = nolook[i]/total;
  p3 = noWifi[i]/total;
  hours.push({
    "hour": i,
    "Look at Mirror": look[i]/total,
    "No look at Mirror": nolook[i]/total,
    "WiFi Outage": noWifi[i]/total,
  });

}


  var margin = {top: 20, right: 160, bottom: 35, left: 30};

  var width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Transpose the data into layers
  var dataset = d3.layout.stack()(["No look at Mirror", "WiFi Outage","Look at Mirror"].map(function(input) {
    return hours.map(function(d) {
      return {x: d.hour, y: +d[input]};
    });
  }));


  // Set x, y and colors
  var x = d3.scale.ordinal()
    .domain(dataset[0].map(function(d) { return d.x; }))
    .rangeRoundBands([10, width-10], 0.02);

  var y = d3.scale.linear()
    .domain([0, d3.max(dataset, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
    .range([height, 0]);

  var colors = ["223", "#FFFFFB", "#F75C2F"];


  // Define and draw axes
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(5)
    .tickSize(-width, 0, 0)
    .tickFormat( function(d) { return d } );

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    // .tickFormat(d3.time.format("%Y"));

  // svg.append("g")
  //   .attr("class", "y axis")
  //   .call(yAxis)
  //   .style('fill', '#FFFFFB');

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .style('fill', '#FFFFFB');


  // Create groups for each series, rects for each segment
  var groups = svg.selectAll("g.cost")
    .data(dataset)
    .enter().append("g")
    .attr("class", "cost")
    .style("fill", function(d, i) { return colors[i]; });

  var rect = groups.selectAll("rect")
    .data(function(d) { return d; })
    .enter()
    .append("rect")
    .attr("x", function(d) { return x(d.x); })
    .attr("y", function(d) { return y(d.y0 + d.y); })
    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
    .attr("width", x.rangeBand())
    .on("mouseover", function() { tooltip.style("display", null); })
    .on("mouseout", function() { tooltip.style("display", "none"); })
    .on("mousemove", function(d) {
      var xPosition = d3.mouse(this)[0] - 15;
      var yPosition = d3.mouse(this)[1] - 25;
      tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
      tooltip.select("text").text(d.y.toFixed(2));
    });


  // Draw legend
  var legend = svg.selectAll(".legend")
    .data(colors)
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });

  legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", function(d, i) {return colors.slice().reverse()[i];});

  legend.append("text")
    .attr("x", width + 5)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "start")
    .text(function(d, i) {
      switch (i) {
        case 0: return "Look at Mirror";
        case 1: return "No look at Mirror";
        case 2: return "WiFi Outage";
      }
    })
    .style('fill', '#FFFFFB');
// ["Look at Mirror", "No look at Mirror", "WiFi Outage"]

  // Prep the tooltip bits, initial display is hidden
  var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");

  tooltip.append("rect")
    .attr("width", 30)
    .attr("height", 20)
    .attr("fill", "white")
    .style("opacity", 0.5);

  tooltip.append("text")
    .attr("x", 15)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
    .attr("font-weight", "bold");

</script>>
</body>
</html>
`;

app.get('/sensor', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var q = `SELECT EXTRACT(HOUR FROM sensortime) as sensorhour, sensorvalue, COUNT(*)
             FROM sensorData
             GROUP BY sensorhour,sensorvalue
             ORDER BY sensorhour;`;

    client.query(q, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            var resp = ss1 + JSON.stringify(qres.rows) + ss2;
            res.send(resp);
            client.end();
            console.log('1.1) responded to request for sensor graph');
        }
    });
});

// respond to requests for /aameetings
app.get('/aa', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var thisQuery = `SELECT mtspin,  json_agg(json_build_object('day', mtday, 'time', mtstart)) as schedule, json_agg(json_build_object('lat',lat, 'long',long, 'address', address)) as location,  COUNT(DISTINCT address) as num_obs
                 FROM aameetings
                 WHERE mtspin!='null' AND (mtday='Saturday' OR mtday='Sunday')
                 GROUP BY mtspin
                 ;`;

    client.connect();
    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }
        else {
            res.send(qres.rows);
            client.end();
            console.log('2) responded to request for aa meeting data');
        }
    });
});

var aa1= `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Weekend AA Meetings</title>
    <meta name="description" content="Meetings of AA in Manhattan on Weekends by Special Interests">
    <meta name="author" content="Zui Chen">
    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
  integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
  crossorigin=""/>
  <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js"
  integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA=="
  crossorigin=""></script>
    <script type="text/javascript" src="/dat.gui.js"></script>
  </head>
  <body>
    <div id="mapid">
      <script type="text/javascript">
        var data =`;

var aa2 = `;

var mymap = L.map('mapid').setView([40.734636,-73.994997], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    minZoom: 11,
    maxZoom: 20,
    id: 'mapbox.light',
    // accessToken: 'your.mapbox.access.token'
    accessToken: 'pk.eyJ1IjoiZHZpYTIwMTciLCJhIjoiY2o5NmsxNXIxMDU3eTMxbnN4bW03M3RsZyJ9.VN5cq0zpf-oep1n1OjRSEA'
  }).addTo(mymap);

  var circles = [];
  for (var i=0; i<data.length; i++) {
        for (var j=0; j<data[i].location.length; j++){
          // removeAllCircles();
          if (data[i].schedule[j].day == "Sunday"){
            var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].long], {
                color: '#0B346E',      // #FFC408
                radius: 5
            });
          } else {
            var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].long], {
                color: '#FFC408',
                radius: 5
            });
          }
          circle.bindPopup("<dl><dt>Schedule</dt>"+"<dd>"+data[i].schedule[j].day+"\n"+data[i].schedule[j].time+"</dd>"+"<dt>Location</dt>"+"<dd>"+data[i].location[j].address+"</dd></dl>");
          circle.addTo(mymap);
          circles.push(circle);
        }

  }

  var meeting = {
    "Show All": true,
    "Special Interest": "Pick One"
  };

  var gui = new dat.gui.GUI();
  gui.add(meeting, 'Show All').onChange(function(check){
    if (check){
      removeAllCircles();
      for (var i=0; i<data.length; i++) {
            for (var j=0; j<data[i].location.length; j++){
              // removeAllCircles();
              if (data[i].schedule[j].day == "Sunday"){
                var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].long], {
                    color: '#0B346E',      // #FFC408
                    radius: 5
                });
              } else {
                var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].long], {
                    color: '#FFC408',
                    radius: 5
                });
              }
              circle.bindPopup(data[i].schedule[j].day+ ' '+data[i].schedule[j].time+'\n @ '+data[i].location[j].address)
              circle.addTo(mymap);
              circles.push(circle);
            }
      }
    } else {
      removeAllCircles();
    }
  });

  gui.add(meeting, 'Special Interest', ["Agnostic","As Bill Sees It","Beginners Workshop","Big Book Workshop","Children Welcome","Eleventh Step","Eleventh Step Meditation","First Step Workshop","Fourth Step Workshop","Gay, Lesbian and Bisexual","Gay Men","Interpreted for the Deaf","Lesbian","Living Sober","Meditation","Men","Promises","Special Purpose Groups","Sponsorship Workshop","Steps 1-2-3","Topic","Twelve Steps","Women","Young People"]).onChange(function(spinterest){
    removeAllCircles();
    for (var i=0; i<data.length; i++) {
        if (data[i].mtspin == spinterest){
          for (var j=0; j<data[i].location.length; j++){
            if (data[i].schedule[j].day == "Sunday"){
              var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].long], {
                  color: '#0B346E',      // #FFC408
                  radius: 5
              });
            } else {
              var circle = L.circleMarker([data[i].location[j].lat, data[i].location[j].long], {
                  color: '#FFC408',
                  radius: 5
              });
            }
            circle.bindPopup(data[i].schedule[j].day+' '+data[i].schedule[j].time+'\n @ '+data[i].location[j].address)
            circle.addTo(mymap);
            circles.push(circle);
          }

        }
    }
  });


function removeAllCircles(){
    // remove each circle from the map and empty our array of references
    circles.forEach(function(circle, i){
        mymap.removeLayer(circle);
    })
    circles = [];
}

</script>>
</div>
</body>
</html>`;

// respond to requests for /aameetings
app.get('/aameetings', function(req, res) {

    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);

    // SQL query
    var thisQuery = `SELECT mtspin,  json_agg(json_build_object('day', mtday, 'time', mtstart)) as schedule, json_agg(json_build_object('lat',lat, 'long',long, 'address', address)) as location,  COUNT(DISTINCT address) as num_obs
                 FROM aameetings
                 WHERE mtspin!='null' AND (mtday='Saturday' OR mtday='Sunday')
                 GROUP BY mtspin
                 ;`;


    client.query(thisQuery, (qerr, qres) => {
        if (qerr) { throw qerr }

        else {
            var resp = aa1 + JSON.stringify(qres.rows) + aa2;
            res.send(resp);
            client.end();
            console.log('2.2) responded to request for aa meeting data');
        }
    });
});

// respond to requests for /deardiary
app.get('/dd', function(req, res) {

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    var params = {
        TableName: "deardiary",
        KeyConditionExpression: "#ae = :aerobicType", // the query expression
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#ae" : "aerobic"
        },
        ExpressionAttributeValues: { // the query values
            ":aerobicType": {S: "none"}
            // ":minDate": new Date("2018-11-01").getTime(),
            // ":maxDate": new Date("2018-11-24").getTime()
        }
    };

    dynamodb.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        }
        else {
            res.send(data.Items);
            console.log('3) responded to request for dear diary data');
        }
    });

});

var dd1 = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Dear Diary</title>
    <meta name="description" content="Tracking of daily food intake and work out">
    <meta name="author" content="Zui Chen">
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <div id="diary">
      <br>
      <h1><a class="aerobic" href="deardiary.html"> Dear Diary</a></h1>
      <h2>
        What I eat on <a class="aerobic" href="core.html">core</a>/<a class="aerobic" href="upperbody.html">upper body</a>/<a class="aerobic" href="lowerbody.html">lower body</a> days
      </h2>
      <h2>Here is what I eat in no-workout</h2>
      <div class="container" id="container">

      </div>

    </div>
    <script type="text/javascript">
      var data =`;

var dd2 = `;

var container = document.getElementById("container");
for (var i=0; i<data.length; i++){
  var item = document.createElement("div");
  item.setAttribute("class","timeline-item");
  item.setAttribute("date-is",data[i].dt.S);
  var cardio = data[i].cardio.BOOL;
  if (cardio) {
    var cardiotext = "Did cardio! \n";
  } else {
    var cardiotext = "No exercise at all! \n"
  }
  var veg=0, pro=0, carbs=0;
  var vegtext, protext, carbtext;

  if (data[i].veggies != undefined)
    {veg = data[i].veggies.SS.length;}
  vegtext = veg+" kinds of vegetables; \n";
  if (data[i].protein != undefined)
    {pro = data[i].protein.SS.length;}
  protext = pro+" kinds of protein; \n";
  if (data[i].carbs != undefined)
    {carbs = data[i].carbs.SS.length;}
  carbtext = carbs+" kinds of carbs. \n";

  var entry = document.createElement("p");
  // var entrytext = document.createTextNode(cardiotext);
  var entrytext = document.createTextNode(cardiotext+vegtext+protext+carbtext);
  entry.appendChild(entrytext);
  item.appendChild(entry);
  container.append(item);
}
</script>>
</body>
</html>
`;

// respond to requests for /deardiary
app.get('/deardiary', function(req, res) {

    // Connect to the AWS DynamoDB database
    var dynamodb = new AWS.DynamoDB();

    // DynamoDB (NoSQL) query
    var params = {
        TableName: "deardiary",
        KeyConditionExpression: "#ae = :aerobicType", // the query expression
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#ae" : "aerobic"
        },
        ExpressionAttributeValues: { // the query values
            ":aerobicType": {S: "none"}
            // ":minDate": new Date("2018-11-01").getTime(),
            // ":maxDate": new Date("2018-11-24").getTime()
        }
    };

    dynamodb.query(params, (qerr, qres) => {
        if (qerr) { throw qerr }

        else {
            var resp = dd1 + JSON.stringify(qres.rows) + dd2;
            res.send(resp);
            console.log('3.3) responded to request for aa meeting data');
        }
    });

});

// serve static files in /public
app.use(express.static('public'));

// listen on port 8000
app.listen(8000, function() {
    console.log('Server listening...');
});
