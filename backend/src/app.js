const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const claseRoutes = require('./routes/clase.routes');
const reservaRoutes = require('./routes/reserva.routes');
const entrenadorRoutes = require('./routes/entrenador.routes');
const membresiaRoutes = require('./routes/membresia.routes');
const asistenciaRoutes = require('./routes/asistencia.routes');
const pagoRoutes = require('./routes/pago.routes');
const clienteRoutes = require('./routes/cliente.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clases', claseRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/entrenadores', entrenadorRoutes);
app.use('/api/membresias', membresiaRoutes);
app.use('/api/asistencias', asistenciaRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/clientes', clienteRoutes);

app.get('/', (req, res) => {
    res.send('API Gimnasio funcionando');
});

module.exports = app;