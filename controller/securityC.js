require('rootpath')();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usuarioDb = require("model/usuarioM.js");

app.post('/login', login);

function login(req, res) {
    const { dni, password } = req.body;
    usuarioDb.getByDNI(dni, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            const same = bcrypt.compareSync(password, result.detail.password);
            if (same) {
                let user = {
                    dni: result.detail.dni,
                    nombre: result.detail.nombre,
                    id_usuario: result.detail.id_usuario,
                    email: result.detail.email,
                    rol: result.detail.rol
                }
                jwt.sign(user, 'siliconSecret', { expiresIn: '72h' }, (err, token) => {
                    if (err) {
                        res.status(err.status).send({
                            messege: err
                        });
                    } else {
                        res.json({
                            datos: user,
                            token: token
                        });
                    }
                })
            } else {
                res.status(403).send({
                    messege: 'Contraseña Incorrecta'
                });
            }
        }
    });
};

function verificar(req, res, next) {
    if (req.headers["token"]) {
        try {
            const token = req.headers["token"]
            const verified = jwt.verify(token, "siliconSecret");
            if (verified) {
                next();
            } else {
                res.status(403).send({
                    message: "Token invalido, permiso denegado"
                });
            }
        } catch (error) {
            res.status(403).send({
                message: "Acceso Denegado"
            });
        }
    } else {
        res.status(403).send({
            message: "No posee token de autorizacion"
        });
    }
};


module.exports = { app, verificar };