const cron = require("node-cron");
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql= require('mysql');
const http = require('http');
const https = require('https');
const fs = require('fs');

require('dotenv').config();


const index = require('./routes/index');
const top100 = require('./routes/top-100');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Certificate
const privateKey = fs.readFileSync('/home/jason/highscoreapi/ssl/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/home/jason/highscoreapi/ssl/cert.pem', 'utf8');
const ca = fs.readFileSync('/home/jason/highscoreapi/ssl/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Database connection
app.use(function(req, res, next){
  res.contentType('application/json');
  res.header("Access-Control-Allow-Origin", process.env.CORS_ALLOW_ORIGIN);
  res.header("Access-Control-Allow-Credentials", true);
  res.setHeader('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("CORS Origin set to " + process.env.CORS_ALLOW_ORIGIN + ".");
  global.connection = mysql.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_DATABASE,
      password : process.env.DB_PASSWORD
  });
  connection.connect();
  next();
});

// schedule tasks to be run on the server
cron.schedule("*/1 * * * *", function(req, res, next) {
  console.log("---------------------");
  console.log("Running Cron Job");
  global.connection = mysql.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      database : process.env.DB_DATABASE,
      password : process.env.DB_PASSWORD
  });
  connection.connect();
  connection.query('SELECT ' + process.env.SELECT_COLUMNS + ' from ' + process.env.TABLE_HIGH_SCORES + ' ORDER BY ' + process.env.TABLE_ORDER_DESC + ' DESC, ' + process.env.TABLE_ORDER_ASC + ' ASC LIMIT 100', function (error, results, fields) {
    if(error){
      const content = JSON.stringify({"status":5200, "error": error, "response": "Internal Server Error"});
    } else {
      const content = JSON.stringify({"status": 200, "error": error, "response": results});
      fs.writeFile('./data/top-100.json', content, 'utf8', function (error) {
        if (error) {
          return console.log(error);
        }
        console.log("The top-100.json file was saved to the data directory!");
      });
    }
  });
  connection.end();
  console.log("---------------------");
  console.log("Cron Run Successfully.");
});

app.all('/data',function(req, res){
  res.header("Access-Control-Allow-Origin", process.env.CORS_ALLOW_ORIGIN);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log("CORS Origin set to " + process.env.CORS_ALLOW_ORIGIN + ".");
});

app.use('/api/v1/data', express.static(path.join(__dirname, 'data'), {
  maxage: '15m',
  etag: true
}));
app.use('/api/v1/', index);
app.use('/api/v1/top-100', top100);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function startupProcess(arg) {
  global.connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    database : process.env.DB_DATABASE,
    password : process.env.DB_PASSWORD
  });
  connection.connect();
  connection.query('SELECT ' + process.env.SELECT_COLUMNS + ' from ' + process.env.TABLE_HIGH_SCORES + ' ORDER BY ' + process.env.TABLE_ORDER_DESC + ' DESC, ' + process.env.TABLE_ORDER_ASC + ' ASC LIMIT 100', function (error, results, fields) {
    if(error){
      const content = JSON.stringify({"status":5200, "error": error, "response": "Internal Server Error"});
    } else {
        console.log("---------------------------");
        console.log("Initiating App Startup Tasks...");
        console.log("---------------------------");
        const content = JSON.stringify({"status": 200, "error": error, "response": results});
        fs.writeFile('./data/top-100.json', content, 'utf8', function (error) {
        if (error) {
          return console.log(error);
        }
        console.log("Writing ./data/top-100.json file...");
        console.log("The top-100.json file was saved to the data directory!");
        console.log("---------------------------");
        console.log("App Startup Tasks Completed!");
        console.log("---------------------------");
    });
  }
  });
  connection.end();
}

setTimeout(startupProcess, 1500, 'funky');

module.exports = app;
const server = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
server.listen(4001);
httpsServer.listen(4443);
