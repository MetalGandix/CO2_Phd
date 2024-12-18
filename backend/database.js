const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs'); // Importa bcrypt per l'hashing delle password
const dotenv = require('dotenv'); // Importa dotenv per leggere il file .env

dotenv.config(); // Carica le variabili d'ambiente dal file .env

const db = new sqlite3.Database('./database_co2.sqlite'); // Usa un file persistente

db.serialize(() => {
  // Crea la tabella users con il campo "role"
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      residence TEXT,
      education TEXT,
      is_studying BOOLEAN,
      new_education TEXT,
      role TEXT DEFAULT 'user' -- Ruolo: 'admin' o 'user'
    )
  `);

  // Crea la tabella co2_data
  db.run(`
    CREATE TABLE IF NOT EXISTS co2_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      co2_amount REAL NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Leggi le credenziali degli admin dal file .env
  const admin1Email = process.env.ADMIN1_EMAIL;
  const admin1Password = bcrypt.hashSync(process.env.ADMIN1_PASSWORD, 10);

  const admin2Email = process.env.ADMIN2_EMAIL;
  const admin2Password = bcrypt.hashSync(process.env.ADMIN2_PASSWORD, 10);

  // Inserisci due utenti super-admin di default
  db.run(`
    INSERT INTO users (email, password, role)
    VALUES 
    (?, ?, 'admin'),
    (?, ?, 'admin')
  `, [admin1Email, admin1Password, admin2Email, admin2Password], function (err) {
    if (err) {
      console.error('Errore durante l\'inserimento degli admin:', err.message);
    } else {
      console.log('Done!');
    }
  });
});

module.exports = db;
