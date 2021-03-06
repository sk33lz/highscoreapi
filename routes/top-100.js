var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', function(req, res, next) {
  connection.query('SELECT ' + process.env.SELECT_COLUMNS + ' from ' + process.env.TABLE_HIGH_SCORES + ' ORDER BY ' + process.env.TABLE_ORDER_DESC + ' DESC, ' + process.env.TABLE_ORDER_ASC + ' ASC LIMIT 100', function (error, results, fields) {
    if(error){
      res.send(JSON.stringify({"status": 500, "error": error, "response": "Internal Server Error"})); 
    } else {
      res.send(JSON.stringify({"status": 200, "error": error, "response": results}));
    }
  });
  connection.end();
});

module.exports = router;
