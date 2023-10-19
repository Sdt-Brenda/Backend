require('rootpath')();
const estudio_db = {};

const mysql = require('mysql');
const config = require("config.json");
const funcionesAuxiliares = require("../funcionesAuxiliares");

//Conexión a la base de datos.
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La tabla 'estudio', se encuentra disponible.")
    }
});

estudio_db.getE = function (funCallback) { //GET
    try {
        let consulta = 'SELECT * FROM estudio';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "estudio", "id_estudio");
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "estudio", "id_estudio");
    }
};

estudio_db.create = function (id_paciente, estudio, funCallback) { //POST
    try {
        const expectedTypes = ['number', 'object', 'text', 'text', 'string'];
        let params = [id_paciente, estudio.fecha, estudio.horario, estudio.valores_referencia, estudio.codigo];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'INSERT INTO estudio (id_paciente, fecha, horario, valores_referencia, codigo) VALUES (?,?,?,?,?)';

        connection.query(consulta, params, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "estudio", "id_estudio");
            } else {
                funCallback(undefined, {
                    message: `Se creó el estudio para el día ${estudio.fecha}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "estudio", "id_estudio");
    }
};

estudio_db.update = function (id_estudio, estudio, funCallback) { //PUT
    try {
        const expectedTypes = ['object', 'text', 'text', 'string', 'number', 'number'];
        let params = [estudio.fecha, estudio.horario, estudio.valores_referencia, estudio.codigo, id_estudio];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'UPDATE estudio SET  fecha = ?, horario = ?, valores_referencia = ?, codigo = ? WHERE id_estudio = ?';

        connection.query(consulta, params, function (err, result) {
            if (err || result.affectedRows == 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "estudio", "id_estudio");
            } else {
                funCallback(undefined, {
                    message: `Se actualizó el estudio ${estudio.fecha}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "estudio", "id_estudio");
    }
};

estudio_db.delete = function (id_estudio, funCallback) { // DELETE
    try {
        const expectedTypes = ['number'];
        let params = [id_estudio];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "DELETE FROM estudio WHERE id_estudio = ?";

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "estudio", "id_estudio");
            } else {
                funCallback(undefined, {
                    mensaje: `El estudio N° ${id_estudio} fue eliminado correctamente`,
                    detalle: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "estudio", "id_estudio");
    }
};

estudio_db.getByIDE = function (id_estudio, funCallback) { //GET BY ID_estudio
    try {
        const expectedTypes = ['number'];
        let params = [id_estudio];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT * FROM estudio WHERE id_estudio = ?';

        connection.query(consulta, params, (err, result) => {
            if (err || result.length === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "estudio", "id_estudio");
            } else {
                console.log(result)
                funCallback(undefined, result[0]);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "estudio", "id_estudio");
    }
};

estudio_db.getByIDP = function (id_paciente, funCallback) { //GET BY ID_PACIENTE
    try {
        const expectedTypes = ['number'];
        let params = [id_paciente];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT ce.nombre AS nombre, ce.codigo, e.valores_referencia, i.observaciones FROM estudio e INNER JOIN codigo_estudio ce ON e.codigo = ce.codigo LEFT JOIN informe i ON e.id_estudio = i.id_estudio WHERE e.id_paciente = ? ;';

        connection.query(consulta, params, (err, result) => {
            if (err || result.length === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "estudio", "id_estudio");
            } else {
                console.log(result);
                funCallback(undefined, result);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "estudio", "id_estudio");
    }
};

estudio_db.getByIH = function (codigo, funCallback) { //GET
    try {
        const expectedTypes = ['text'];
        let params = [codigo];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = `SELECT DISTINCT h.id_horario, h.horario FROM horario h JOIN horario_estudio he ON h.id_horario = he.id_horario WHERE he.codigo = ?;`;

        connection.query(consulta, params, function (err, result) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "estudio", "id_estudio");
            } else {
                console.log(result);
                funCallback(undefined, result);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "estudio", "id_estudio");
    }
};


module.exports = estudio_db;