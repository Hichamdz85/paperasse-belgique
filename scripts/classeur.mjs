// classeur.mjs
// -----------------------------------------------------------------------------
// Arborescence d'archivage des pièces comptables + assistant de classement.
//
// Trois modes (mutuellement exclusifs) :
//   --init [--dir=classeur] [--annee=2026]
//       Crée dir/annee/{achats,ventes,banque,fiscal,social,juridique}
//       + dir/LISEZMOI.md (taxonomie + convention de nommage + délais de
//         conservation) + dir/index.json (manifest vide). Idempotent.
//
//   --suggest "nom-fichier.pdf" --type=achat|vente|banque|fiscal|social|juridique
//       [--tiers=Nom] [--date=YYYY-MM-DD] [--montant=123.45]
//       AFFICHE (sans rien déplacer) le dossier cible + le nom canonique
//       proposé au format `YYYY-Qn_TYPE_tiers_montant.ext`.
//
//   --index [--dir=classeur]
//       Liste le contenu de dir/index.json.
//
// Choix techniques : ESM natif, Node >= 18, AUCUNE dépendance externe.
// Commentaires en français.
// -----------------------------------------------------------------------------

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, basename, extname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RACINE = join(__dirname, '..');

// Catégories de classement (= sous-dossiers par année). L'ordre est stable.
const CATEGORIES = ['achats', 'ventes', 'banque', 'fiscal', 'social', 'juridique'];

// Correspondance type (singulier, saisi par l'utilisateur) -> catégorie (dossier).
const TYPE_VERS_CATEGORIE = {
  achat: 'achats',
  vente: 'ventes',
  banque: 'banque',
  fiscal: 'fiscal',
  social: 'social',
  juridique: 'juridique',
};

// ---------------------------------------------------------------------------
// Lecture des arguments CLI. On gère les flags --x, --x=valeur, et le 1er
// argument positionnel (nom de fichier pour --suggest).
// ---------------------------------------------------------------------------
function lireArgs() {
  const argv = process.argv.slice(2);
  const args = { _positionnels: [] };
  for (const a of argv) {
    if (a.startsWith('--')) {
      const sansTirets = a.slice(2);
      const idx = sansTirets.indexOf('=');
      if (idx === -1) args[sansTirets] = true;
      else args[sansTirets.slice(0, idx)] = sansTirets.slice(idx + 1);
    } else {
      args._positionnels.push(a);
    }
  }
  return args;
}

// Résout le dossier racine du classeur (--dir relatif -> relatif au cwd,
// absolu -> tel quel ; défaut : <cwd>/classeur).
function resoudreDir(args) {
  const brut = typeof args.dir === 'string' ? args.dir : 'classeur';
  if (brut.startsWith('/')) return brut;
  return join(process.cwd(), brut);
}

// ---------------------------------------------------------------------------
// Outils de nommage canonique.
// ---------------------------------------------------------------------------

// Transforme un nom de tiers en slug ASCII minuscule (a-z0-9 + tirets).
function slug(s) {
  return String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // retire les accents (diacritiques)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    || 'tiers';
}

// Déduit le trimestre (Q1..Q4) à partir d'une date YYYY-MM-DD.
function trimestre(dateStr) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr || ''));
  if (!m) return null;
  const mois = Number(m[2]);
  if (mois < 1 || mois > 12) return null;
  return { annee: m[1], q: `Q${Math.floor((mois - 1) / 3) + 1}` };
}

// Formate un montant en entier+décimales jointes (123.45 -> 123-45).
function montantSlug(montant) {
  if (montant === undefined) return null;
  const n = Number(montant);
  if (!Number.isFinite(n)) return null;
  return n.toFixed(2).replace('.', '-');
}

// Construit le nom canonique : YYYY-Qn_TYPE_tiers[_montant].ext
function nomCanonique({ nomFichier, type, tiers, date, montant }) {
  const ext = extname(nomFichier) || '.pdf';
  const tr = trimestre(date);
  // Si pas de date valide : on retombe sur l'année courante + « Q0 » signalé.
  const prefixe = tr
    ? `${tr.annee}-${tr.q}`
    : `${new Date().getFullYear()}-Q0`;
  const parties = [prefixe, type.toUpperCase(), slug(tiers || 'tiers')];
  const ms = montantSlug(montant);
  if (ms !== null) parties.push(ms);
  return parties.join('_') + ext;
}

// ---------------------------------------------------------------------------
// Contenu du LISEZMOI.md (taxonomie + nommage + délais de conservation).
// Les délais renvoient aux sources officielles du registre data/sources.json.
// ---------------------------------------------------------------------------
function contenuLisezmoi(annee) {
  return `# Classeur — pièces comptables

> Arborescence d'archivage générée par paperasse-be (\`scripts/classeur.mjs\`).
> Aucune donnée réelle n'est incluse : ce dossier organise vos pièces.

## Taxonomie (sous-dossiers par année)

Chaque année (\`${annee}/\`, \`${Number(annee) + 1}/\`, …) contient :

| Dossier | Contenu |
|---|---|
| \`achats/\`    | Factures fournisseurs, notes de frais, achats de marchandises. |
| \`ventes/\`    | Factures clients émises, notes de crédit de vente. |
| \`banque/\`    | Extraits bancaires, relevés, preuves de paiement. |
| \`fiscal/\`    | Déclarations TVA, ISoc/Biztax, listings clients, avertissements-extraits de rôle. |
| \`social/\`    | Fiches de paie, ONSS, assurances-loi, documents du personnel. |
| \`juridique/\` | Statuts, PV d'AG, contrats, baux, actes notariés. |

## Convention de nommage

Renommez chaque pièce au format :

\`\`\`
YYYY-Qn_TYPE_tiers_montant.ext
\`\`\`

- \`YYYY-Qn\` : année + trimestre de la pièce (ex. \`2026-Q1\`).
- \`TYPE\`     : ACHAT | VENTE | BANQUE | FISCAL | SOCIAL | JURIDIQUE.
- \`tiers\`    : nom du tiers en slug minuscule (ex. \`resmed\`).
- \`montant\`  : montant TTC, point remplacé par un tiret (ex. \`1200-00\`). Facultatif.

Exemple : \`2026-Q1_ACHAT_resmed_1200-00.pdf\`

## Délais de conservation (Belgique)

- **10 ans** : livres et pièces comptables, documents TVA (à compter du
  1er janvier de l'année suivant la clôture). Voir registre des sources :
  \`compta-bnb-delais\`, \`fisc-tva-calendrier-2026\`.
- **7 ans** : certaines pièces comptables justificatives non directement
  liées à des opérations soumises à révision (à vérifier selon le cas).
  Voir \`compta-bnb-delais\`.

> Délais indicatifs : vérifiez la durée applicable à votre situation auprès
> de votre comptable et des sources officielles (SPF Finances, BNB).

## index.json

Le manifeste \`index.json\` (à la racine du classeur) liste les documents
classés. Il est créé vide par \`--init\` et peut être complété au fil de l'eau.
`;
}

// ---------------------------------------------------------------------------
// Mode --init : crée l'arborescence, le LISEZMOI et l'index (idempotent).
// ---------------------------------------------------------------------------
async function modeInit(args) {
  const dir = resoudreDir(args);
  const annee = String(args.annee || new Date().getFullYear());

  // Crée chaque sous-dossier de catégorie pour l'année donnée.
  for (const cat of CATEGORIES) {
    await mkdir(join(dir, annee, cat), { recursive: true });
  }

  // LISEZMOI.md : on (ré)écrit le fichier (idempotent, contenu stable).
  const cheminLisezmoi = join(dir, 'LISEZMOI.md');
  await writeFile(cheminLisezmoi, contenuLisezmoi(annee), 'utf8');

  // index.json : créé seulement s'il n'existe pas (préserve l'existant).
  const cheminIndex = join(dir, 'index.json');
  const indexExistait = existsSync(cheminIndex);
  if (!indexExistait) {
    const manifest = {
      meta: {
        description: "Manifeste du classeur paperasse-be (liste des pièces classées).",
        cree_le: new Date().toISOString().slice(0, 10),
        categories: CATEGORIES,
        convention_nommage: 'YYYY-Qn_TYPE_tiers_montant.ext',
      },
      documents: [],
    };
    await writeFile(cheminIndex, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  }

  console.log('Classeur initialisé (idempotent).');
  console.log(`  Racine : ${dir}`);
  console.log(`  Année : ${annee}`);
  console.log(`  Sous-dossiers : ${CATEGORIES.join(', ')}`);
  console.log(`  LISEZMOI : ${cheminLisezmoi}`);
  console.log(`  Manifeste : ${cheminIndex}${indexExistait ? ' (préservé)' : ' (créé)'}`);
}

// ---------------------------------------------------------------------------
// Mode --suggest : affiche le dossier cible + le nom canonique (sans déplacer).
// ---------------------------------------------------------------------------
function modeSuggest(args) {
  const nomFichier = args._positionnels[0];
  const type = typeof args.type === 'string' ? args.type.toLowerCase() : null;

  if (!nomFichier) {
    console.error('Erreur : nom de fichier manquant. Usage : --suggest "facture.pdf" --type=achat ...');
    process.exit(1);
  }
  const categorie = type ? TYPE_VERS_CATEGORIE[type] : null;
  if (!categorie) {
    console.error(`Erreur : --type invalide ("${type}"). Valeurs : ${Object.keys(TYPE_VERS_CATEGORIE).join(' | ')}.`);
    process.exit(1);
  }

  const dir = resoudreDir(args);
  // Année du dossier : déduite de la date si fournie, sinon année courante.
  const tr = trimestre(args.date);
  const annee = tr ? tr.annee : String(new Date().getFullYear());
  const dossierCible = join(dir, annee, categorie);
  const nomPropose = nomCanonique({
    nomFichier: basename(nomFichier),
    type,
    tiers: args.tiers,
    date: args.date,
    montant: args.montant,
  });

  console.log('Suggestion de classement (aucun fichier déplacé) :');
  console.log(`  Fichier source : ${nomFichier}`);
  console.log(`  Catégorie      : ${categorie}`);
  console.log(`  Dossier cible  : ${dossierCible}`);
  console.log(`  Nom canonique  : ${nomPropose}`);
  console.log(`  Chemin proposé : ${join(dossierCible, nomPropose)}`);
  if (!tr) {
    console.log('  Conseil : aucune --date valide (YYYY-MM-DD) fournie -> trimestre "Q0".');
    console.log('            Indiquez --date pour un préfixe YYYY-Qn correct.');
  }
  if (args.montant === undefined) {
    console.log('  Conseil : --montant non fourni -> nom sans montant. Ajoutez --montant=123.45 si utile.');
  }
}

// ---------------------------------------------------------------------------
// Mode --index : liste le contenu de index.json.
// ---------------------------------------------------------------------------
async function modeIndex(args) {
  const dir = resoudreDir(args);
  const cheminIndex = join(dir, 'index.json');
  if (!existsSync(cheminIndex)) {
    console.error(`Erreur : index introuvable (${cheminIndex}). Lancez d'abord --init.`);
    process.exit(1);
  }
  const manifest = JSON.parse(await readFile(cheminIndex, 'utf8'));
  const docs = Array.isArray(manifest.documents) ? manifest.documents : [];

  console.log(`Manifeste : ${cheminIndex}`);
  console.log(`  Créé le : ${manifest.meta?.cree_le || '?'}`);
  console.log(`  Convention : ${manifest.meta?.convention_nommage || '?'}`);
  console.log(`  Documents classés : ${docs.length}`);
  if (docs.length === 0) {
    console.log('  (Manifeste vide.)');
  } else {
    for (const d of docs) {
      console.log(`  - ${d.nom || '(sans nom)'}  [${d.categorie || '?'}]  ${d.date || ''}`);
    }
  }
}

// ---------------------------------------------------------------------------
// Programme principal : aiguillage selon le mode.
// ---------------------------------------------------------------------------
async function main() {
  const args = lireArgs();

  if (args.init) {
    await modeInit(args);
  } else if (args.suggest) {
    modeSuggest(args);
  } else if (args.index) {
    await modeIndex(args);
  } else {
    console.log('Usage :');
    console.log('  node scripts/classeur.mjs --init [--dir=classeur] [--annee=2026]');
    console.log('  node scripts/classeur.mjs --suggest "facture.pdf" --type=achat|vente|banque|fiscal|social|juridique [--tiers=Nom] [--date=YYYY-MM-DD] [--montant=123.45]');
    console.log('  node scripts/classeur.mjs --index [--dir=classeur]');
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('Erreur classeur :', err.message);
  process.exit(1);
});
