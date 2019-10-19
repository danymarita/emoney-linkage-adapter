const winston = require('winston');
const express = require('express');
const basicAuth = require('express-basic-auth');
// const config = require('config');
const app = express();
const bp = require('body-parser');
app.use(bp.urlencoded({extended: false}));
app.use(bp.json());
require('dotenv').config();

app.use(basicAuth({
    users: { 'admin': 'supersecret' },
    unauthorizedResponse: (req, res) => {
        if(req.auth){
            return {
                responseCode: 40,
                responseMessage: 'Credentials rejected'
            };
        }else{
            return {
                responseCode: 41,
                responseMessage: 'No credentials provided'
            };
        }
    }
}))

var myReqLogger = function (req, res, next) {
    winston.info(JSON.stringify(req.body));
    next()
  }
  
app.use(myReqLogger)

require('./startup/routes')(app);
require('./startup/logging')();

// const port = config.get('port');
const port = process.env.LINKAGE_PORT;
app.listen(port, () => winston.info(`Listening to port ${port}...`));