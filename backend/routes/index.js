var auth_routes = require('./routes/auth.route');
var users_routes = require('./routes/users.route');
var article_routes = require('./routes/article.route');
var category_routes = require('./routes/category.route');
var vocaCategory_routes = require('./routes/vocaCategory.route');
const routes = (app) => {
    app.use('/api/auth', auth_routes);
    app.use('/api/users', users_routes);
    app.use('/api/articles', article_routes);
    app.use('/api/category', category_routes);
    app.use('/api/vocabularies/categories', vocaCategory_routes);
}
module.exports = routes