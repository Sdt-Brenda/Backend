require('rootpath')();
const express = require('express');
const app = express();

const codigo_estudioDb = require("model/codigo_estudioM.js");

app.get("/", (req, res) => { //GET
    codigo_estudioDb.getCE((err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/', (req, res) => { //POST
    let codigo_estudio = req.body;
    codigo_estudioDb.create(codigo_estudio, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    })
});

app.put('/:codigo', (req, res) => { //PUT
    let codigo = req.params.codigo;
    let codigo_estudio = req.body;
    codigo_estudioDb.update(codigo, codigo_estudio, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/:codigo', (req, res) => { // DELETE
    codigo_estudioDb.delete(req.params.codigo, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.get("/:codigo", /*cont_security.verificar,*/(req, res) => { //GET BY CODIGO
    let codigo = req.params.codigo;
    codigo_estudioDb.getByCodigo(codigo, (err, resultado) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(resultado);
        }
    });
});

app.get("/codigo/nombre", /*cont_security.verificar,*/(req, res) => { //GET NOMBRE MÁS CÓDIGO
    codigo_estudioDb.getCN((err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = app;