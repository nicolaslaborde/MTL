// Script pour compter le nombre d'entrées dans la table activite
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./formdata.db');

db.get("SELECT COUNT(*) as total FROM activite", (err, row) => {
  if (err) {
    console.error('Erreur SQL:', err.message);
  } else {
    console.log(`Nombre d'entrées dans activite : ${row.total}`);
  }
  db.close();
});
