// Script pour supprimer les entrées sans date_debut dans la table activite
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./formdata.db');

db.run("DELETE FROM activite WHERE date_debut IS NULL OR date_debut = ''", function(err) {
  if (err) {
    console.error('Erreur SQL:', err.message);
  } else {
    console.log(`Entrées supprimées : ${this.changes}`);
  }
  db.close();
});
