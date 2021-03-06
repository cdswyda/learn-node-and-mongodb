const User = require('../models/user.js');

exports.signup = function (req, res) {
    // const user = req.param('user');
    const _user = req.body.user;
    const user = new User(_user);
    User.findOne({
        name: _user.name
    }, (err, auser) => {
        if (err) {
            console.log(err);
        }
        if (auser) {
            res.redirect('/signin');
        } else {
            user.save((err, user) => {
                if (err) throw err;
                console.log(user);
                res.redirect('/');
            });
        }
    })
}

exports.showSignup = function (req, res) {
    res.render('signup', {
        title: '注册'
    });
}

exports.showSignin = function (req, res) {
    res.render('signin', {
        title: '登录'
    });
}

exports.signin = function (req, res) {
    // const user = req.param('user');
    const _user = req.body.user;

    User.findOne({
        name: _user.name
    }, (err, auser) => {
        if (err) {
            console.log(err);
        }
        if (!auser) {
            return res.redirect('/signup')
        }

        auser.comparePassword(_user.password).then(function (isMatch) {
            if (isMatch) {
                console.log('signin success!');
                req.session.user = auser;
                return res.redirect('/');
            } else {
                return res.redirect('/signin');
            }
        }).catch((err) => {
            console.log(err);
        })
    })
}


exports.logout = function (req, res) {
    delete req.session.user;
    // delete app.locals.user;
    res.redirect('/');
}

exports.userList = function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err);
        }
        res.render('userlist', {
            title: '用户列表',
            users: users
        })
    })
}

exports.signinRequired =function (req,res,next) {
    const user = req.session.user;
    if(!user) {
        return res.redirect('/signin');
    }
    next();
}
exports.adminRequired =function (req,res,next) {
    const user = req.session.user;
    if(user.role < 10) {
        return res.redirect('/signin');
    }
    next();
}
