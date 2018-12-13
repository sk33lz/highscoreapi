# The Open Source High Score API
This repository contains a high score API written in Node.js that connects to a MySQL database as the datasource.

## Requirements
  - Node.js
  - MySQL

## How Does High Score API Work?
A MySQL query is used to write high score table rows data to a JSON file or JSON object using the [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) function. The results of the query are displayed at a configurable route on a Node.js Express server in a JSON encoding to be injested easily by other web based applications.

## Install High Score API
1. Clone the repository.

        git clone https://github.com/sk33lz/highscoreapi.git

2. Install the High Score API by running the following command in the root of the cloned repository.

        npm install

## Connect to a Database
The database connection settings are stored as environment variables in a .env file for easy setup of local, dev, staging, and production enviroments for the API.

Currently the API is only written to handle MySQL database connections, but other databases may be supported in future versions.

### Connect to a MySQL Database
The default MySQL database connection environment variables are defined below. Set these in a .env file to connect to a MySQL database with the High Score API.

Developers can modify these values in the [app.js](https://github.com/sk33lz/highscoreapi/blob/master/app.js) file where `process.env.` has been appended to each of the following environment variables.

    DB_HOST
    DB_USER
    DB_DATABASE
    DB_PASSWORD

A sample database will be provided for getting started with the API soon.

## Development Roadmap
Below is a tentatively planned development roadmap for the High Score API.

1. Add support for additional database software.

    - Add Postgres database support.
    - Add MongoDB database support.
    - Add SQLite database support.
    - Possibly support other databases.
2. Standalone API Front-end

    - Build a standalone route to display the high score data without any other integration needed.

## Contribute
Contribute to the High Score API by cloning the repository and submitting a pull request.

## Issues
Search on the Issues page to see if someone else has encountered the same issue. Submit an issue for bugs, feature requests, and support requests that are not already in the issues list.

## Credits

### Developer(s)
  - Jason Moore ([sk33lz](https://github.com/sk33lz))
