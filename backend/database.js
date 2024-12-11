const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database_co2.sqlite'); // Usa un file persistente

db.serialize(() => {
  // Crea la tabella users
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
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
});

module.exports = db;
