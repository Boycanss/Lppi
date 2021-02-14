const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');
const cors = require('cors');
const { Router } = require('./routes/index');
let app = express();

class App extends Router {
  async init() {
    const connection = await mysql.createConnection({
      multipleStatements: true,
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'eventing'
    });
    connection.connect(function (err) {
      if (!err) {
        console.log("Database is connected ... ");
      } else {
        console.log("Error connecting database ... ");
      }
    });




    app.use(cors());
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/auth', super.authRoute());

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    // view engine setup
    app.set('db', connection);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');


  }
}

new App().init();

module.exports = app;
