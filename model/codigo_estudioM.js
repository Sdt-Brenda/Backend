require('rootpath')();
const codigo_estudio_db = {};

const mysql = require('mysql');
const config = require("config.json");
const funcionesAuxiliares = require("../funcionesAuxiliares");

//Conexión a la base de datos.
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La tabla 'codigo_estudio', se encuentra disponible.")
    }
});

codigo_estudio_db.getCE = function (funCallback) { //GET
    try {
        let consulta = 'SELECT * FROM codigo_estudio';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "codigo_estudio", "codigo");
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "codigo_estudio", "codigo");
    }
};

//AGREGADO
codigo_estudio_db.create = function (codigo_estudio, funCallback) { //POST
    try {
        const expectedTypes = ['string', 'string', 'string'];
        let params = [codigo_estudio.nombre, codigo_estudio.codigo, codigo_estudio.descripcion];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'INSERT INTO codigo_estudio (nombre, codigo, descripcion) VALUES (?,?,?)';

        connection.query(consulta, params, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "codigo_estudio", "codigo");
            } else {
                funCallback(undefined, {
                    message: `El estudio ${codigo_estudio.codigo} fue cargado exitosamente`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "codigo_estudio", "codigo");
    }
};

//AGREGADO
codigo_estudio_db.update = function (codigo, codigo_estudio, funCallback) { //PUT
    try {
        const expectedTypes = ['string', 'string', 'string'];
        let params = [codigo_estudio.nombre, codigo_estudio.descripcion, codigo];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'UPDATE codigo_estudio SET nombre = ?, descripcion = ? WHERE codigo = ?';

        connection.query(consulta, params, function (err, result) {
            if (err || result.affectedRows == 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "codigo_estudio", "codigo");
            } else {
                funCallback(undefined, {
                    message: `Se actualizó la descripcion del estudio ${codigo}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "codigo_estudio", "codigo");
    }
};

codigo_estudio_db.delete = function (codigo, funCallback) { // DELETE
    try {
        const expectedTypes = ['string'];
        let params = [codigo];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "DELETE FROM codigo_estudio WHERE codigo = ?";

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "codigo_estudio", "codigo");
            } else {
                funCallback(undefined, {
                    mensaje: `El estudio con el codigo ${codigo} fue eliminado correctamente`,
                    detalle: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "codigo_estudio", "codigo");
    }
};

//AGREGADO
codigo_estudio_db.getByCodigo = function (codigo, funCallback) { //GET BY CODIGO
    try {
        const expectedTypes = ['text'];
        let params = [codigo];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT * FROM codigo_estudio WHERE codigo = ?';

        connection.query(consulta, params, (err, result) => {
            if (err || result.length === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "codigo_estudio", "codigo");
            } else {
                funCallback(undefined, {
                    detail: result[0]
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "codigo_estudio", "codigo");
    }
};

//AGREGADO
codigo_estudio_db.getCN = function (funCallback) { //GET
    try {
        let consulta = 'SELECT nombre, codigo FROM codigo_estudio';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "codigo_estudio", "codigo");
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "codigo_estudio", "codigo");
    }
};

module.exports = codigo_estudio_db;