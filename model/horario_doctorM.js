require('rootpath')();
const horario_doctor_db = {};

const mysql = require('mysql');
const config = require("config.json");
const funcionesAuxiliares = require("../funcionesAuxiliares");

//Conexión a la base de datos.
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La tabla 'horario_doctor', se encuentra disponible.")
    }
});

horario_doctor_db.getE = function (funCallback) { //GET
    try {
        let consulta = 'SELECT * FROM horario_doctor';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "horario_doctor", "id_horario_doctor");
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "horario_doctor", "id_horario_doctor");
    }
};

horario_doctor_db.create = function (id_doctor, parametros, funCallback) { // POST
    try {
        const expectedTypes = ['text', 'text'];
        let params = [id_doctor, parametros.id_horario,];
        funcionesAuxiliares.validar(params, expectedTypes);

        console.log(params);
        let consulta = 'INSERT INTO horario_doctor (id_doctor, id_horario) VALUES (?,?)';

        connection.query(consulta, params, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "horario_doctor", "id_doctor");
            } else {
                funCallback(undefined, result);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "horario_doctor", "id usuario");
    }
};


horario_doctor_db.update = function (id_horario_doctor, horario_doctor, funCallback) { //PUT
    try {
        const expectedTypes = ['string', 'string', 'string', 'string', 'string', 'text'];
        let params = [horario_doctor.obra_social, horario_doctor.pais, horario_doctor.provincia, horario_doctor.localidad, horario_doctor.direccion, id_horario_doctor];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'UPDATE horario_doctor SET obra_social = ?, pais = ?, provincia = ?, localidad = ?, direccion = ? WHERE id_horario_doctor = ?';

        connection.query(consulta, params, function (err, result) {
            if (err || result.affectedRows == 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "horario_doctor", "id usuario");
            } else {
                funCallback(undefined, {
                    message: `Se actualizó la información del horario_doctor ${horario_doctor.id_horario_doctor}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "horario_doctor", "id usuario");
    }
};

horario_doctor_db.delete = function (id_horario_doctor, funCallback) { // DELETE
    try {
        const expectedTypes = ['number'];
        let params = [id_horario_doctor];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "DELETE FROM horario_doctor WHERE id_horario_doctor = ?";

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "horario_doctor", "id usuario");
            } else {
                funCallback(undefined, {
                    mensaje: `El horario_doctor ${id_horario_doctor} fue eliminado correctamente`,
                    detalle: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "horario_doctor", "id usuario");
    }
};

horario_doctor_db.getByIDU = function (id_usuario, funCallback) { //GET BY ID_usuario
    try {
        const expectedTypes = ['number'];
        let params = [id_usuario];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT id_horario_doctor FROM horario_doctor WHERE id_usuario = ?';

        connection.query(consulta, params, (err, result) => {
            if (err || result.length === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "usuario", "id_usuario");
            } else {
                funCallback(undefined, {
                    detail: result[0]
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "usuario", "id_usuario");
    }
};

horario_doctor_db.getByIDP = function (id_horario_doctor, funCallback) { //GET BY ID_usuario
    try {
        const expectedTypes = ['number'];
        let params = [id_horario_doctor];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT * FROM horario_doctor WHERE id_horario_doctor = ?';

        connection.query(consulta, params, (err, result) => {
            if (err || result.length === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "usuario", "id_usuario");
            } else {
                funCallback(undefined, {
                    detail: result[0]
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "usuario", "id_usuario");
    }
};

module.exports = horario_doctor_db;