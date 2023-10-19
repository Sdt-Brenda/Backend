require('rootpath')();
const turno_medico_db = {};

const mysql = require('mysql');
const config = require("config.json");
const funcionesAuxiliares = require("../funcionesAuxiliares");

//Conexión a la base de datos.
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La tabla 'turno_medico', se encuentra disponible.")
    }
});

turno_medico_db.getTM = function (funCallback) { //GET
    try {
        let consulta = 'SELECT * FROM turno_medico';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "turno_medico", "id_turno");
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "turno_medico", "id_turno");
    }
};

//AGREGADO
turno_medico_db.create = function (turno_medico, funCallback) { //POST 
    try { //Que los botones ingresen valores validos de horario y no permitir que se carguen a mano valores no permitidos
        const expectedTypes = ['number', 'number', 'password', 'number', 'text'];
        let params = [turno_medico.id_usuarioP, turno_medico.id_doctor, turno_medico.fecha, turno_medico.horario, turno_medico.observaciones];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'INSERT INTO turno_medico (id_usuarioP, id_doctor, fecha, horario, observaciones) VALUES (?,?,?,?,?)';

        connection.query(consulta, params, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "turno_medico", "id_turno");
            } else {
                funCallback(undefined, {
                    message: `El turno N°(placeholder) tendrá lugar el día ${turno_medico.fecha}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "turno_medico", "id_turno");
    }
};

//AGREGADO
turno_medico_db.update = function (id_turno, turno_medico, funCallback) { //PUT
    try {
        const expectedTypes = ['number', 'number', 'password', 'number', 'text', 'string'];
        let params = [turno_medico.id_usuarioP, turno_medico.id_doctor, turno_medico.fecha, turno_medico.horario, turno_medico.observaciones, id_turno];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'UPDATE turno_medico SET id_usuarioP = ?, id_doctor = ?, fecha = ?, horario = ?, observaciones = ?  WHERE id_turno = ?';

        connection.query(consulta, params, function (err, result) {
            if (err || result.affectedRows == 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "turno_medico", "id_turno");
            } else {
                funCallback(undefined, {
                    message: `Se actualizó el turno ${turno_medico.id_doctor}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "turno_medico", "id_turno");
    }
};

turno_medico_db.delete = function (id_turno, funCallback) { // DELETE
    try {
        const expectedTypes = ['number'];
        let params = [id_turno];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "DELETE FROM turno_medico WHERE id_turno = ?";

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "turno_medico", "id_turno");
            } else {
                funCallback(undefined, {
                    mensaje: `El turno ${id_turno} fue cancelado exitosamente`,
                    detalle: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "turno_medico", "id_turno");
    }
};

module.exports = turno_medico_db;