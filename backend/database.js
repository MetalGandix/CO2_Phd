const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
  db.run('CREATE TABLE co2_data (id INTEGER PRIMARY KEY, user_id INTEGER, co2_amount REAL)');
});

module.exports = db;
