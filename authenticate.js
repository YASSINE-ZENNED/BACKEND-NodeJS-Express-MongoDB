var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');


exports.local= passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());

exports.getToken= function(user) {
    return jwt.sign(user,config.secertKey,{expiresIn:3600}); 
};

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secertKey;


exports.jwtpassport =passport.use(new JwtStrategy(opts,(jwt_paylode, done) =>{
        console.log("JWT paylode :",jwt_paylode);
        User.findOne({_id:jwt_paylode._id},(err,user) =>{

            if(err){
                return done(err,false);
            }
            else if(user){

                    return done(null,user);
            }else{

                return done(null,false);
            }

        });
        
      } 
    ));

exports.verifyUser = passport.authenticate('jwt',{session:false})    
