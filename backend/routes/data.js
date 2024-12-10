const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../database');
const router = express.Router();

const SECRET_KEY = 'your_secret_key';

// Middleware to authenticate
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('No token provided');
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send('Failed to authenticate token');
    req.userId = decoded.id;
    next();
  });
};

// Save CO2 data
router.post('/co2', authenticate, (req, res) => {
  const { co2_amount } = req.body;
  db.run('INSERT INTO co2_data (user_id, co2_amount) VALUES (?, ?)', [req.userId, co2_amount], function(err) {
    if (err) return res.status(500).send('Error saving data');
    res.status(201).send({ id: this.lastID });
  });
});

// Fetch CO2 tips
router.get('/tips', (req, res) => {
  const tips = [
    'Use public transportation',
    'Reduce electricity consumption',
    'Switch to renewable energy',
  ];
  res.send(tips);
});

module.exports = router;
