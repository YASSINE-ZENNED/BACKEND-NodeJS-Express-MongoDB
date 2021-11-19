var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leadersRouter');


const mongoose = require('mongoose');


const Dishes =require('./models/dishes');
const Leader = require('./models/leader');

const url ='mongodb://127.0.0.1:27017/conFusion';
const connect=mongoose.connect(url);




connect.then((db)=>{

console.log('Connecting to database successfully');
},
(err)=>{console.log(err);

});




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser('15632-63259-01230-55866'));

app.use(session({
  name:'session_id',
  secret:'15632-63259-01230-55866',
  saveUninitialized:false,
  resave:false,
  store: new FileStore()

}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/users', usersRouter);


function auth(req,res,next){
    if(!req.user){
        var err = new Error('Invalid authorization header || u are not allwed');


          res.setHeader('WWW-Authenticate','Basic');
          err.status=401;
         return next(err);
    }else{
      next(); 
    }

};

app.use(auth);



app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leader',leaderRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
