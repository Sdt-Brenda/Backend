require('rootpath')();
const express = require('express');
const app = express();

const horario_doctordb = require("model/horario_doctorM.js");

app.get("/", (req, res) => { //GET
    horario_doctordb.getE((err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/:id_doctor', (req, res) => {
    let id_doctor = req.params.id_doctor;
    let parametros = req.body;
    horario_doctordb.create(id_doctor, parametros, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});


app.put('/edit/:id_estudio', (req, res) => { //PUT
    let id_estudio = req.params.id_estudio;
    let estudio = req.body;
    horario_doctordb.update(id_estudio, estudio, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/:id_estudio', (req, res) => { // DELETE
    horario_doctordb.delete(req.params.id_estudio, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = app;