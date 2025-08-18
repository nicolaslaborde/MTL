
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Servir les fichiers statiques du dossier client
app.use(express.static(path.join(__dirname, '../client')));

app.use(cors());
app.use(bodyParser.json());

// Initialisation de la base de données
const db = new sqlite3.Database('./formdata.db', (err) => {
  if (err) {
    console.error('Erreur ouverture DB:', err.message);
  } else {
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
  }
});

// Route pour obtenir toutes les activités
app.get('/api/activites', (req, res) => {
  db.all('SELECT * FROM activite ORDER BY date_debut DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Route pour sauvegarder une activité
app.post('/api/activite', (req, res) => {
  const { titre, type, subtype, date_debut, date_fin, lieu, participants, infos } = req.body;
  db.run(
    'INSERT INTO activite (titre, type, subtype, date_debut, date_fin, lieu, participants, infos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [titre, type, subtype, date_debut, date_fin, lieu, participants, infos],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ success: true, id: this.lastID });
      }
    }
  );
});

// Route pour tester le serveur
app.get('/', (req, res) => {
  res.send('Serveur opérationnel');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
