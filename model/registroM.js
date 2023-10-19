require('rootpath')();
const registro_db = {};
const mysql = require('mysql');
const config = require("config.json");
const bcrypt = require('bcrypt');
const funcionesAuxiliares = require("../funcionesAuxiliares");

//Conexión a la base de datos.
const connection = mysql.createConnection(config.database);
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("La tabla 'registro', se encuentra disponible.")
    }
});

registro_db.create = function (registro, funCallback) { //POST
    try {
        const expectedTypes = ['string', 'string', 'text', 'object', 'email', 'text', 'password', 'text'];
        let params = [registro.nombre, registro.apellido, registro.dni, registro.fecha_nacimiento, registro.email, registro.genero, registro.password];
        funcionesAuxiliares.validar(params, expectedTypes);
        let claveCifrada = bcrypt.hashSync(registro.password, 10);
        params[6] = claveCifrada; 


        let consulta = 'INSERT INTO usuario (nombre, apellido, dni, fecha_nacimiento, email, genero, password, rol) VALUES (?,?,?,?,?,?,?,3)';

        connection.query(consulta, params, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "registro", "email");
            } else {
                funCallback(undefined, {
                    message: `El email ${registro.email}, se registró exitosamente`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "registro", "email");
    }
};


module.exports = registro_db;