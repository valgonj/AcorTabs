const express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

function entradaInit(db){

    var entradaColl = db.collection('entrada');
    var usersColl = db.collection('users');

    var entradaCollection = [];
    var entradaStructure = {
        "_id" : '',
        "nombre": '',
        "email": '',
        "fecha": 0
    }

    /*entradaCollection.push(
        Object.assign({}, entradaStructure, {"id":9, "nombre":"Josué", "email":"GoVaJosue@protonmail.ch", "fecha": new Date().getTime()})
    );*/

    router.get('/', (req, res, next)=>{
        entradaColl.find().toArray((err, entrada)=>{
            if(err) return res.status(200).json([]);
            return res.status(200).json(entrada);
        });
    });//get

    router.get('/users', (req, res, next)=>{
        usersColl.find().toArray((err, users)=>{
            if(err) return res.status(200).json([]);
            return res.status(200).json(users);
        });
    });//getUser

    router.get('/:id', (req, res, next)=>{
        var query = {"_id": new ObjectID(req.params.id)}
        entradaColl.findOne(query, (err, doc)=>{
            if(err){
                console.log(err);
                return res.status(401).json({"error":"Error al extraer documento"})
            }
            return res.status(200).json(doc);
        });//findOne
    });//ByID

    router.post('/', (req, res, next)=>{
        var _id = req.user;
        var nuevoElemento = Object.assign({}, entradaStructure, req.body, {"_id": new ObjectID(_id), "fecha": new Date().getTime()});

        entradaColl.insertOne(nuevoElemento, {}, (err, result)=>{
            if(err){
                console.log(err);
                return res.status(404).json({"error":"Fallo en la entrada de datos"});
            }
            return res.status(200).json({"n": result.insertedCount, "obj": result.ops[0]});
        });//insertOne
    });//post

    router.put('/:idElemento', (req, res, next) => {
        var query = {"_id": new ObjectID(req.params.idElemento)};
        var update = { "$set": req.body, "$inc":{"visited": 1}};

        entradaColl.updateOne(query, update, (err, rst) => {
            if(err){
              console.log(err);
              return res.status(400).json({"error": "Error al actualizar documento"});
            }
            return res.status(200).json(rst);
        });//updateOne
    });//put

    router.delete('/:id', (req, res, next) => {
        var query = {"_id": new ObjectID(req.params.id)}
        entradaColl.removeOne(query, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(400).json({"error":"Error al eliminar documento"});
            }
            return res.status(200).json(result);
        });//removeOne
    });//delete

return router;
}

module.exports = entradaInit;