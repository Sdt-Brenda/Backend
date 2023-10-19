require('rootpath')();
const historia_clinica_db = {};

const mysql = require('mysql');
const config = require("config.json");
const funcionesAuxiliares = require("../funcionesAuxiliares");

//Conexión a la base de datos.
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La tabla 'historia_clinica', se encuentra disponible.")
    }
});

historia_clinica_db.getHC = function (funCallback) { //GET
    try {
        let consulta = 'SELECT * FROM historia_clinica';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "historia_clinica", "id_historia_clinica");
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "historia_clinica", "id_historia_clinica");
    }
};

//AGREGADA
historia_clinica_db.create = function (id_paciente, funCallback) { //POST
    try {
        const expectedTypes = ['text']; //Parche
        let params = [id_paciente];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'INSERT INTO historia_clinica (id_paciente) VALUES (?)';

        connection.query(consulta, params, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "historia_clinica", "id_paciente");
            } else {
                funCallback(undefined, {
                    message: `Se creó la historia clínica de la persona ${id_paciente}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "historia_clinica", "id_paciente");
    }
};

//AGREGADA
historia_clinica_db.update = function (id_historia_clinica, historia_clinica, funCallback) { //PUT
    try {
        const expectedTypes = ['number', 'number'];
        let params = [historia_clinica.id_paciente, id_historia_clinica];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'UPDATE historia_clinica SET id_paciente = ? WHERE id_historia_clinica = ?';

        connection.query(consulta, params, function (err, result) {
            if (err || result.affectedRows == 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "historia_clinica", "id_historia_clinica");
            } else {
                funCallback(undefined, {
                    message: `Se actualizó la historia clínica de la persona ${historia_clinica.id_paciente}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "historia_clinica", "id_historia_clinica");
    }
};

historia_clinica_db.delete = function (id_historia_clinica, funCallback) { // DELETE
    try {
        const expectedTypes = ['number'];
        let params = [id_historia_clinica];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "DELETE FROM historia_clinica WHERE id_historia_clinica = ?";

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "historia_clinica", "id_historia_clinica");
            } else {
                funCallback(undefined, {
                    message: `Se eliminó la historia clínica ${id_historia_clinica}`,
                    detalle: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "historia_clinica", "id_historia_clinica");
    }
};


//AGREGADA
historia_clinica_db.getByID = function (id_paciente, funCallback) { //GET BY ID_PACIENTE (PROBABLEMENTE NO HAGA FALTA)
    try {
        const expectedTypes = ['text'];
        let params = [id_paciente];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT id_historia_clinica FROM historia_clinica WHERE id_paciente = ?';

        connection.query(consulta, params, (err, result) => {
            if (err || result.length === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "usuario", "email");
            } else {
                funCallback(undefined, result[0].id_historia_clinica);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "usuario", "email");
    }
};


module.exports = historia_clinica_db;