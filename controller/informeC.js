require('rootpath')();
const express = require('express');
const app = express();

const informeDb = require("model/informeM.js");

app.get("/", (req, res) => { //GET
    informeDb.getI((err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/:id_estudio', (req, res) => { //POST
    let id_estudio = req.params.id_estudio;
    let informe = req.body;
    informeDb.create(id_estudio, informe, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    })
});

app.put('/:id_informe', (req, res) => { //PUT
    let id_informe = req.params.id_informe;
    let informe = req.body;
    informeDb.update(id_informe, informe, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/:id_informe', (req, res) => { // DELETE
    informeDb.delete(req.params.id_informe, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = app;