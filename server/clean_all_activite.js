// Script pour supprimer toutes les entrées de la table activite
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./formdata.db');

db.run("DELETE FROM activite", function(err) {
  if (err) {
    console.error('Erreur SQL:', err.message);
  } else {
    console.log(`Toutes les entrées ont été supprimées (${this.changes})`);
  }
  db.close();
});
