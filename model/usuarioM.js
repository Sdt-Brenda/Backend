require('rootpath')();
const usuario_db = {};
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
        console.log("La tabla 'usuario', se encuentra disponible.")
    }
});

usuario_db.getU = function (funCallback) { //GET
    try {
        let consulta = 'SELECT * FROM usuario';
        connection.query(consulta, function (err, rows) {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "usuario", "mail"); //Definir si vamos a seguir con mail o pasamos a DNI
            } else {
                funCallback(undefined, rows);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "usuario", "mail");
    }
};

usuario_db.create = function (usuario, funCallback) { //POST
    try {
        const expectedTypes = ['string', 'string', 'number', 'object', 'email', 'number', 'password', 'number'];
        let params = [usuario.nombre, usuario.apellido, usuario.dni, usuario.fecha_nacimiento, usuario.email, usuario.genero, usuario.password, usuario.rol];
        funcionesAuxiliares.validar(params, expectedTypes);
        let claveCifrada = bcrypt.hashSync(usuario.password, 10);
        params[6] = claveCifrada;


        let consulta = 'INSERT INTO usuario (nombre, apellido, dni, fecha_nacimiento, email, genero, password, rol) VALUES (?,?,?,?,?,?,?,?)';

        connection.query(consulta, params, (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "usuario", "email");
            } else {
                funCallback(undefined, {
                    message: `El email ${usuario.email}, se registró exitosamente`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "usuario", "email");
    }
};

usuario_db.update = function (id_usuario, usuario, funCallback) { //PUT
    try {
        const expectedTypes = ['string', 'string', 'number', 'object', 'email', 'number', 'password', 'number', 'number'];
        let params = [usuario.nombre, usuario.apellido, usuario.dni, usuario.fecha_nacimiento, usuario.email, usuario.genero, usuario.password, usuario.rol, id_usuario];
        funcionesAuxiliares.validar(params, expectedTypes);
        let claveCifrada = bcrypt.hashSync(usuario.password, 10);
        params[6] = claveCifrada;

        let consulta = 'UPDATE usuario SET nombre = ?, apellido = ?, dni = ?, fecha_nacimiento = ?, email = ?, genero = ?, password = ?, rol = ? WHERE id_usuario = ?';

        connection.query(consulta, params, function (err, result) {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "usuario", "mail");
            } else {
                funCallback(undefined, {
                    message: `Se actualizó la información del usuario con el email ${usuario.email}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "usuario", "mail");
    }
};

usuario_db.delete = function (id_usuario, funCallback) { //DELETE
    try {
        const expectedTypes = ['number'];
        let params = [id_usuario];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = "DELETE FROM usuario WHERE id_usuario = ?";

        connection.query(consulta, params, (err, result) => {
            if (err || result.affectedRows === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "usuario", "email");
            } else {
                funCallback(undefined, {
                    message: `Se eliminó el usuario con el id ${id_usuario}`,
                    detail: result
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "usuario", "email");
    }
};

usuario_db.getByID = function (id_usuario, funCallback) { //GET BY ID_USUARIO
    try {
        const expectedTypes = ['number'];
        let params = [id_usuario];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT * FROM usuario WHERE id_usuario = ?';

        connection.query(consulta, params, (err, result) => {
            if (err || result.length === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "usuario", "id_usuario");
            } else {
                funCallback(undefined, {
                    message: `La información del usuario con el id ${id_usuario} es:`,
                    detail: result[0]
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "usuario", "id_usuario");
    }
};

usuario_db.getByDNI = function (dni, funCallback) { //GET BY DNI
    try {
        const expectedTypes = ['number'];
        let params = [dni];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT * FROM usuario WHERE dni = ?';

        connection.query(consulta, params, (err, result) => {
            if (err || result.length === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "usuario", "dni");
            } else {
                funCallback(undefined, {
                    message: `Existe un usuario con dni ${dni}`,
                    detail: result[0]
                });
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "usuario", "DNI");
    }
};

usuario_db.getByEmail = function (email, funCallback) { //GET BY EMAIL
    try {
        const expectedTypes = ['email'];
        let params = [email];
        funcionesAuxiliares.validar(params, expectedTypes);

        let consulta = 'SELECT id_usuario FROM usuario WHERE email = ?';

        connection.query(consulta, params, (err, result) => {
            if (err || result.length === 0) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "usuario", "email");
            } else {
                funCallback(undefined, result[0].id_usuario);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "usuario", "email");
    }
};

//MARCOS
usuario_db.getByRol = function (rol, funCallback) {
    try {
        let consulta = "SELECT usuario.*, paciente.id_paciente FROM usuario JOIN paciente ON usuario.id_usuario = paciente.id_usuario WHERE usuario.rol = ?";

        connection.query(consulta, [rol], (err, result) => {
            if (err) {
                funcionesAuxiliares.errorGlobal(funCallback, err, result, "usuario", "rol");
            } else {
                funCallback(undefined, result);
            }
        });
    } catch (err) {
        funcionesAuxiliares.errorGlobal(funCallback, err, null, "usuario", "rol");
    }
};


module.exports = usuario_db;