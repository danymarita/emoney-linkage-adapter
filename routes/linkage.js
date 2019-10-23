const express = require('express');
const {validateRegisterToken, validateUnregisterToken, validateRemoveLinkage} = require('../startup/validation');
const router = express.Router();
const grpc_client = require('../grpc-clients/linkage');
const winston = require('winston');
const config = require('config');

router.get('/register-token', (req, res, next) => {
    const { error } = validateRegisterToken(req.body); 
    if (error) return res.status(400).send({
        responseCode: 42,
        responseMessage: error.details[0].message
    });

    const timeObject = new Date();
    const date = new Date(timeObject.getTime() + parseInt(config.get('exp'))).getTime();
    const payload = {
        "clientId": req.body.clientId,
        "subject": req.body.subject,
        "token": req.body.token,
        "expiredAt": date
    }
    grpc_client.client.RegisterToken(payload, grpc_client.metadata, function (error, response){
        if (!error) {
            winston.info(JSON.stringify(response));
            return res.send(response);
        } else {
            winston.error(error.message);
            return res.status(500).send({
                responseCode: 50,
                responseMessage: "Terjadi kesalahan sistem, silahkan coba lagi."
            });
        }
    });
});

router.get('/unregister-token', (req, res, next) => {
    const { error } = validateUnregisterToken(req.body); 
    if (error) return res.status(400).send({
        responseCode: 42,
        responseMessage: error.details[0].message
    });

    const payload = {
        "clientId": req.body.clientId,
        "subject": req.body.subject,
        "reason": req.body.reason
    }
    grpc_client.client.UnregisterToken(payload, grpc_client.metadata , function (error, response){
        if (!error) {
            winston.info(JSON.stringify(response));
            return res.send(response);
        } else {
            winston.error(error.message);
            return res.status(500).send({
                responseCode: 50,
                responseMessage: "Terjadi kesalahan sistem, silahkan coba lagi."
            });
        }
    });
});

router.get('/generate-otp', (req, res, next) => {
    grpc_client.client.GenerateOtpSeed({}, grpc_client.metadata , function (error, response){
        if (!error) {
            console.log(response)
            return res.send(response)
        } else {
            console.error(error)
            return res.send(response)
        }
    });
});

router.get('/remove-linkage', (req, res, next) => {
    const { error } = validateRemoveLinkage(req.body); 
    if (error) return res.status(400).send({
        responseCode: 42,
        responseMessage: error.details[0].message
    });
    
    const payload = {
        "clientId": req.body.clientId,
        "subject": req.body.subject,
        "reason": req.body.reason
    }
    grpc_client.client.RemoveLinkage(payload, grpc_client.metadata , function (error, response){
        if (!error) {
            winston.info(JSON.stringify(response));
            return res.send(response);
        } else {
            winston.error(error.message);
            return res.status(500).send({
                responseCode: 50,
                responseMessage: "Terjadi kesalahan sistem, silahkan coba lagi."
            });
        }
    });
});

module.exports = router;