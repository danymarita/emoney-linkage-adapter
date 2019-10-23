const winston = require('winston');
const express = require('express');
const config = require('config');
const app = express();
const bp = require('body-parser');
const basicAuth = require('./middlewares/basic_auth');
require('./startup/logging')();

app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
app.use(basicAuth);

process.on('uncaughtException', (ex) => {
    winston.error(ex.message, { error: ex });
});

var myReqLogger = function (req, res, next) {
    winston.info(JSON.stringify(req.body));
    next()
  }
  
app.use(myReqLogger);

require('./startup/routes')(app);

app.use(function(req, res, next){
  res.status(404);
  res.send({
      responseCode: 40,
      responseMessage: "Halaman tidak ditemukan."
  });
  return;
});

const port = config.get('port');
app.listen(port, () => winston.info(`Listening to port ${port}...`));