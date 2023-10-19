function validar(params, expectedTypes) {
    for (let i = 0; i < params.length; i++) {
        const expectedType = expectedTypes[i];
        const actualType = typeof params[i];
        const errorObject = {
            message: `El tipo de dato ingresado en la posición ${i + 1} es incorrecto. Se esperaba: ${expectedType} pero se recibió: ${actualType}`,
            code: "INVALID_DATA_TYPE"
        };
        //ver como puedo acceder al contenido del string cuando viene '', y forzarlo a ser expectedType == actualType.
        if (expectedType === 'number') {
            const inputStr = params[i].toString();
            for (let j = 0; j < inputStr.length; j++) {
                if (isNaN(inputStr[j])) {
                    throw errorObject;
                }
            }
            params[i] = parseInt(params[i]);

        } else if (expectedType === 'string') { //nombre, apellido, especialidad, obra social y código*.
            const allowedCharacters = /^[a-zA-ZáÁéÉíÍóÓúÚüÜñÑçÇ\s]+/;
            if (!allowedCharacters.test(params[i])) {
                throw errorObject;
            }
        } else if (expectedType === 'password') { //password.
            const allowedCharacters = /^[a-zA-Z0-9áÁéÉíÍóÓúÚüÜñÑçÇ\s\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+/;
            if (!allowedCharacters.test(params[i])) {
                throw errorObject;
            }
        } else if (expectedType === 'text') { //observaciones y descripción.
            const allowedCharacters = /^[\x20-\x7EáÁéÉíÍóÓúÚüÜñÑçÇ,.;:\-_{}[\]¿?¡#!<>"'| /&%$@`]+$/;
            if (!allowedCharacters.test(params[i])) {
                throw errorObject;
            }
        } else if (expectedType === 'email') {
            const allowedCharacters = /^[A-Za-z0-9._%-ñÑҫÇç]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
            if (!allowedCharacters.test(params[i])) {
                throw errorObject;
            }
        } else if (expectedType === 'object') {
            const date = new Date(params[i]);
            if (!isNaN(date.getTime())) {
                params[i] = date.toISOString(); //Convierto a Coordinated Universal Time (UTC).
            } else {
                throw errorObject;
            }
        } else if (expectedType !== actualType) {
            throw errorObject;
        }
    }
};

function errorGlobal(callback, err, result, entidad, id) {
    console.log("Error:", err);
    if (err) {
        if (err.code === "ER_DUP_ENTRY" && err.sqlMessage.includes('unique_persona')) {
            callback({
                status: 409,
                message: "La persona seleccionada ya dispone de un usuario",
                detail: err
            });
        } else if (err.code === "ER_DUP_ENTRY") {
            callback({
                status: 409,
                message: `Ya hay una ${entidad} registrad@ con ese ${id}`,
                detail: err
            });
        } else if (err.code === "ER_NO_REFERENCED_ROW_2"/* && entidad === "usuario"*/) {
            callback({
                status: 422,
                message: "El dni ingresado no corresponde a ninguna persona en la base de datos",
                detail: err
            });
        } else if (err.code === "ER_ROW_IS_REFERENCED_2") {
            callback({
                status: 409,
                message: `No se puede eliminar est@ ${entidad}, debido a uno o más conflictos de referencia.`,
                detail: err
            });
        } else if (err.code === "INVALID_DATA_TYPE") {
            callback({
                status: 400,
                message: err.message,
                detail: err
            });
        } else if (err.code === "ER_BAD_FIELD_ERROR") {
            callback({
                status: 400,
                message: "El tipo de dato ingresado no es correcto",
                detail: err
            });
        } else {
            callback({
                status: 500,
                message: "Error desconocido",
                detail: err
            });
        }
    } else if ((result && result.affectedRows === 0) || (result && result.length === 0)) {
        callback({
            status: 404,
            message: `No existé ${entidad} registrad@ con el criterio de búsqueda ingresado`,
            detail: err
        });
        /*} else if (entidad === "persona" && !result[0].nickname) {
            callback({
                status: 422,
                message: `La persona no posee un usuario registrado en la base de datos.`,
                detail: err
            });*/ //Probablemente este bloque termine siendo eliminado
    } else {
        callback({
            status: 500,
            message: "Comportamiento desconocido",
            detail: err
        });
    }
};

/* Version alternativa donde Uso un switch
function errorGlobal(callback, err, result, entidad, id) {
    if (err) {
        switch (err.code) {
            case "ER_DUP_ENTRY":
                if (err.sqlMessage.includes('unique_persona')) {
                    callback({
                        status: 409,
                        mensaje: "La persona seleccionada ya dispone de un usuario",
                        detail: err
                    });
                } else {
                    callback({
                        status: 409,
                        mensaje: `Ya hay una ${entidad} registrad@ con ese ${id}`,
                        detail: err
                    });
                }
                break;
            case "ER_NO_REFERENCED_ROW_2":
                if (entidad === "usuario") {
                    callback({
                        status: 422,
                        mensaje: "El dni ingresado no corresponde a ninguna persona en la base de datos",
                        detail: err
                    });
                }
                break;
            case "ER_ROW_IS_REFERENCED_2":
                callback({
                    status: 409,
                    mensaje: `No se puede eliminar esta persona, debido a que poseé una cuenta de usuario activa.`,
                    detail: err
                });
                break;
            case "INVALID_DATA_TYPE":
                callback({
                    status: 400,
                    mensaje: err.message,
                    detail: err
                });
                break;
            case "ER_BAD_FIELD_ERROR":
                callback({
                    status: 400,
                    mensaje: "El tipo de dato ingresado no es correcto",
                    detail: err
                });
                break;
            default:
                callback({
                    status: 500,
                    mensaje: "Error desconocido",
                    detail: err
                });
        }
    } else if (result) {
        if (result.affectedRows === 0 || result.length === 0) {
            callback({
                status: 404,
                mensaje: `No existé ${entidad} registrad@ con el criterio de búsqueda ingresado`,
                detail: err
            });
        } else if (entidad === "persona" && !result[0].nickname) {
            callback({
                status: 422,
                mensaje: `La persona no posee un usuario registrado en la base de datos.`,
                detail: err
            });
        } else {
            callback({
                status: 500,
                mensaje: "Comportamiento desconocido",
                detail: err
            });
        }
    }
}
*/


module.exports = {
    validar: validar,
    errorGlobal: errorGlobal
};