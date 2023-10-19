require('rootpath')();
const paciente_db = {};

const mysql = require('mysql');
const config = require("config.json");
const funcionesAuxiliares = require("../funcionesAuxiliares");

//Conexión a la base de datos.
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La tabla 'paciente', se encuentra disponible.")
    }
});

paciente_db.getPa = function (funCallback) { //GET
    try {
        let consulta = 'SELECT * FROM paciente';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "paciente", "id_paciente");
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "paciente", "id_paciente");
    }
};

//AGREGADO
paciente_db.create = function (id_usuario, paciente, funCallback) { //POST
    try {
        const expectedTypes = ['string', 'string', 'string', 'string', 'string', 'text', 'text'];
        let params = [paciente.obra_social, paciente.pais, paciente.provincia, paciente.localidad, paciente.direccion, id_usuario];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'INSERT INTO paciente (obra_social, pais, provincia, localidad, direccion, id_usuario, id_rol) VALUES (?,?,?,?,?,?,3)';

        connection.query(consulta, params, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "paciente", "id usuario");
            } else {
                funCallback(undefined, {
                    message: `¡Registro exitoso! El paciente ya puede ingresar al sitio`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "paciente", "id usuario");
    }
};

//AGREGADO
paciente_db.update = function (id_paciente, paciente, funCallback) { //PUT
    try {
        const expectedTypes = ['string', 'string', 'string', 'string', 'string', 'text'];
        let params = [paciente.obra_social, paciente.pais, paciente.provincia, paciente.localidad, paciente.direccion, id_paciente];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'UPDATE paciente SET obra_social = ?, pais = ?, provincia = ?, localidad = ?, direccion = ? WHERE id_paciente = ?';

        connection.query(consulta, params, function (err, result) {
            if (err || result.affectedRows == 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "paciente", "id usuario");
            } else {
                funCallback(undefined, {
                    message: `Se actualizó la información del paciente ${paciente.id_paciente}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "paciente", "id usuario");
    }
};

paciente_db.delete = function (id_paciente, funCallback) { // DELETE
    try {
        const expectedTypes = ['number'];
        let params = [id_paciente];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "DELETE FROM paciente WHERE id_paciente = ?";

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "paciente", "id usuario");
            } else {
                funCallback(undefined, {
                    mensaje: `El paciente ${id_paciente} fue eliminado correctamente`,
                    detalle: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "paciente", "id usuario");
    }
};

//AGREGADO
paciente_db.getByIDU = function (id_usuario, funCallback) { //GET BY ID_usuario
    try {
        const expectedTypes = ['number'];
        let params = [id_usuario];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT id_paciente FROM paciente WHERE id_usuario = ?';

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

//AGREGADO
paciente_db.getByIDP = function (id_paciente, funCallback) { //GET BY ID_usuario
    try {
        const expectedTypes = ['number'];
        let params = [id_paciente];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT * FROM paciente WHERE id_paciente = ?';

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


//MARCOS
paciente_db.getByPID = function (id_usuario, funCallback) {
    try {
        const expectedTypes = ['text'];
        let params = [id_usuario];
        funcionesAuxiliares.validar(params, expectedTypes);


        let consulta = 'SELECT p.id_paciente FROM usuario u JOIN paciente p ON u.id_usuario = p.id_usuario WHERE u.id_usuario = ?';

        connection.query(consulta, id_usuario, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "paciente", "id_paciente");
            } else {
                funCallback(undefined, result);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "paciente", "id_paciente");
    }
};

module.exports = paciente_db;