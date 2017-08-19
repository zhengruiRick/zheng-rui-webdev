var app = require("../../express");
var userModel = require("../models/user.model.server");
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new LocalStrategy(localStrategy));


passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);


//http handlers
app.post("/api/login", passport.authenticate('local'), login);

app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.get("/api/checkLogin", checkLogin);
app.get('/auth/google',  passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/api/googleCallBack',
    passport.authenticate('google', {
        successRedirect: '/#!/profile',
        failureRedirect: '/#!/login'
    }));




var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
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


function checkLogin(req,res) {
    res.send(req.isAuthenticated() ? req.user : "0");

}

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

function login(req, res) {
    var user = req.user;
    res.json(user);

}

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
    userModel
        .createUser(user)
        .then(function (user) {
            res.json(user);
        })

}

function findUser(req, res) {
    var body = req.body;

    var username = body.username;
    var password = body.password;


    userModel.findUserByCredentials(username, password)
        .then(function (user) {
            if (user != null) {
                res.json(user);
            } else {
                res.send("0");
            }

        }, function (err) {
            res.sendStatus(404).send(err);
        })

}


function getAllUsers(req, responese) {
    responese.send(users);
}

function getUserById(req, res) {

    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            res.json(user);
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

