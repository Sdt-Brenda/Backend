require('rootpath')();
const express = require('express');
const app = express();

const historia_clinicaDb = require("model/historia_clinicaM.js");
const cont_security = require("controller/securityC.js");

app.get("/", cont_security.verificar,(req, res) => { //GET
    historia_clinicaDb.getHC((err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json(result);
            }
        });
});

//AGREGADO
app.post('/:id_paciente', cont_security.verificar,(req, res) => { //POST
    let id_paciente = req.params.id_paciente;
    historia_clinicaDb.create(id_paciente, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    })
});

app.put('/:id_historia_clinica', cont_security.verificar,(req, res) => { //PUT
    let id_historia_clinica = req.params.id_historia_clinica;
    let historia_clinica = req.body;
    historia_clinicaDb.update(id_historia_clinica, historia_clinica, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/:id_historia_clinica', cont_security.verificar,(req, res) => { // DELETE
    historia_clinicaDb.delete(req.params.id_historia_clinica, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

//AGREGADO
app.get("/:id_paciente", cont_security.verificar,(req, res) => { //GET By ID_PACIENTE (PROBABLEMENTE NO HAGA FALTA)
    let id_paciente = req.params.id_paciente;
    historia_clinicaDb.getByID(id_paciente, (err, resultado) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(resultado);
        }
    });
});


module.exports = app;