// Script Node.js pour vérifier la cohérence de la base activite
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./formdata.db');

db.all('SELECT * FROM activite', [], (err, rows) => {
  if (err) {
    console.error('Erreur SQL:', err.message);
    db.close();
    return;
  }
  if (!rows.length) {
    console.log('Aucune entrée dans la table activite.');
    db.close();
    return;
  }
  let ok = true;
  rows.forEach((row, i) => {
    if (!row.titre || typeof row.titre !== 'string' || !row.titre.trim()) {
      console.log(`Entrée #${row.id} : titre manquant ou vide.`);
      console.log('  Donnée :', row);
      ok = false;
    }
    if (!row.date_debut || !/^\d{2}\/\d{2}\/\d{4}$/.test(row.date_debut)) {
      console.log(`Entrée #${row.id} : date_debut invalide ou manquante (${row.date_debut})`);
      console.log('  Donnée :', row);
      ok = false;
    }
    // Optionnel : vérifier type, subtype, etc.
  });
  if (ok) {
    console.log('Toutes les entrées sont cohérentes.');
  }
  db.close();
});
