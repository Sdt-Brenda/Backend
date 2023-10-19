require('rootpath')();
const especialidad_db = {};

const mysql = require('mysql');
const config = require("config.json");
const funcionesAuxiliares = require("../funcionesAuxiliares");

//Conexión a la base de datos.
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La tabla 'especialidad', se encuentra disponible.")
    }
});

especialidad_db.getE = function (funCallback) { //GET
    try {
        let consulta = 'SELECT especialidad FROM especialidad';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "especialidad", "id_especialidad");
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "especialidad", "id_especialidad");
    }
};


module.exports = especialidad_db;