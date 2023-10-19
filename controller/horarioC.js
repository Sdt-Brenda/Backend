require('rootpath')();
const express = require('express');
const app = express();

const horarioDb = require("model/horarioM.js");
const cont_security = require("controller/securityC.js");

app.get("/", cont_security.verificar,(req, res) => { //GET
    horarioDb.getR((err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/', cont_security.verificar,(req, res) => { //POST
    let horario = req.body;
    horarioDb.create(horario, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    })
});

app.put('/:id_horario', cont_security.verificar,(req, res) => { //PUT
    let id_horario = req.params.id_horario;
    let horario = req.body;
    horarioDb.update(id_horario, horario, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/:id_horario', cont_security.verificar,(req, res) => { // DELETE
    horarioDb.delete(req.params.id_horario, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.get('/:horario', cont_security.verificar,(req, res) => { // GET ID By Horario
    horarioDb.getID(req.params.horario, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = app;