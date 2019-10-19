const Joi = require('joi');

function validateRegisterToken(req) {
    const schema = {
        clientId: Joi.string().required(),
        subject: Joi.string().required(),
        token: Joi.number().min(000000).max(999999).required()
    };
  
    return Joi.validate(req, schema);
}

function validateUnregisterToken(req) {
    const schema = {
        clientId: Joi.string().required(),
        subject: Joi.string().required(),
        reason: Joi.string().required()
    };
  
    return Joi.validate(req, schema);
}

function validateRemoveLinkage(req) {
    const schema = {
        clientId: Joi.string().required(),
        subject: Joi.string().required(),
        reason: Joi.string().required()
    };
  
    return Joi.validate(req, schema);
}

module.exports.validateRegisterToken = validateRegisterToken;
module.exports.validateUnregisterToken = validateUnregisterToken;
module.exports.validateRemoveLinkage = validateRemoveLinkage;