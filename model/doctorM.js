require('rootpath')();
const doctor_db = {};

const mysql = require('mysql');
const config = require("config.json");
const funcionesAuxiliares = require("../funcionesAuxiliares");

//Conexión a la base de datos.
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La tabla 'doctor', se encuentra disponible.")
    }
});

doctor_db.getD = function (funCallback) { //GET
    try {
        let consulta = 'SELECT * FROM doctor';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "doctor", "id_doctor");
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "doctor", "id_doctor");
    }
};

doctor_db.create = function (id_usuario, doctor, funCallback) { //POST
    try {
        const expectedTypes = ['string', 'password', 'password']; // Parche
        let params = [doctor.especialidad, doctor.dias_trabaja, id_usuario];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'INSERT INTO doctor (especialidad, dias_trabaja, id_usuario, id_rol) VALUES (?,?,?,2)';

        connection.query(consulta, params, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "doctor", "id_doctor");
            } else {
                funCallback(undefined, {
                    message: `Se registró el/la doctor/a ${doctor.id_usuario}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "doctor", "id_doctor");
    }
};

doctor_db.update = function (id_doctor, doctor, funCallback) { //PUT
    try {
        const expectedTypes = ['text', 'password', 'text']; //PArche
        let params = [doctor.especialidad, doctor.dias_trabaja, id_doctor];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'UPDATE doctor SET especialidad = ?, dias_trabaja = ? WHERE id_doctor = ?';

        connection.query(consulta, params, function (err, result) {
            if (err || result.affectedRows == 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "doctor", "id_doctor");
            } else {
                funCallback(undefined, {
                    message: `Se actualizó el/la doctor/a ${doctor.id_usuario}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "doctor", "id_doctor");
    }
};

doctor_db.delete = function (id_doctor, funCallback) { // DELETE
    try {
        const expectedTypes = ['number'];
        let params = [id_doctor];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "DELETE FROM doctor WHERE id_doctor = ?";

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "doctor", "id_doctor");
            } else {
                funCallback(undefined, {
                    mensaje: `el/la doctor/a ${id_doctor} fue eliminad@ correctamente`,
                    detalle: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "doctor", "id_doctor");
    }
};

doctor_db.getByEspecialidad = function (especialidad, funCallback) { //GET BY ESPECIALIDAD
    try {
        const expectedTypes = ['string'];
        let params = [especialidad];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = `SELECT doctor.*, usuario.nombre, usuario.apellido FROM doctor
            INNER JOIN usuario ON doctor.id_usuario = usuario.id_usuario
            WHERE doctor.especialidad = ?`;

        connection.query(consulta, params, (err, result) => {
            if (err || result.length === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "doctor", "especialidad");
            } else {
                funCallback(undefined, result);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "doctor", "especialidad");
    }
};

doctor_db.getByIDD = function (id_doctor, funCallback) { // GET DAYS BY ID
    try {
        const expectedTypes = ['number'];
        let params = [id_doctor];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "SELECT dias_trabaja FROM doctor WHERE id_doctor = ?";

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

doctor_db.getByIDH = function (id_doctor, fecha, funCallback) {
    try {
        //const expectedTypes = ['number', 'string'];
        let params = [id_doctor, id_doctor, fecha, id_doctor];
        console.log(params);
        //funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = `SELECT DISTINCT hd.id_horario, h.horario
        FROM horario_doctor hd
        INNER JOIN horario h ON hd.id_horario = h.id_horario
        WHERE hd.id_doctor = ?
        AND hd.id_horario NOT IN (
            SELECT tm.horario
            FROM turno_medico tm
            WHERE tm.id_doctor = ?
            AND DATE(tm.fecha) = DATE(?)
        );`;

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "doctor", "id_doctor");
            } else {
                console.log(result);
                funCallback(undefined, result);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "doctor", "id_doctor");
    }
};

doctor_db.getByID = function (id_doctor, funCallback) { //GET BY ID_DOCTOR
    try {
        const expectedTypes = ['number'];
        let params = [id_doctor];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT * FROM doctor WHERE id_doctor = ?';

        connection.query(consulta, params, (err, result) => {
            if (err || result.length === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "doctor", "id_doctor");
            } else {
                funCallback(undefined, {
                    detail: result[0]
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "doctor", "id_doctor");
    }
};

doctor_db.getTEXT = function (id_usuario, funCallback) { //GET BY ID_USUARIO
    try {
        const expectedTypes = ['number'];
        let params = [id_usuario];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT id_doctor FROM doctor WHERE id_usuario = ?';

        connection.query(consulta, params, (err, result) => {
            if (err || result.length === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "doctor", "id_doctor");
            } else {
                console.log(result);
                funCallback(undefined, {
                    message: `TEST`,
                    detail: result
                });;
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "doctor", "id_doctor");
    }
};


//let consulta = `SELECT DISTINCT d.horario_trabaja FROM doctor AS d LEFT JOIN turno_medico AS t ON d.horario_trabaja = t.horario AND t.id_usuarioD = ? WHERE d.id_doctor = ? AND t.fecha IS NULL;`;
module.exports = doctor_db;