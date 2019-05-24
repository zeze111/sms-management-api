# sms-management-api
[![Build Status](https://travis-ci.org/zeze111/sms-management-api.svg?branch=develop)](https://travis-ci.org/zeze111/sms-management-api)

SMS management application API

Documentation:
The API documentation for this app can be found here [SMS Application Documentation](https://documenter.getpostman.com/view/7088422/S1TR4erm?version=latest)

Setup:
* Install Node js and Postgres on your machine
* run `git clone https://github.com/zeze111/sms-management-api.git` in your terminal
* cd into the project root directory
* run `npm install` to install all dependencies
* create a `.env` and provide values for `DB_USER` and `DB_PASSWORD`
* run `createdb sms-management` to create the database
* Migrate your database using `sequelize db:migrate` on the command line
* You can undo migrations by running `sequelize db:migrate:undo:all` on the command line
* run `npm start` to start the server
* test on postman using `http://localhost:8000/`

Testing:
* run `createdb smsmanagementtest` to create the test database
* run `npm test`
