var express = require('express');
var router = express.Router();
const bodyParser= require('body-parser');
const User = require('../models/user');
var router = express.Router();
var passport = require('passport');
var authenticate = require('../authenticate');

router.use(bodyParser.json());

 



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup', function(req, res, next) {
  User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
      if(err){
        res.statusCode=500;
        res.setHeader('Content-Type', 'application/json'); 
        res.json({error: err});
      }else{
         passport.authenticate('local')(req, res,()=>{
         res.statusCode=200;
         res.setHeader('Content-Type', 'application/json'); 
         res.json({success:true, status:'Registration successful!'});  
     });
    }
  })
});
 
router.post('/login',passport.authenticate('local'), (req, res)=>{
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode=200;
  res.setHeader('Content-Type', 'application/json'); 
  res.json({success:true,token: token, status:' u are loged in  successfully!',token: token});  

});



router.get('/logout', (req, res)=>{
if(req.session){

  req.session.destroy();
  res.clearCookie('session_id');
  res.redirect('/');
}else{
  var err = new Error('u are not loged in')
  err.status=403;
  next(err);

}
   


});


module.exports = router;
