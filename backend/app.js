const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/data', dataRoutes);

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
