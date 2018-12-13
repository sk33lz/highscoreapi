var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', function(req, res, next) {
  connection.query('SELECT * from stats ORDER BY high_score DESC, userId ASC LIMIT 100', function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": "Internal Server Error"})); 
    } else {
      res.send(JSON.stringify({"status": 200, "error": error, "response": results}));
      const content = JSON.stringify({"status": 200, "error": error, "response": results});
      fs.writeFile('./data/top-100.json', content, 'utf8', function (error) {
        if (error) {
          return console.log(error);
        }
        console.log("The top-100.json file was saved to the data directory!");
      });
    }
  });
});

module.exports = router;