var auth_routes = require('./routes/routes.auth');
const routes = (app) => {
    app.use('/auth', auth_routes);
}
module.exports = routes