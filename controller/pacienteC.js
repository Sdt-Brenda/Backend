require('rootpath')();
const express = require('express');
const app = express();

const pacienteDb = require("model/pacienteM.js");
const cont_security = require("controller/securityC.js");

app.get("/", cont_security.verificar,(req, res) => { //GET
    pacienteDb.getPa((err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/:id_usuario', cont_security.verificar,(req, res) => { //POST
    let id_usuario = req.params.id_usuario
    let paciente = req.body;
    pacienteDb.create(id_usuario, paciente, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    })
});

app.put('/:id_paciente', cont_security.verificar,(req, res) => { //PUT
    let id_paciente = req.params.id_paciente;
    let paciente = req.body;
    pacienteDb.update(id_paciente, paciente, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/:id_paciente', cont_security.verificar,(req, res) => { // DELETE
    pacienteDb.delete(req.params.id_paciente, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

//AGREGADO
app.get("/:id_usuario", cont_security.verificar,(req, res) => { //GET By ID_USUARIO
    let id_usuario = req.params.id_usuario;
    pacienteDb.getByIDU(id_usuario, (err, resultado) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(resultado);
        }
    });
});

//AGREGADA
app.get("/edit/:id_paciente", cont_security.verificar,(req, res) => { //GET By ID_PACIENTE
    let id_paciente = req.params.id_paciente;
    pacienteDb.getByIDP(id_paciente, (err, resultado) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(resultado);
        }
    });
});


app.get("/test/nada/:id_usuario", cont_security.verificar, (req, res) => {
    let id_usuario = req.params.id_usuario;
    pacienteDb.getByPID(id_usuario, (err, resultado) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(resultado);
        }
    });
});

module.exports = app;