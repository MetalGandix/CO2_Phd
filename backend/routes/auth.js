const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const router = express.Router();

const SECRET_KEY = 'your_secret_key';

// Register
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
    if (err) return res.status(500).send('Error creating user');
    res.status(201).send({ id: this.lastID });
  });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
    if (err || !user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, SECRET_KEY);
    res.send({ token });
  });
});

module.exports = router;
