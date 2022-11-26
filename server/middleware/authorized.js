var passport = require('passport');
var { vertifyAccessToken } = require('../services/firebase-admin.service')

module.exports = function authorized(request, response, next) {
    passport.authenticate('jwt', { session: false, }, async (error, token) => {
        console.log({ token: request.get('authorization') });
        if (token) {
            next();
        } else {
            // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
            if (request.get('authorization').includes("Bearer")) {
                var _authorization = request.get('authorization').split(" ")[1]
                console.log({ _authorization });
                vertifyAccessToken(_authorization).then((id) => {
                    next()
                }).catch((err) => {
                    response.send(err.message)
                    // response.status(401).json({ message: 'Unauthorized' });
                    return
                })

            }
            // return response.status(401).json({ message: 'Unauthorized' });
        }

    })(request, response, next);
}