const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../database');
const router = express.Router();

const SECRET_KEY = 'co2secretkeyunimore';

// Middleware to authenticate
const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  const query = `
    SELECT role 
    FROM users 
    WHERE id = ?
  `;

  db.get(query, [req.userId], (err, user) => {
    if (err) {
      console.error('Error checking role:', err.message);
      return res.status(500).send('Server error');
    }

    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    next();
  });
};

// Save CO2 data
router.post('/co2', authenticate, (req, res) => {
  const { co2_amount } = req.body;

  // Ottieni la data corrente senza il timestamp (solo yyyy-mm-dd)
  const currentDate = new Date().toISOString().split('T')[0];

  // Controlla se esiste già un valore di CO₂ per l'utente nello stesso giorno
  const checkQuery = `
    SELECT id 
    FROM co2_data
    WHERE user_id = ? AND date(date) = ?
  `;

  db.get(checkQuery, [req.userId, currentDate], (err, row) => {
    if (err) {
      console.error('Error checking existing CO2 data:', err.message);
      return res.status(500).send('Error checking data');
    }

    if (row) {
      return res.status(409).json({
        error: 'CO2 data for this user already exists for today.',
      });
    }

    const insertQuery = `
      INSERT INTO co2_data (user_id, co2_amount, date)
      VALUES (?, ?, ?)
    `;

    db.run(insertQuery, [req.userId, co2_amount, currentDate], function (err) {
      if (err) {
        console.error('Error saving CO2 data:', err.message);
        return res.status(500).send('Error saving data');
      }

      res.status(201).send({
        id: this.lastID,
        user_id: req.userId,
        co2_amount,
        date: currentDate,
      });
    });
  });
});

// Fetch all users (Admins only)
router.get('/users', authenticate, isAdmin, (req, res) => {
  const query = `
    SELECT id, email, age, gender, residence, education, is_studying, new_education, role
    FROM users
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).send('Error fetching users');
    }

    res.status(200).json(rows);
  });
});

// Fetch all CO2 data (Admins only)
router.get('/getAllco2', authenticate, isAdmin, (req, res) => {
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

    res.status(200).json(rows);
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

    res.status(200).json(rows);
  });
});

// Delete CO2 data by ID (Admins only)
router.delete('/co2/:id', authenticate, isAdmin, (req, res) => {
  const { id } = req.params;

  const query = `
    DELETE FROM co2_data
    WHERE id = ?
  `;

  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error deleting CO2 data:', err.message);
      return res.status(500).send('Error deleting CO2 data');
    }

    if (this.changes === 0) {
      return res.status(404).send('CO2 data not found');
    }

    res.status(200).send({ message: 'CO2 data deleted successfully' });
  });
});

// Delete user by ID (Admins only)
router.delete('/users/:id', authenticate, isAdmin, (req, res) => {
  const { id } = req.params;

  const query = `
    DELETE FROM users
    WHERE id = ?
  `;

  db.run(query, [id], function (err) {
    if (err) {
      console.error('Error deleting user:', err.message);
      return res.status(500).send('Error deleting user');
    }

    if (this.changes === 0) {
      return res.status(404).send('User not found');
    }

    res.status(200).send({ message: 'User deleted successfully' });
  });
});

module.exports = router;
