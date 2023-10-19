require('rootpath')();
const express = require('express');
const app = express();

const doctorDb = require("model/doctorM.js");
const cont_security = require("controller/securityC.js");

app.get("/", cont_security.verificar,(req, res) => { //GET
    doctorDb.getD((err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

//AGREGADO
app.post('/:id_usuario', (req, res) => { //POST
    let id_usuario = req.params.id_usuario
    let doctor = req.body;
    doctorDb.create(id_usuario, doctor, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    })
});

app.put('/:id_doctor', cont_security.verificar,(req, res) => { //PUT
    let id_doctor = req.params.id_doctor;
    let doctor = req.body;
    doctorDb.update(id_doctor, doctor, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/:id_doctor', cont_security.verificar,(req, res) => { // DELETE
    doctorDb.delete(req.params.id_doctor, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.get("/:especialidad", cont_security.verificar,(req, res) => { // GET By ESPECIALIDAD
    let especialidad = req.params.especialidad;
    doctorDb.getByEspecialidad(especialidad, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

app.get("/dias/:id_doctor/", cont_security.verificar,(req, res) => { // GET DIAS By ID
    doctorDb.getByIDD(req.params.id_doctor, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

app.get("/horario/:id_doctor/:fecha", cont_security.verificar,(req, res) => { // GET HORARIO By ID
    const idDoctor = req.params.id_doctor;
    const fecha = req.params.fecha;
    doctorDb.getByIDH(idDoctor, fecha, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

//AGREGADO

app.get("/edit/:id_doctor", /*cont_security.verificar,*/(req, res) => { //GET By ID_DOCTOR
    let id_doctor = req.params.id_doctor;
    doctorDb.getByID(id_doctor, (err, resultado) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(resultado);
        }
    });
});

module.exports = app;