var auth_routes = require('./routes/auth.route');
var users_routes = require('./routes/users.route');
var article_routes = require('./routes/article.route');
var category_routes = require('./routes/articleCategory.route');
var vocaCategory_routes = require('./routes/vocaCategory.route');
var vocaCategory = require('./routes/vocabulary.route');
var examCategory_routes = require('./routes/vocaCategory.route');
var exam_routes = require('./routes/exam.route');
var question_routes = require('./routes/question.route');
const routes = (app) => {
    app.use('/api/auth', auth_routes);
    app.use('/api/users', users_routes);
    app.use('/api/articles', article_routes);
    app.use('/api/articles/categories', category_routes);
    app.use('/api/vocabularies/categories', vocaCategory_routes);
    app.use('/api/vocabularies', vocaCategory);
    app.use('/api/exams/categories', examCategory_routes);
    app.use('/api/exams', exam_routes);
    app.use('/api/questions', question_routes);
}
module.exports = routes