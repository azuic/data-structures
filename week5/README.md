09/24/2018
**file:** addressExtraction.js, m03.json   
Revision of address extraction
* Improved methods: more efficient
* Stored the result into an array of object and wrote into m03.json


09/26/2018
**file:** geoCoordsExtraction.js, m03Geocodes.json, m03LatLon.json  
Request geocoding information of the addresses including lat & lon
* Increased `setTimeout` from 2000 to 4000: 2000 only returned 73 results and 4000 returned the full list
* Stored the complete geocoding info from the request into m03Geocodes.json
* Stored the addresses and lat & lons as an array of objects and wrote into m03LatLon.json
