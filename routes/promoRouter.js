const express = require('express');

const bodyParser = require('body-parser');

const promoRouter =express.Router();

promoRouter.use(bodyParser.json());
promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/palin');
    next();
})
.get((req, res, next) => {
    res.end('will send all promotions to u soon !');
})
.post((req, res, next) => {
    res.end(' add this '+req.body.name+' with details  '+req.body.description );
})
.put((req, res, next) => {
    res.statusCode=403;
    res.end(' method PUT  not supported  on promotions');
})
.delete((req, res, next) => {
    res.end('deleting all the promotion');
});




promoRouter.route('/:promoID')
.all((req, res, next) => {
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/palin');
    next();
})
.get((req, res, next) => {

    res.end('will send details of  ths promotions : '+ req.params.promoId+'to u !!!');

})
.post((req, res, next) => {
    res.statusCode=403;

    res.end(' method POST  not supported  on /promotions/'+req.params.promoId);

})
.put((req, res, next) => {
 
    res.write('updating '+req.params.promoId+'\n');
    res.end('will update '+req.body.name +'with details'+req.body.description);
})
.delete((req, res, next) => {

    res.end('deleting  the promotions'+req.params.promoId);

});

module.exports =promoRouter;