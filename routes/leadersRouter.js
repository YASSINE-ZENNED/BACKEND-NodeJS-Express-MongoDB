const express = require('express');

const bodyParser = require('body-parser');
const cors = require('./cors');

const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Leaders = require('../models/leader');


const leaderRouter =express.Router();

leaderRouter.use(bodyParser.json());
leaderRouter.route('/').options(cors.corsWithOptions,(req, res)=>{res.sendStatus(200);})

.get(cors.cors,(req, res, next) => {
    Leaders.find({})
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser , authenticate.verifyAdmin ,(req, res, next) => {
    Leaders.create(req.body)
    .then((leader) => {
        console.log('leader Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin ,(req, res, next) => {
    res.statusCode=403;
    res.end(' method PUT  not supported  on leaders');
})
.delete(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {

    Leaders.remove({}).then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
     } ,(err)=>next(err))
        .catch((err)=>next(err));
});




leaderRouter.route('/:leaderID').options(cors.corsWithOptions,(req, res)=>{res.sendStatus(200);})

.get(cors.cors,(req, res, next) => {

    Leaders.findById(req.params.leaderID).then((leader)=>{
         res.statusCode = 200;
         res.setHeader('Content-Type', 'application/json');
         res.json(leader);
         },(err)=>next(err))
         .catch((err)=>next(err));

})
.post(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin ,(req, res, next) => {
    res.statusCode=403;

    res.end(' method POST  not supported  on /leadres/'+req.params.leaderID);

})
.put(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin ,(req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderID, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin ,(req, res, next) => {

    Leaders.findByIdAndRemove(req.params.leaderID)
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
        },(err)=>next(err))
        .catch((err)=>next(err));

});

module.exports = leaderRouter;