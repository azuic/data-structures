10/03/2018  
**file:** datamodel.png   
Sketch of the data model  
![](https://github.com/azuic/data-structures/blob/master/week6/datamodel.png)


09/26/2018  
**file:** geoCoordsExtraction.js, m03Geocodes.json, m03LatLon.json    
Request geocoding information of the addresses including lat & lon  
* Increased `setTimeout` from 2000 to 4000: 2000 only returned 73 results and 4000 returned the full list
* Stored the complete geocoding info from the request into m03Geocodes.json
* Stored the addresses and lat & lons as an array of objects and wrote into m03LatLon.json
