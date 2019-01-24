**URL:** [52.15.130.27:8080](52.15.130.27:8080) (valid till 12/31/2018)

**Files:** server.js
1. `/index` index page
2. AA Meetings
  * `/aa`: data from query (Weekend meetings by special interests) (insert into Postgresql)
  * `/aameetings`: visualization
  * Initial data model:
  ![](https://github.com/azuic/data-structures/blob/master/week6/datamodel.png)
  * End up with one table includes all the information

3. Dear Diary
  * `/dd`: data from query (insert into DynamoDB)
  * `/deardiary`: visualization
  * Initial model and table design:
  ![](https://github.com/azuic/data-structures/blob/master/week7/mydiary-datamodel.png)
  ![](https://github.com/azuic/data-structures/blob/master/week7/dear-diary.png)
  * End up using aerobic type as primary key and sort by dates

4. Sensor
  * `/ss`: data from query
  * `/sensor`: visualization
  * Infrared Sensor Response
  * Stacked bar charts showing the "Percentage" of **Me Looking at the Mirror or WiFi Outage in My Room **

**Notes**
1. tasks on port 8000: `lsof -t -i :8000`
2. kill the process by pid: `kill -15 <PID>`
