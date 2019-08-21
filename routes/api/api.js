const express = require('express');
const router = express.Router();

function routerInit(db){

    const entradaApi = require('./entrada')(db);

    router.get('/', (req, res, next) =>{
        res.status(200).json({"Aloha":"Probando Con BD"})
    });

    router.use('/entrada', entradaApi);

return router;
}
module.exports = routerInit;