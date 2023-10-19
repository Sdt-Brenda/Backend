require('rootpath')();
const express = require('express');
const app = express();

const usuarioDb = require("model/usuarioM.js");
const cont_security = require("controller/securityC.js");


app.get("/", cont_security.verificar, (req, res) => {
    usuarioDb.getU((err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/', cont_security.verificar,(req, res) => { //POST
    let usuario = req.body;
    usuarioDb.create(usuario, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    })
});

app.put('/:id_usuario', cont_security.verificar,(req, res) => { //PUT
    let id_usuario = req.params.id_usuario;
    let usuario = req.body;
    usuarioDb.update(id_usuario, usuario, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/:id_usuario', cont_security.verificar,(req, res) => { //DELETE
    let id_usuario = req.params.id_usuario;
    usuarioDb.delete(id_usuario, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    })
});

app.get("/:id_usuario", cont_security.verificar,(req, res) => { //GET By ID_USUARIO
    let id_usuario = req.params.id_usuario;
    usuarioDb.getByID(id_usuario, (err, resultado) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(resultado);
        }
    });
});

//AGREGADO
app.get("/email/:email", /*cont_security.verificar,*/(req, res) => { //GET By EMAIL
    let email = req.params.email;
    usuarioDb.getByEmail(email, (err, resultado) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(resultado);
        }
    });
});


//AGREGADO
app.get("/test/rol", cont_security.verificar, (req, res) => {
    const rol = 3;
    usuarioDb.getByRol(rol, (err, resultado) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(resultado);
        }
    });
});



module.exports = app;