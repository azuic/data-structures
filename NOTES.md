### Week 1
08/27/2018

1. Syllabus
  * __Get the readings__
    * "Raw Data is an oxymoron"
    * "NoSQL and SQL Data Modeling"
2. TO DO
  - Assignments (Part 1 & 2)
  - Weekly Diary (≥ 3 times)


### Week 4
09/17/2018

1. Javascript data structures
2. Modules
  ```Javascript
  var myError = new Error("Don't use 99!");

  module.exports = {
    addTwo: function(input, callback){
      if (input == 99){
        callback(myError,null);
        //placeholder for the function
      } else {
        var result = input + 2;
        callback(null, result);
      }
    }
  }
  ```
3. `callback` functions


### Week 4
09/24/2018

1. 
