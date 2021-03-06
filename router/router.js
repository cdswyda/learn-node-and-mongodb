const Index = require('../app/controllers/index');
const User = require('../app/controllers/user');
const Movie = require('../app/controllers/movie');

module.exports = function (app) {
    /**
     * 路由配置
     */
    app.use(function (req, res, next) {
        // console.log(req.session);
        // var _user = req.session.user;
        // app.locals.user = _user ? _user : null;
        app.locals.user = req.session.user;
        return next();
    });
    // index page
    app.get('/', Index.index);

    // user
    // signup
    app.post('/user/signup', User.signup);
    // signin
    app.post('/user/signin', User.signin);
    app.get('/signin', User.showSignin);
    app.get('/signup', User.showSignup);
    app.get('/admin/user/list', User.signinRequired, User.adminRequired, User.userList);
    // logout
    app.get('/logout', User.logout);

    // Movie
    // detail page
    app.get('/movie/:id', Movie.detail);
    app.get('/admin/movie/new', Movie.new);
    // admin update movie
    app.get('/admin/move/update/:id', Movie.update);
    // admin post movie
    app.post('/admin/movie', Movie.save);
    // list page
    app.get('/admin/movie/list', Movie.list);
    // delete
    app.delete('/admin/movie/list', Movie.delete);
}