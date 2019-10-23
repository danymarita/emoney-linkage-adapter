const expressBasicAuth = require('express-basic-auth');
const basic_user = process.env.BASIC_USER;
const basic_password = process.env.BASIC_PASSWORD;

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
    const userMatches = expressBasicAuth.safeCompare(username, basic_user);
    const passwordMatches = expressBasicAuth.safeCompare(password, basic_password);
 
    return userMatches & passwordMatches;
}

module.exports = basicAuth;