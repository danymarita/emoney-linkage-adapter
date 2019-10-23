const winston = require('winston');

module.exports = function(err, req, res, next){
    // Log the exception
    // Level
    // error, warn, info, verbose, debug, silly
    winston.error(err.message, { metadata: { stacktrace: err } });
    res.status(500).send({
        responseCode: 50,
        responseMessage: "Terjadi kesalahan sistem, silahkan coba lagi."
    });
}