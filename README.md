# High Score API - The Open Source High Score API
This repository contains a high score API written in Node.js that connects to a MySQL database as the datasource.

## High Score API Requirements
  - Node.js
  - MySQL

## How Does High Score API Work?
A MySQL query is used to write high score table rows data to a JSON file or JSON object using the [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) function. The results of the query are displayed at a configurable route on a Node.js Express server in a JSON encoding to be ingested easily by other web based applications.

## Install High Score API
1. Clone the repository.

        git clone https://github.com/sk33lz/highscoreapi.git

2. Install the High Score API by running the following command in the root of the cloned repository.

        npm install

## Configure a .env File with Environment Variables for 
A .env file is used to simplify configuration management of the High Score API application, and keep sensitive data like the Database password out of the git repository. It has been added to the .gitignore file by default. The .env should contain the following **REQUIRED** variables.

    DB_HOST
    DB_USER
    DB_DATABASE
    DB_PASSWORD
    SSL_CA
    SSL_CERTIFICATE
    SSL_PRIVATEKEY
    CORS_ALLOW_ORIGIN
    TABLE_HIGH_SCORES
    TABLE_ORDER_DESC
    TABLE_ORDER_ASC
    TABLE_SELECT_COLUMNS

### DB_HOST
Configure the hostname to use for the MySQL database connection.

    DB_HOST='localhost'

### DB_USER
Configure the username to use for the MySQL database connection.

    DB_USER='highscoresapi'

### DB_DATABASE
Configure the database to use for the MySQL connection.

    DB_DATABASE='highscoreapi'

### DB_PASSWORD
Configure the database password to use for the MySQL connection.

    DB_PASSWORD='secret'

### SSL_CA
Configure the SSL Certificate Authority certificate path for the HighScoreAPI app. Example for `www.domain.tld` using LetsEncrypt SSL.

    SSL_CA='/etc/letsencrypt/live/www.domain.tld/chain.pem'

### SSL_CERTIFICATE
Configure the SSL Certificate path for the HighScoreAPI app. Example for `www.domain.tld` using LetsEncrypt SSL.

    SSL_CERTIFICATE='/etc/letsencrypt/live/www.domain.tld/fullchain.pem'

### SSL_PRIVKEY
Configure the SSL Private Key path for the HighScoreAPI app. Example for `www.domain.tld` using LetsEncrypt SSL.

    SSL_PRIVKEY='/etc/letsencrypt/live/www.domain.tld/privkey.pem'

### CORS_ALLOW_ORIGIN
Configure the Access-Control-Allow-Origin Header URL. The example below sets the Origin used for a typical localhost Node.JS server and port.

    CORS_ALLOW_ORIGIN="http://localhost:4000"

### TABLE_HIGH_SCORES
Configure the MySQL database table that is storing the High Score data.

    TABLE_HIGH_SCORES='high_scores'

### TABLE_ORDER_DESC
Configure the MySQL table that orders the high score results in descending order to sort the scores by top High Score by default.

    TABLE_ORDER_DESC='high_score'

### TABLE_ORDER_ASC
Configure the MySQL table that orders the high score results in ascending order to sort the scores by another value by such as username or user id.

    TABLE_ORDER_ASC='username'

### SELECT_COLUMNS
Configure the columns that your database will select to render in the JSON object that is displayed in the table using the [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) function.

    SELECT_COLUMNS='highscore,username,timeplayed'

## Connect High Score API to a Database
The database connection settings are stored as environment variables in a .env file for easy setup of local, dev, staging, and production enviroments for the API.

Currently the API is only written to handle MySQL database connections, but other databases may be supported in future versions.

### Connect High Score API to a MySQL Database
The default MySQL database connection environment variables are defined below. Set these variables in a .env file to connect to a MySQL database with the High Score API.

#### Example:

    DB_HOST='localhost'
    DB_USER='high_scores'
    DB_DATABASE='high_scores'
    DB_PASSWORD='secret'
    TABLE_HIGH_SCORES='high_scores'
    TABLE_ORDER_DESC='high_score'
    TABLE_ORDER_ASC='username'
    SELECT_COLUMNS='highscore,username,timeplayed'
    CORS_ALLOW_ORIGIN='http://localhost:4000'
    SSL_CA='/etc/letsencrypt/live/www.domain.tld/chain.pem'
    SSL_CERTIFICATE='/etc/letsencrypt/live/www.domain.tld/fullchain.pem'
    SSL_PRIVKEY='/etc/letsencrypt/live/www.domain.tld/privkey.pem'

Developers can modify the following variable names or replace the following variables with actual values if desired in the [app.js](https://github.com/sk33lz/highscoreapi/blob/master/app.js).

    process.env.DB_HOST
    process.env.DB_USER
    process.env.DB_DATABASE
    process.env.DB_PASSWORD
    process.env.TABLE_HIGH_SCORES
    process.env.TABLE_ORDER_DESC
    process.env.TABLE_ORDER_ASC
    process.env.SELECT_COLUMNS
    process.env.CORS_ALLOW_ORIGIN
    process.env.SSL_CA
    process.env.SSL_CERTIFICATE
    process.env.SSL_PRIVKEY


A database export with sample high score data will soon be provided for getting started with the High Score API.

## High Score API Development Roadmap
Below is a tentatively planned development roadmap for the High Score API.

1. Add support for additional database software.
    - Add Postgres database support.
    - Add MongoDB database support.
    - Add SQLite database support.
    - Possibly support other databases.

2. Add integration badges.
    - Security: https://snyk.io/
    - CI Builds: https://travis-ci.org/
    - Code Coverage: https://coveralls.io/ or https://codecov.io/
    - JavaScript Linting: https://github.com/dwyl/goodparts

3. Standalone API Front-end
    - Build a standalone route to display the high score data without any other integration needed.

## Contribute to the High Score API
Contribute to the High Score API by cloning the repository, creating a branch, and making some changes. Then [Submit a Pull Request](https://github.com/sk33lz/highscoreapi/pulls) comparing your branch's changes against the High Score API's master branch.

## High Score API Issues
Search on the Issues page to see if someone else has encountered the same issue. [Submit a New Issue](https://github.com/sk33lz/highscoreapi/issues/new) for bugs, feature requests, and support requests that are not already in the issues list.

## High Score API Credits

### Developer(s)
  - Jason Moore ([sk33lz](https://github.com/sk33lz))
