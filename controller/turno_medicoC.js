require('rootpath')();
const express = require('express');
const app = express();

const turno_medicoDb = require("model/turno_medicoM.js");
const cont_security = require("controller/securityC.js");

app.get("/", cont_security.verificar,(req, res) => { //GET
    turno_medicoDb.getTM((err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json(result);
            }
        });
});

app.post('/', cont_security.verificar,(req, res) => { //POST
    let turno_medico = req.body;
    turno_medicoDb.create(turno_medico, (err, result) => {
        if(err){
            res.status(err.status).send(err);
        }else{
            res.json(result);
        }
    })
});

app.put('/:id_turno', cont_security.verificar,(req, res) => { //PUT
    let id_turno = req.params.id_turno;
    let turno_medico = req.body;
    turno_medicoDb.update(id_turno, turno_medico, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/:id_turno', cont_security.verificar,(req, res) => { // DELETE
    turno_medicoDb.delete(req.params.id_turno, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = app;