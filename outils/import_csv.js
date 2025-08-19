const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../server/formdata.db'));
const csvPath = path.join(__dirname, '../outils/Classeur1.csv');

function parseDate(str) {
  // Retourne la date au format dd/mm/yyyy
  str = str.trim();
  if (/^\d{1,2}\/\d{1,2}\/\d{2,4}/.test(str)) {
    const [d, m, y] = str.split('/');
    return `${('0'+d).slice(-2)}/${('0'+m).slice(-2)}/${y.length === 2 ? '19'+y : y}`;
  }
  // Cas "Aout 1983" etc : on met au 01 du mois
  const mois = ['janv','fev','mar','avr','mai','juin','juil','aou','sep','oct','nov','dec'];
  const mois2 = ['jan','fév','mar','avr','mai','juin','juil','aoû','sep','oct','nov','déc'];
  let mIdx = -1;
  for(let i=0;i<mois.length;i++) if(str.toLowerCase().startsWith(mois[i])) mIdx = i;
  for(let i=0;i<mois2.length;i++) if(str.toLowerCase().startsWith(mois2[i])) mIdx = i;
  if(mIdx>=0) {
    const y = str.replace(/\D/g,'').slice(-4);
    return `01/${('0'+(mIdx+1)).slice(-2)}/${y}`;
  }
  return str;
}

fs.readFile(csvPath, 'utf8', (err, data) => {
  if (err) throw err;
  const lines = data.split(/\r?\n/).filter(l => l.trim());
  for (const line of lines) {
    const cols = line.split(';');
    if (cols.length < 2) continue;
    const date_debut = parseDate(cols[0]);
    const titre = (cols[1]||'').trim();
    const lieu = (cols[2]||'').trim();
    const infos = cols.slice(3).join(' ; ').trim();
    db.run(
      'INSERT INTO activite (titre, date_debut, date_fin, lieu, infos) VALUES (?, ?, ?, ?, ?)',
      [titre, date_debut, date_debut, lieu, infos],
      function(err) {
        if (err) console.error('Erreur ligne:', line, err.message);
      }
    );
  }
  console.log('Import terminé.');
  db.close();
});
