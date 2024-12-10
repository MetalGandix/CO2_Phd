const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const router = express.Router();

const SECRET_KEY = 'your_secret_key';

//REGISTRAZIONE
router.post('/register', (req, res) => {
  const {
    email,
    password,
    age,
    gender,
    residence,
    education,
    isStudying,
    newEducation,
  } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email, and password are required.');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = `
    INSERT INTO users (email, password, age, gender, residence, education, is_studying, new_education)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      email,
      hashedPassword,
      age || null,
      gender || null,
      residence || null,
      education || null,
      isStudying ? 1 : 0,
      newEducation || null,
    ],
    function (err) {
      if (err) {
        console.error('Errore durante l\'inserimento nel database:', err.message);
        return res.status(500).send('Error creating user');
      }
      res.status(201).send({ id: this.lastID });
    }
  );
});

//LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  const query = 'SELECT * FROM users WHERE email = ?';

  db.get(query, [email], (err, user) => {
    if (err) {
      console.error('Errore durante il login:', err.message);
      return res.status(500).send('Error during login');
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send('Invalid credentials');
    }

    // Genera un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h', // Token valido per 1 ora
    });

    res.send({ token, message: 'Login successful!' });
  });
});

module.exports = router;
