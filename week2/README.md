09/19/2018  
**file:** parseZone3.js   
Finished extracting the addresses from m03.txt
* Parsed out using text file (strings)
* Possibly using objects?
* Can use `split` on `<br>` and choose the third element to avoid some of the `replace` functions
* `$('td[style=...] td:first-of-type')` here `td:first-of-type` selects the first `td`
* `$(elem).find('h4,b,...').remove()` to remove elements
* Can assign each address (say `var address`) to an json object `{'location':address}` and push to the array
