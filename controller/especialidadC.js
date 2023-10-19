require('rootpath')();
const express = require('express');
const app = express();

const especialidadDb = require("model/especialidadM.js");

app.get("/", (req, res) => { //GET
    especialidadDb.getE((err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = app;