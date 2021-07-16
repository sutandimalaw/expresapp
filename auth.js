var okta = require("@okta/okta-sdk-nodejs");
var ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;

/**
 * Okta Client to retrieve user data from Okta API
 */ 
 var oktaClient = new okta.Client({
    orgUrl: 'https://dev-35482467.okta.com',
    token: '000mio7BmPRg2zV71BDiHWPLSAQVXWlt7BKCk2t2Az'
});

/**
 * OpenID Connect protocol
 */  
const oidc = new ExpressOIDC({
    appBaseUrl      : "http://localhost:3000",
    issuer          : "https://dev-35482467.okta.com/oauth2/default",
    client_id       : "0oa1719q936FQem0p5d7",
    client_secret   : "HED8-3RsF_dLeNQ9VhnUh_Lg-fkUTtn1nH0oVhph",
    // loginRedirectUri: "http://localhost:3000/users/callback",
    loginRedirectUri: "http://localhost:3000/login/callback",
    scope           : "openid profile",
    routes          :   {
                            login: {
                                path: "/users/login"
                            },
                            loginCallback: {
                                path: "/users/callback",
                                afterCallback: "/dashboard"
                            }
                        }
});

module.exports = {oktaClient, oidc};