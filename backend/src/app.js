const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const claseRoutes = require('./routes/clase.routes');
const reservaRoutes = require('./routes/reserva.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clases', claseRoutes);
app.use('/api/reservas', reservaRoutes);

app.get('/', (req, res) => {
    res.send('API Gimnasio funcionando');
});

module.exports = app;