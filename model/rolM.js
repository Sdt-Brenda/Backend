require('rootpath')();
const rol_db = {};

const mysql = require('mysql');
const config = require("config.json");
const funcionesAuxiliares = require("../funcionesAuxiliares");

//Conexión a la base de datos.
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La tabla 'rol', se encuentra disponible.")
    }
});

rol_db.getR = function (funCallback) { //GET
    try {
        let consulta = 'SELECT * FROM rol';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "rol", "id_rol");
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "rol", "id_rol");
    }
};

rol_db.create = function (rol, funCallback) { //POST
    try {
        const expectedTypes = ['string'];
        let params = [rol.nombre_rol];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'INSERT INTO rol (nombre_rol) VALUES (?)';

        connection.query(consulta, params, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "rol", "id_rol");
            } else {
                funCallback(undefined, {
                    message: `Se creó el rol ${rol.nombre_rol}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "rol", "id_rol");
    }
};

rol_db.update = function (id_rol, rol, funCallback) { //PUT
    try {
        const expectedTypes = ['string', 'number'];
        let params = [rol.nombre_rol, id_rol];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'UPDATE rol SET nombre_rol = ? WHERE id_rol = ?';

        connection.query(consulta, params, function (err, result) {
            if (err || result.affectedRows == 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "rol", "id_rol");
            } else {
                funCallback(undefined, {
                    message: `Se actualizó el rol ${rol.nombre_rol}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "rol", "id_rol");
    }
};

rol_db.delete = function (id_rol, funCallback) { // DELETE
    try {
        const expectedTypes = ['number'];
        let params = [id_rol];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "DELETE FROM rol WHERE id_rol = ?";

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "persona", "dni");
            } else {
                funCallback(undefined, {
                    mensaje: `El rol con id = ${id_rol} fue eliminado correctamente`,
                    detalle: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "persona", "dni");
    }
};


module.exports = rol_db;