const express = require('express');
const router = express.Router();

const passport = require('passport');
const passportJTW = require('passport-jwt');
const ExtractJWT = passportJTW.ExtractJwt;
const JWTStrategy = passportJTW.Strategy;

function routerInit(db){

    passport.use(
      new JWTStrategy({
        jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(), secretOrKey:"albaricoque"
      },(payload, next)=>{
        var user = payload;
        return next(null, user);
      })  
    );

    const entradaApi = require('./entrada')(db);
    const seguridadApi = require('./seguridad')(db);

    router.get('/', (req, res, next) =>{
        res.status(200).json({"Aloha":"Probando Con BD"})
    });

    router.use('/seguridad', seguridadApi);
    router.use('/entrada', passport.authenticate('jwt', {session:false}), entradaApi);

return router;
}
module.exports = routerInit;