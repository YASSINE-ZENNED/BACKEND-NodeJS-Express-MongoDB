var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/user");
const mongoose = require("mongoose");

var User = require("./models/user");

const Dishes = require("./models/dishes");

var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");

var config = require("./config");

exports.local = passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
  return jwt.sign(user, config.secertKey, { expiresIn: 3600 });
};

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secertKey;

exports.jwtpassport = passport.use(
  new JwtStrategy(opts, (jwt_paylode, done) => {
    console.log("JWT paylode :", jwt_paylode);
    User.findOne({ _id: jwt_paylode._id }, (err, user) => {
      if (err) {
        return done(err, false);
      } else if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = function (req, res, next) {
  if (!req.user.admin) {
    err = new Error("You are not authorized to perform this operation!");
    err.status = 404;
    return next(err);
  }
  next();
};

exports.verifyUser1 = function (req, res, next) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, config.secretKey, function (err, decoded) {
      if (err) {
        var err = new Error("You are not authenticated!");
        err.status = 401;
        return next(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    var err = new Error("No token provided!");
    err.status = 403;
    return next(err);
  }
};

exports.verifyCommentAuthor = async function (req, res, next) {
  var id1 = req.user._id;

  var id2 = (await Dishes.findOne({ _id: req.params.dishID })).comments.id(
    req.params.commentID
  ).author;

  if (!id1.equals(id2)) {
    err = new Error(
      "You are not the auther of this comment   " +
        id1 +
        "   -----------   " +
        id2
    );
    err.status = 404;
    return next(err);
  }
  next();
};
