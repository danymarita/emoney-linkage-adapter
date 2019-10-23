const winston = require('winston');
const express = require('express');
const config = require('config');
const app = express();
const bp = require('body-parser');
const basicAuth = require('./middlewares/basic_auth');
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
app.use(basicAuth);
// require('dotenv').config();

var myReqLogger = function (req, res, next) {
    winston.info(JSON.stringify(req.body));
    next()
  }
  
app.use(myReqLogger)

require('./startup/routes')(app);
require('./startup/logging')();

const port = config.get('port');
app.listen(port, () => winston.info(`Listening to port ${port}...`));