require('rootpath')();
const express = require('express');
const app = express();

const rolDb = require("model/rolM.js");
const cont_security = require("controller/securityC.js");


app.get("/", cont_security.verificar,(req, res) => { //GET
    rolDb.getR((err, result) => {
            if (err) {
                res.status(err.status).send(err);
            } else {
                res.json(result);
            }
        });
});

app.post('/', cont_security.verificar,(req, res) => { //POST
    let rol = req.body;
    rolDb.create(rol, (err, result) => {
        if(err){
            res.status(err.status).send(err);
        }else{
            res.json(result);
        }
    })
});

app.put('/:id_rol', cont_security.verificar,(req, res) => { //PUT
    let id_rol = req.params.id_rol;
    let rol = req.body;
    rolDb.update(id_rol, rol, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete('/:id_rol', cont_security.verificar,(req, res) => { // DELETE
    rolDb.delete(req.params.id_rol, (err, result) => {
        if (err) {
            res.status(err.status).json(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = app;