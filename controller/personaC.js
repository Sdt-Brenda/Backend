require('rootpath')();
const express = require('express');
const app = express();


var personaDb = require("model/personaM.js");
const cont_security = require("controller/securityC.js");

app.get("/", cont_security.verificar,(req, res) => { //GET
    personaDb.getP((err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json(result);
            }
        });
});

app.post('/', cont_security.verificar,(req, res) => { //POST
    let persona = req.body;
    personaDb.create(persona, (err, result) => {
        if(err){
            res.status(err.status).send(err);
        }else{
            res.json(result);
        }
    })
});

app.put('/:dni', cont_security.verificar,(req, res) => { //PUT
    var dni = req.params.dni;
    var persona = req.body;
    personaDb.update(dni, persona, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/:dni', cont_security.verificar,(req, res) => { // DELETE
    personaDb.delete(req.params.dni, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.get("/apellido/:apellido", cont_security.verificar,(req, res) => { //GET BY Apellido
    personaDb.getByApellido(req.params.apellido, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

app.get('/dni/:dni', cont_security.verificar,(req, res) => { //GET BY Nickname
    personaDb.getUserByNickname(req.params.dni, (err, result) =>{
        if(err){
            res.status(err.status).json(err);
        }else{
            if (result.length == 0) {
                res.status(404).send(result.mensaje);
            }else {
                res.json(result);
            }
        }
    })
});


module.exports = app;