// Script Node.js pour insérer les anniversaires de Nicolas Labore dans la base SQLite
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./formdata.db');

const prenom = 'Nicolas Laborde';
const type = 'evenement';
const subtype = 'anniversaire';
const lieu = '';
const participants = '';
const infos = '';

function pad(n) { return n < 10 ? '0' + n : n; }

const startYear = 1961;
const endYear = 2024;

function insertAnniversaires() {
  db.serialize(() => {
    for (let year = startYear; year <= endYear; year++) {
      const age = year - 1961;
      const titre = `Anniverssaire Nicolas Laborde ${age} ans`;
      const date = `${year}-11-01`;
      db.run(
        'INSERT INTO activite (titre, type, subtype, date_debut, date_fin, lieu, participants, infos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [titre, type, subtype, date, date, lieu, participants, infos],
        function(err) {
          if (err) {
            console.error('Erreur:', err.message);
          }
        }
      );
    }
  });
}

insertAnniversaires();
db.close();
