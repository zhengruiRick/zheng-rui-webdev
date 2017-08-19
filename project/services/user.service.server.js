var app = require("../../express");
var userModel = require("../models/user.model.server");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var googleConfig = {

    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

passport.use(new LocalStrategy(localStrategy));
passport.use(new GoogleStrategy(googleConfig, googleStrategy));


var auth = authorized;



passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);







//http handlers

app.post("/loanerApp/login", passport.authenticate('local'), login);
app.get("/loanerApp/checkLogin", checkLogin);

app.get("/loanerApp/user", findUser);
app.get("/loanerApp/users", getAllUsers);
app.get("/loanerApp/user/:userId", getUserById);
app.post("/loanerApp/user", createUser);
app.put("/loanerApp/user/:userId", updateUser);
app.delete("/loanerApp/user/:userId", deleteUser);

app.get("/project/loanerApp/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get("/googleCallBack",
    passport.authenticate('google', {
        successRedirect: '/project/index.html',
        failureRedirect: '/project/index.html#!login'
    }));



function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}

function authorized (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401);
    } else {
        next();
    }
};



function deleteUser(req, res) {
    var userId = req.params.userId;

    userModel
        .deleteUser(userId)
        .then(function (status) {
            res.sendStatus(200);
        }, function (status) {
            res.sendStatus(404);
        })


}


function updateUser(req, res) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            res.json(status);
        }, function (err) {
            rs.sendStatus(404).send(err);
        })

}

function createUser(req, res) {
    var user = req.body;

    user.password = (new Date()).getTime()

    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        })
}


function getAllUsers(req, res) {

    userModel
        .findAllUsers()
        .then(function (users) {
            res.json(users);
        })
}

function getUserById(req, res) {

    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            res.json(user);
        })
}



function findUser(req,res) {

    var userEmail = req.query.userEmail;
    var password = req.query.password;



    userModel.findUserByCredentials(userEmail, password)
        .then(function (user) {
            if (user != null) {
                res.json(user);
                return;
            } else {
                res.send("0");
            }

        }, function (err) {
            res.sendStatus(404).send(err);
        })
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}


function login(req, res) {
    var user = req.user;
    res.json(user);
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function checkLogin(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
}


function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    email = profile.emails[0].value;
                    // var emailParts = email.split("@");
                    var newGoogleUser = {

                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        userEmail:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}


