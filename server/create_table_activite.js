// Script pour créer la table activite si elle n'existe pas
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./formdata.db');

db.run(`CREATE TABLE IF NOT EXISTS activite (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titre TEXT,
  type TEXT,
  subtype TEXT,
  date_debut TEXT,
  date_fin TEXT,
  lieu TEXT,
  participants TEXT,
  infos TEXT
)`);

db.close();
