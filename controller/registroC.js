require('rootpath')();
const express = require('express');
const app = express();

const registroDb = require("model/registroM.js");


app.post('/', (req, res) => { //POST
    let registro = req.body;
    registroDb.create(registro, (err, result) => {
        if (err) {
            res.status(err.status).send(err);
        } else {
            res.json(result);
        }
    })
});

module.exports = app;