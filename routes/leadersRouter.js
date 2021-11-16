const express = require('express');

const bodyParser = require('body-parser');

const leaderRouter =express.Router();

leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/palin');
    next();
})
.get((req, res, next) => {
    res.end('will send all leaders to u soon !');
})
.post((req, res, next) => {
    res.end(' add this '+req.body.name+' with details  '+req.body.description );
})
.put((req, res, next) => {
    res.statusCode=403;
    res.end(' method PUT  not supported  on leaders');
})
.delete((req, res, next) => {
    res.end('deleting all the leaders');
});




leaderRouter.route('/:leaderId')
.all((req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/palin');
    next();
})
.get((req, res, next) => {

    res.end('will send details of  ths leader : '+ req.params.leaderId+'to u !!!');

})
.post((req, res, next) => {
    res.statusCode=403;

    res.end(' method POST  not supported  on /leader/'+req.params.leaderId);

})
.put((req, res, next) => {
 
    res.write('updating '+req.params.leaderId+'\n');
    res.end('will update '+req.body.name +'with details'+req.body.description);
})
.delete((req, res, next) => {

    res.end('deleting  the leader'+req.params.leaderId);

});

module.exports = leaderRouter;