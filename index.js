require('rootpath')();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

const config = require("config.json");
const cont_usuario = require("controller/usuarioC.js");
const cont_registro = require("controller/registroC.js");
const cont_rol = require("controller/rolC.js");
const cont_horario = require("controller/horarioC.js");
const cont_paciente = require("controller/pacienteC.js");
const cont_doctor = require("controller/doctorC.js");
const cont_turno_medico = require("controller/turno_medicoC.js");
const cont_codigo_estudio = require("controller/codigo_estudioC.js");
const cont_estudio = require("controller/estudioC.js");
const cont_historia_clinica = require("controller/historia_clinicaC.js");
const cont_informe = require("controller/informeC.js");
const cont_security = require("controller/securityC.js");
const cont_especialidad = require("controller/especialidadC.js");
const cont_horario_doctor = require("controller/horario_doctorC.js");


app.use('/api/horario_doctor', cont_horario_doctor);
app.use('/api/usuario', cont_usuario);
app.use('/api/registro', cont_registro);
app.use('/api/especialidad', cont_especialidad);
app.use('/api/rol', cont_rol);
app.use('/api/horario', cont_horario);
app.use('/api/paciente', cont_paciente);
app.use('/api/doctor', cont_doctor);
app.use('/api/turno_medico', cont_turno_medico);
app.use('/api/codigo_estudio', cont_codigo_estudio);
app.use('/api/estudio', cont_estudio);
app.use('/api/historia_clinica', cont_historia_clinica);
app.use('/api/informe', cont_informe);
app.use('/api/security', cont_security.app);

//Conexión al host.
app.listen(config.server.port, (err) => {
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
    } else {
        console.log(`Conectado exitosamente al puerto ${config.server.port}.`)
    }
});