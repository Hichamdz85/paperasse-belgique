// check-sources.js
// -----------------------------------------------------------------------------
// Vérifie l'intégrité des registres de sources officielles belges.
//
// Parcourt :
//   - data/sources.json (registre central)
//   - le references/sources.json de chaque skill (comptable-be, notaire-be)
//     s'il existe (les dossiers de skills peuvent ne pas encore exister).
//
// Pour CHAQUE entrée, vérifie :
//   - `url` non vide
//   - `date_consultation` valide au format YYYY-MM-DD (date réelle)
//
// Liste séparément :
//   - les entrées `statut: "a_verifier"`
//   - les entrées dont la `valeur` contient « À VÉRIFIER »
//
// Code de sortie :
//   - 1 (échec) si une entrée `statut: "confirme"` n'a pas d'`url` ou de
//     `date_consultation` valide (règle de sourcing : un fait confirmé DOIT
//     être traçable). RESEARCH.md §RÈGLE DE SOURCING.
//   - 0 sinon.
//
// Choix techniques : ESM natif, Node >= 18, aucune dépendance externe.
// Commentaires en français.
// -----------------------------------------------------------------------------

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RACINE = join(__dirname, '..');

// Liste des fichiers de sources à contrôler. Les references/sources.json des
// skills sont optionnels (dossiers neufs possibles).
const FICHIERS = [
  join(RACINE, 'data', 'sources.json'),
  join(RACINE, 'comptable-be', 'references', 'sources.json'),
  join(RACINE, 'notaire-be', 'references', 'sources.json'),
  join(RACINE, 'asbl-be', 'references', 'sources.json'),
  join(RACINE, 'classeur-be', 'references', 'sources.json'),
  join(RACINE, 'independant-be', 'references', 'sources.json'),
];

// Valide un format de date YYYY-MM-DD ET la réalité de la date (ex. rejette
// 2026-13-40). On reconstruit la date et on compare les composantes.
function dateValide(s) {
  if (typeof s !== 'string') return false;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return false;
  const [, a, mo, j] = m;
  const d = new Date(`${s}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return false;
  return (
    d.getUTCFullYear() === Number(a) &&
    d.getUTCMonth() + 1 === Number(mo) &&
    d.getUTCDate() === Number(j)
  );
}

// Charge un fichier de sources s'il existe ; renvoie null sinon.
async function chargerSources(chemin) {
  if (!existsSync(chemin)) return null;
  try {
    return JSON.parse(await readFile(chemin, 'utf8'));
  } catch (err) {
    // JSON illisible = anomalie bloquante signalée à l'appelant.
    throw new Error(`Fichier de sources illisible (${chemin}) : ${err.message}`);
  }
}

async function main() {
  const rapport = [];
  rapport.push('='.repeat(72));
  rapport.push('CONTRÔLE DES SOURCES — paperasse-be');
  rapport.push('='.repeat(72));

  const aVerifier = []; // statut: a_verifier
  const mentionAVerifier = []; // valeur contient « À VÉRIFIER »
  const erreurs = []; // entrées 'confirme' sans url/date valide -> bloquant
  const anomaliesNonBloquantes = []; // entrées a_verifier sans url/date (signalées)

  let totalEntrees = 0;
  let totalFichiers = 0;

  for (const chemin of FICHIERS) {
    const data = await chargerSources(chemin);
    if (data === null) {
      rapport.push(`\n[ignoré] ${chemin} — fichier inexistant (skill non encore créé).`);
      continue;
    }
    totalFichiers += 1;
    const sources = Array.isArray(data.sources) ? data.sources : [];
    rapport.push(`\n[lu] ${chemin} — ${sources.length} entrée(s).`);

    for (const s of sources) {
      totalEntrees += 1;
      const id = s.id || '(sans id)';
      const urlOk = typeof s.url === 'string' && s.url.trim() !== '';
      const dateOk = dateValide(s.date_consultation);
      const statut = s.statut;

      // Classement des entrées à vérifier.
      if (statut === 'a_verifier') {
        aVerifier.push({ chemin, id, sujet: s.sujet });
      }
      if (typeof s.valeur === 'string' && s.valeur.includes('À VÉRIFIER')) {
        mentionAVerifier.push({ chemin, id, valeur: s.valeur });
      }

      // Contrôle url + date.
      if (!urlOk || !dateOk) {
        const manques = [];
        if (!urlOk) manques.push('url manquante/vide');
        if (!dateOk) manques.push(`date_consultation invalide ("${s.date_consultation}")`);
        const detail = { chemin, id, statut, manques: manques.join(', ') };
        if (statut === 'confirme') {
          // Un fait confirmé sans traçabilité = erreur bloquante.
          erreurs.push(detail);
        } else {
          // a_verifier (ou autre) : anomalie signalée, non bloquante.
          anomaliesNonBloquantes.push(detail);
        }
      }
    }
  }

  // --- Section : entrées statut a_verifier ---
  rapport.push('\n' + '-'.repeat(72));
  rapport.push(`ENTRÉES « a_verifier » (${aVerifier.length}) — exclues de tout calcul :`);
  for (const e of aVerifier) {
    rapport.push(`  - ${e.id} : ${e.sujet || ''}`);
  }

  // --- Section : valeurs contenant « À VÉRIFIER » ---
  rapport.push('\n' + '-'.repeat(72));
  rapport.push(`VALEURS marquées « À VÉRIFIER » (${mentionAVerifier.length}) :`);
  for (const e of mentionAVerifier) {
    rapport.push(`  - ${e.id} : ${e.valeur}`);
  }

  // --- Section : anomalies non bloquantes (entrées non confirmées) ---
  if (anomaliesNonBloquantes.length > 0) {
    rapport.push('\n' + '-'.repeat(72));
    rapport.push(`ANOMALIES NON BLOQUANTES (${anomaliesNonBloquantes.length}) — entrées non « confirme » :`);
    for (const e of anomaliesNonBloquantes) {
      rapport.push(`  - ${e.id} [${e.statut}] : ${e.manques}`);
    }
  }

  // --- Section : erreurs bloquantes ---
  rapport.push('\n' + '='.repeat(72));
  if (erreurs.length > 0) {
    rapport.push(`ÉCHEC — ${erreurs.length} entrée(s) « confirme » sans url/date valide :`);
    for (const e of erreurs) {
      rapport.push(`  ✗ ${e.id} (${e.chemin}) : ${e.manques}`);
    }
  } else {
    rapport.push('OK — toutes les entrées « confirme » ont une url et une date_consultation valides.');
  }
  rapport.push('-'.repeat(72));
  rapport.push(`Bilan : ${totalEntrees} entrée(s) sur ${totalFichiers} fichier(s) ; ${erreurs.length} erreur(s) bloquante(s).`);
  rapport.push('='.repeat(72));

  console.log(rapport.join('\n'));

  // Code de sortie non nul si au moins une entrée confirmée manque url/date.
  process.exit(erreurs.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Erreur lors du contrôle des sources :', err.message);
  process.exit(2);
});
