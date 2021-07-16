const auth = require("./auth");

/**
 * Middleware to check if user data exists,
 * If exists, use Okta SDK library to retrieve user object from Okta API
 */
function addUser(req, res, next) {
    if (!req.userContext) {
        return next();
    }

    auth.oktaClient.getUser(req.userContext.userinfo.sub)
        .then(user => {
            req.user = user;
            res.locals.user = user;
            next();
        }).catch(err => {
            next(err);
        });
}

/**
 * Function to check if user is authorized
 */ 
function loginRequired(req, res, next) {
    // if (!req.user) {
    //     return res.status(401).render("unauthenticated");
    // }

    next();
}

module.exports = { addUser, loginRequired };