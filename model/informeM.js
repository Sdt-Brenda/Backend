require('rootpath')();
const informe_db = {};

const mysql = require('mysql');
const config = require("config.json");
const funcionesAuxiliares = require("../funcionesAuxiliares");

//Conexión a la base de datos.
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La tabla 'informe', se encuentra disponible.")
    }
});

informe_db.getI = function (funCallback) { //GET
    try {
        let consulta = 'SELECT * FROM informe';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "informe", "id_informe");
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "informe", "id_informe");
    }
};

informe_db.create = function (id_estudio, informe, funCallback) { //POST
    try {
        const expectedTypes = ['text', 'text'];
        let params = [id_estudio, informe.observaciones];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'INSERT INTO informe (id_estudio, observaciones) VALUES (?,?)';

        connection.query(consulta, params, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "informe", "id_informe");
            } else {
                funCallback(undefined, {
                    message: `Se creó el informe para el estudio ${id_estudio}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "informe", "id_informe");
    }
};

informe_db.update = function (id_informe, informe, funCallback) { //PUT
    try {
        const expectedTypes = [ 'text', 'text'];
        let params = [ informe.observaciones, id_informe];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'UPDATE informe SET observaciones = ? WHERE id_informe = ?';

        connection.query(consulta, params, function (err, result) {
            if (err || result.affectedRows == 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "informe", "id_informe");
            } else {
                funCallback(undefined, {
                    message: `Se actualizó el informe ${id_informe}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "informe", "id_informe");
    }
};

informe_db.delete = function (id_informe, funCallback) { // DELETE
    try {
        const expectedTypes = ['number'];
        let params = [id_informe];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "DELETE FROM informe WHERE id_informe = ?";

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "informe", "id_informe");
            } else {
                funCallback(undefined, {
                    message: `Se elminó el informe ${id_informe}`,
                    detalle: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "informe", "id_informe");
    }
};


module.exports = informe_db;