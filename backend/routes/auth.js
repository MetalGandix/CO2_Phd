const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const SECRET_KEY = 'co2secretkeyunimore';

// Configura il middleware di limitazione delle richieste
const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minuti
  max: 50, // Limita a 50 richieste per finestra temporale
  message: {
    error: 'Troppe registrazioni effettuate. Riprova tra 10 minuti.',
  },
});

// REGISTRAZIONE
router.post('/register', registerLimiter, (req, res) => {
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
    return res.status(400).json({ error: 'Email e password sono obbligatorie.' });
  }

  // Verifica se l'email è già registrata
  const checkEmailQuery = `SELECT email FROM users WHERE email = ?`;

  db.get(checkEmailQuery, [email], (err, row) => {
    if (err) {
      console.error('Errore durante la verifica dell\'email:', err.message);
      return res.status(500).json({ error: 'Errore interno del server.' });
    }

    if (row) {
      // Email già registrata
      return res.status(409).json({ error: 'L\'email è già registrata.' });
    }

    // Se l'email non è registrata, procedi con l'inserimento
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
          return res.status(500).json({ error: 'Errore durante la creazione dell\'utente.' });
        }
        res.status(201).json({ id: this.lastID, message: 'Registrazione completata con successo!' });
      }
    );
  });
});

// LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: 'Email and password are required.' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';

  db.get(query, [email], (err, user) => {
    if (err) {
      console.error('Errore durante il login:', err.message);
      return res.status(500).send({ error: 'Error during login' });
    }

    if (!user) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    // Confronta la password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    // Genera un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: '1h', // Token valido per 1 ora
    });

    // Rispondi con il token e l'ID utente
    res.send({
      token,
      userId: user.id,
      role: user.role, // Aggiungi il ruolo
      message: 'Login successful!',
    });
  });
});

module.exports = router;
