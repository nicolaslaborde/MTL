const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./formdata.db');

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'\"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '"': return '&quot;';
      case "'": return '&apos;';
    }
  });
}

db.all('SELECT * FROM activite ORDER BY date_debut ASC', [], (err, rows) => {
  if (err) throw err;
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<activites>\n';
  for (const a of rows) {
    xml += `  <activite id="${a.id}">\n`;
    xml += `    <titre>${escapeXml(a.titre || '')}</titre>\n`;
    xml += `    <type>${escapeXml(a.type || '')}</type>\n`;
    xml += `    <subtype>${escapeXml(a.subtype || '')}</subtype>\n`;
    xml += `    <date_debut>${escapeXml(a.date_debut || '')}</date_debut>\n`;
    xml += `    <date_fin>${escapeXml(a.date_fin || '')}</date_fin>\n`;
    xml += `    <lieu>${escapeXml(a.lieu || '')}</lieu>\n`;
    xml += `    <participants>${escapeXml(a.participants || '')}</participants>\n`;
    xml += `    <infos>${escapeXml(a.infos || '')}</infos>\n`;
    xml += `  </activite>\n`;
  }
  xml += '</activites>\n';
  fs.writeFileSync('export_activites.xml', xml, 'utf8');
  console.log('Fichier export_activites.xml généré.');
  db.close();
});
