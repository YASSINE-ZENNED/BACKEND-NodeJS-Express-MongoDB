var express = require('express');
var router = express.Router();
const bodyParser= require('body-parser');
const User = require('../models/user');
var router = express.Router();
var passport = require('passport');

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

  res.statusCode=200;
  res.setHeader('Content-Type', 'application/json'); 
  res.json({success:true, status:' u are loged in  successfully!'});  

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
