const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../database');
const router = express.Router();

const SECRET_KEY = 'co2secretkeyunimore';

// Middleware to authenticate
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided' }); // Risposta JSON
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' }); // Risposta JSON
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' }); // Risposta JSON
    }
    req.userId = decoded.id;
    next();
  });
};


// Save CO2 data
router.post('/co2', authenticate, (req, res) => {
  const { co2_amount } = req.body;

  // Ottieni la data corrente
  const currentDate = new Date().toISOString();

  // Inserimento nella tabella co2_data con data
  const query = `
    INSERT INTO co2_data (user_id, co2_amount, date)
    VALUES (?, ?, ?)
  `;
  db.run(query, [req.userId, co2_amount, currentDate], function (err) {
    if (err) {
      console.error('Error saving CO2 data:', err.message);
      return res.status(500).send('Error saving data');
    }

    // Rispondi con l'ID del record inserito e altre informazioni
    res.status(201).send({
      id: this.lastID,
      user_id: req.userId,
      co2_amount: co2_amount,
      date: currentDate,
    });
  });
});

// Fetch all users
router.get('/users', authenticate, (req, res) => {
  const query = `
    SELECT id, username, email, age, gender, residence, education, is_studying, new_education
    FROM users
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).send('Error fetching users');
    }

    res.status(200).json(rows); // Rispondi con i dati degli utenti
  });
});

// Fetch all CO2 data
router.get('/getAllco2', authenticate, (req, res) => {
  const query = `
    SELECT id, co2_amount, date, user_id
    FROM co2_data
    ORDER BY date DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching all CO2 data:', err.message);
      return res.status(500).send('Error fetching data');
    }

    res.status(200).json(rows); // Rispondi con tutti i dati in formato JSON
  });
});



// Fetch CO2 data for a specific user by user_id
router.get('/co2/:userId', authenticate, (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT id, co2_amount, date
    FROM co2_data
    WHERE user_id = ?
    ORDER BY date DESC
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error('Error fetching CO2 data for user:', err.message);
      return res.status(500).send('Error fetching data');
    }

    res.status(200).json(rows); // Rispondi con i dati di CO₂ per l'utente
  });
});


module.exports = router;
