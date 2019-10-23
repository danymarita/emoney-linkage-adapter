// winston is library for logging
const winston = require('winston');
// express-async-errors
require('express-async-errors');

module.exports = function() {
    // Handle uncaughtException with winston
    // Error beside express request processing will handle with this
    winston.exceptions.handle(
        new winston.transports.File({ filename: 'uncaughtexception.log',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
            winston.format.timestamp(),
            winston.format.printf(
                info => `${info.timestamp} ${info.level} ${info.message}`
            )
        )
    }));
    // Handle unhandledRejection
    process.on('unhandledRejection', (ex) => {
        // Just throw exception and will catch by exception handler above
        throw ex;
    });

    // Set winston logger to file
    winston.add(new winston.transports.File({ filename: 'logfile.log',
    format: winston.format.combine(
        winston.format.label({ label: 'emoney-linkage-adapter' }),
        winston.format.colorize(),
        winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] }),
        winston.format.timestamp(),
        winston.format.printf(
            info => {
                let out = `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
                if (info.metadata.error) {
                    out = out + ' ' + info.metadata.error;
                    if (info.metadata.error.stack) {
                        out = out + ' ' + info.metadata.error.stack;
                    }
                }
                return out;
            }
        )
    )
    }));
}