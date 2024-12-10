const sqlite3 = require('sqlite3').verbose();

// Cambia ':memory:' con il percorso del file per rendere il database persistente
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Errore durante l\'apertura del database:', err.message);
  } else {
    console.log('Connesso al database SQLite persistente.');
  }
});

db.serialize(() => {
  // Creazione della tabella users
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
      new_education TEXT
    )
  `);

  // Creazione della tabella co2_data
  db.run(`
    CREATE TABLE IF NOT EXISTS co2_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      co2_amount REAL NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);
});

module.exports = db;
