// var app = require('../../../express');
module.exports = function (app) {
    var express = require('express');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var userModel = require('../model/user/user.model.server');
    var profileID;
    var bcrypt = require("bcrypt-nodejs");
    app.use(express.static(__dirname + '/assignment'));
    //facebook config
    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'name', 'email'],
        enableProof: false
    };


    app.get('/api/assignment/user/:userId', findUserById);
    app.get('/api/assignment/user', findAllUsers);
    app.post('/api/assignment/user', createUser);
    app.put('/api/assignment/user/:userId', updateUser);
    app.delete('/api/assignment/user/:userId', deleteUser);



    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.get('/api/assignment/loggedin', loggedin);
    app.get('/api/assignment/loggedin/profileid', getProfileId);
    app.get('/api/assignment/logout', logout);
    app.post('/api/assignment/user', register);
    app.get('/auth/assignment/facebook', passport.authenticate('facebook', {scope: 'email'}));
    var FacebookStrategy = require('passport-facebook').Strategy;
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.get('/auth/assignment/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/#!/user',
            failureRedirect: '/assignment/login'
        }));

    function register(req, res) {
        var userObj = req.body;
        userModel
            .createUser(userObj)
            .then(function (user) {
                req
                    .login(user, function (status) {
                        res.send(status);
                    });
            });
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function getProfileId() {


    }
    function loggedin(req, res) {
        if (req.isAuthenticated()) {

            res.json(req.user);
        } else {
            res.send('0');
        }
    }


    function localStrategy(username, password, done) {
        console.log(password);
        userModel
            .findUserByCredentials(username)
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }, function (error) {
                done(error, false);
            });
    }

    function login(req, res) {
        res.json(req.user);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.send(status);
            });
    }

    function updateUser(req, res) {
        var user = req.body;
        userModel
            .updateUser(req.params.userId, user)
            .then(function (status) {
                res.send(status);
            });
    }

    function createUser(req, res) {

        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.send(err);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];

        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            });

    }

    function findAllUsers(req, res) {
        var username = req.query['username'];
        var password = req.query.password;
        if (username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.sendStatus(404);
                    }
                });
        } else if (username) {
            userModel
                .findUserByUsername(username)
                .then(function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        res.json(user);
                    } else {
                        res.sendStatus(404);
                    }
                });
        } else {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newFacebookUser = {
                            username: emailParts[0] + '_facebook',
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newFacebookUser);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

};




