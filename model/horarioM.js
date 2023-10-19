require('rootpath')();
const horario_db = {};

const mysql = require('mysql');
const config = require("config.json");
const funcionesAuxiliares = require("../funcionesAuxiliares");

//Conexión a la base de datos.
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La tabla 'horario', se encuentra disponible.")
    }
});

horario_db.getR = function (funCallback) { //GET
    try {
        let consulta = 'SELECT * FROM horario order by id_horario asc';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "horario", "id_horario");
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "horario", "id_horario");
    }
};

horario_db.create = function (horario, funCallback) { //POST
    try {
        const expectedTypes = ['password']; //Parche hasta que definamos como poner la hora de forma apropiada.
        let params = [horario.horario];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'INSERT INTO horario (horario) VALUES (?)';

        connection.query(consulta, params, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "horario", "id_horario");
            } else {
                funCallback(undefined, {
                    message: `Se creó el horario ${horario.horario}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "horario", "id_horario");
    }
};

horario_db.update = function (id_horario, horario, funCallback) { //PUT
    try {
        const expectedTypes = ['password', 'number']; //Parche hasta que definamos como poner la hora de forma apropiada.
        let params = [horario.horario, id_horario];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'UPDATE horario SET horario = ? WHERE id_horario = ?';

        connection.query(consulta, params, function (err, result) {
            if (err || result.affectedRows == 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "horario", "id_horario");
            } else {
                funCallback(undefined, {
                    message: `Se actualizó el horario ${horario.nombre_horario}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "horario", "id_horario");
    }
};

horario_db.delete = function (id_horario, funCallback) { // DELETE
    try {
        const expectedTypes = ['number'];
        let params = [id_horario];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "DELETE FROM horario WHERE id_horario = ?";

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "persona", "dni");
            } else {
                funCallback(undefined, {
                    mensaje: `El horario con id = ${id_horario} fue eliminado correctamente`,
                    detalle: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "persona", "dni");
    }
};

horario_db.getID = function (horario, funCallback) { // GET ID BY HORARIO
    try {
        const expectedTypes = ['password']; //Parche
        let params = [horario];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "SELECT id_horario FROM horario WHERE horario = ?";

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "doctor", "id_doctor");
            } else {
                funCallback(undefined, result);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "doctor", "id_doctor");
    }
};

/*
SELECT id_turno
FROM turno_medico
WHERE horario = 'your_horario_value' 
  AND fecha = 'your_fecha_value'
  AND id_usuarioD = 'your_id_usuarioD_value';
*/
module.exports = horario_db;