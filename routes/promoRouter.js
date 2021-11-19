const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Promotions = require('../models/promotion');

const promoRouter =express.Router();

promoRouter.use(bodyParser.json());
promoRouter.route('/')
.get((req, res, next) => {
    Promotions.find({})
    .then((promo)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyUser ,(req, res, next) => {
    Promotions.create(req.body)
    .then((promo) => {
        console.log('Dish Created ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(authenticate.verifyUser ,(req, res, next) => {
    res.statusCode=403;
    res.end(' method PUT  not supported  on dishes');
})
.delete(authenticate.verifyUser ,(req, res, next) => {

    Promotions.remove({}).then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
     } ,(err)=>next(err))
        .catch((err)=>next(err));
});


promoRouter.route('/:promoID')
.get((req, res, next) => {

    Promotions.findById(req.params.promoID).then((promo)=>{
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(promo);
         },(err)=>next(err))
         .catch((err)=>next(err));

})
.post(authenticate.verifyUser ,(req, res, next) => {
    res.statusCode=403;

    res.end(' method POST  not supported  on /promotions/'+req.params.promoID);

})
.put(authenticate.verifyUser ,(req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoID, {
        $set: req.body
    }, { new: true })
    .then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(authenticate.verifyUser ,(req, res, next) => {

    Promotions.findByIdAndRemove(req.params.promoID)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        },(err)=>next(err))
        .catch((err)=>next(err));

});


module.exports =promoRouter;