require('rootpath')();
const express = require('express');
const app = express();

const estudioDb = require("model/estudioM.js");

app.get("/", (req, res) => { //GET
    estudioDb.getE((err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/:id_paciente', (req, res) => { //POST
    let id_paciente = req.params.id_paciente;
    let estudio = req.body;
    estudioDb.create(id_paciente, estudio, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    })
});

app.put('/edit/:id_estudio', (req, res) => { //PUT
    let id_estudio = req.params.id_estudio;
    let estudio = req.body;
    estudioDb.update(id_estudio, estudio, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/:id_estudio', (req, res) => { // DELETE
    estudioDb.delete(req.params.id_estudio, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.get("/:id_estudio", /*cont_security.verificar,*/(req, res) => { //GET By ID_ESTUDIO
    let id_estudio = req.params.id_estudio;
    estudioDb.getByIDE(id_estudio, (err, resultado) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(resultado);
        }
    });
});

app.get("/paciente/:id_paciente", /*cont_security.verificar,*/(req, res) => { //GET By ID_PACIENTE
    let id_paciente = req.params.id_paciente;
    estudioDb.getByIDP(id_paciente, (err, resultado) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(resultado);
        }
    });
});

app.get("/horario/:codigo", (req, res) => { //GET BY CODIGO
    let codigo = req.params.codigo;
    estudioDb.getByIH(codigo, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = app;