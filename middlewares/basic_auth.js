const expressBasicAuth = require('express-basic-auth');
const config = require('config');
const basic_auth_user = config.get("basic_auth_user");
const basic_auth_password = config.get("basic_auth_password");

const basicAuth = expressBasicAuth({
    authorizer: basicAuthorizer,
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
});

function basicAuthorizer(username, password){
    const userMatches = expressBasicAuth.safeCompare(username, basic_auth_user);
    const passwordMatches = expressBasicAuth.safeCompare(password, basic_auth_password);
 
    return userMatches & passwordMatches;
}

module.exports = basicAuth;