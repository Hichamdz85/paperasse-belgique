// generate-statements.js
// -----------------------------------------------------------------------------
// Génère un BILAN (Actif / Passif) et un COMPTE DE RÉSULTATS (Produits / Charges)
// à partir d'un fichier de configuration entreprise (company.json, repli
// company.example.json) et d'un journal d'écritures JSON, selon la logique du
// schéma BNB (Banque Nationale de Belgique) et l'agrégation par classe PCMN.
//
// Choix techniques (cf. brief paperasse-be) :
//   - ESM natif, Node >= 18, AUCUNE dépendance externe (modules natifs seulement).
//   - Tous les libellés affichés sont résolus via glossaire-fr-nl.json par `cle`
//     (jamais de traduction ad hoc) selon la langue déduite de la région.
//   - Aucun chiffre fiscal en dur : tous les montants proviennent du journal.
//
// Correspondance classes PCMN -> états (RESEARCH.md §1.3) :
//   Classe 1 : Fonds propres, provisions, dettes > 1 an .... BILAN / Passif
//   Classe 2 : Immobilisations, créances > 1 an ............ BILAN / Actif
//   Classe 3 : Stocks et commandes en cours ................ BILAN / Actif
//   Classe 4 : Créances et dettes <= 1 an .................. BILAN / Actif si solde
//              débiteur, BILAN / Passif si solde créditeur (comptes mixtes).
//   Classe 5 : Placements de trésorerie, valeurs disponibles  BILAN / Actif
//   Classe 6 : Charges .................................... COMPTE DE RÉSULTATS / Charges
//   Classe 7 : Produits ................................... COMPTE DE RÉSULTATS / Produits
// (Classes 0, 8, 9 hors bilan / analytique : ignorées ici — cf. RESEARCH §8 #2.)
// -----------------------------------------------------------------------------

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Racine du projet = dossier parent de scripts/.
const __dirname = dirname(fileURLToPath(import.meta.url));
const RACINE = join(__dirname, '..');

// ---------------------------------------------------------------------------
// Chargement du glossaire (source de vérité UNIQUE pour la terminologie FR/NL).
// ---------------------------------------------------------------------------
async function chargerGlossaire() {
  const chemin = join(RACINE, 'glossaire-fr-nl.json');
  const data = JSON.parse(await readFile(chemin, 'utf8'));
  // Indexe les termes par `cle` pour une résolution O(1).
  const index = new Map();
  for (const terme of data.termes) index.set(terme.cle, terme);
  return index;
}

// Résout un libellé par sa `cle` dans la langue demandée.
// `langue` ∈ { 'fr', 'nl', 'fr-nl' }. Pour 'fr-nl' (Bruxelles) on affiche FR / NL.
function libelle(glossaire, cle, langue) {
  const terme = glossaire.get(cle);
  if (!terme) {
    // Pas de traduction ad hoc : si la clé manque, on le signale explicitement.
    return `[clé manquante: ${cle}]`;
  }
  if (langue === 'nl') return terme.nl;
  if (langue === 'fr-nl') return `${terme.fr} / ${terme.nl}`;
  return terme.fr; // défaut FR
}

// ---------------------------------------------------------------------------
// Chargement de la configuration entreprise (company.json sinon l'exemple).
// ---------------------------------------------------------------------------
async function chargerCompany() {
  const principal = join(RACINE, 'company.json');
  const repli = join(RACINE, 'company.example.json');
  const chemin = existsSync(principal) ? principal : repli;
  const data = JSON.parse(await readFile(chemin, 'utf8'));
  return { data, source: chemin };
}

// Déduit la langue d'affichage depuis la config (RESEARCH.md §9).
// Priorité au champ `langue` explicite, sinon dérivé de la `region`.
function deduireLangue(company) {
  if (company.langue) return company.langue;
  switch (company.region) {
    case 'flandre': return 'nl';
    case 'wallonie': return 'fr';
    case 'bruxelles': return 'fr-nl';
    default: return 'fr';
  }
}

// ---------------------------------------------------------------------------
// Chargement du journal d'écritures (argument CLI optionnel, sinon l'exemple).
// Schéma : { meta, ecritures:[{date, compte, libelle, debit, credit}] }
// ---------------------------------------------------------------------------
async function chargerJournal() {
  // 1er argument CLI après le nom du script = chemin du journal (optionnel).
  const argv = process.argv.slice(2);
  const cheminArg = argv.find((a) => !a.startsWith('--'));
  const chemin = cheminArg
    ? (cheminArg.startsWith('/') ? cheminArg : join(process.cwd(), cheminArg))
    : join(__dirname, 'journal.example.json');
  const data = JSON.parse(await readFile(chemin, 'utf8'));
  if (!Array.isArray(data.ecritures)) {
    throw new Error(`Journal invalide : champ 'ecritures' absent ou non-tableau (${chemin}).`);
  }
  return { data, source: chemin };
}

// ---------------------------------------------------------------------------
// Agrégation des écritures par compte puis par classe PCMN.
// Convention comptable : solde d'un compte = somme(débit) - somme(crédit).
//   - solde > 0 : nature débitrice (actif / charge)
//   - solde < 0 : nature créditrice (passif / produit)
// ---------------------------------------------------------------------------
function agreger(ecritures) {
  // Solde net par compte.
  const parCompte = new Map(); // compte -> { debit, credit, libelle }
  let totalDebit = 0;
  let totalCredit = 0;

  for (const e of ecritures) {
    const compte = String(e.compte);
    const debit = Number(e.debit) || 0;
    const credit = Number(e.credit) || 0;
    totalDebit += debit;
    totalCredit += credit;
    const acc = parCompte.get(compte) || { debit: 0, credit: 0, libelle: e.libelle };
    acc.debit += debit;
    acc.credit += credit;
    // On garde le premier libellé rencontré comme libellé du compte.
    if (!acc.libelle) acc.libelle = e.libelle;
    parCompte.set(compte, acc);
  }

  // Contrôle d'équilibre du journal (partie double).
  const equilibre = Math.abs(totalDebit - totalCredit) < 0.005;

  // Range chaque compte dans le bon poste d'état selon sa classe et son solde.
  const bilan = { actif: [], passif: [] };
  const resultat = { charges: [], produits: [] };

  for (const [compte, acc] of parCompte) {
    const classe = Number(compte[0]); // 1er chiffre = classe PCMN
    const solde = acc.debit - acc.credit; // > 0 débiteur, < 0 créditeur
    const ligne = { compte, libelle: acc.libelle, montant: Math.abs(solde), solde };

    if (classe === 6) {
      resultat.charges.push(ligne);
    } else if (classe === 7) {
      resultat.produits.push(ligne);
    } else if (classe === 2 || classe === 3 || classe === 5) {
      // Classes d'actif par nature.
      bilan.actif.push(ligne);
    } else if (classe === 1) {
      // Classe de passif par nature (fonds propres, dettes > 1 an).
      bilan.passif.push(ligne);
    } else if (classe === 4) {
      // Comptes mixtes : solde débiteur -> Actif, créditeur -> Passif.
      if (solde >= 0) bilan.actif.push(ligne);
      else bilan.passif.push(ligne);
    }
    // Classes 0, 8, 9 : ignorées (hors bilan / analytique).
  }

  // Totaux des postes.
  const sommeMontants = (arr) => arr.reduce((s, l) => s + l.montant, 0);
  const totalCharges = sommeMontants(resultat.charges);
  const totalProduits = sommeMontants(resultat.produits);
  // Résultat de l'exercice = Produits - Charges (positif = bénéfice).
  const resultatExercice = totalProduits - totalCharges;

  const totalActif = sommeMontants(bilan.actif);
  // Le résultat de l'exercice intègre les fonds propres au passif (classe 1).
  const totalPassifAvantResultat = sommeMontants(bilan.passif);
  const totalPassif = totalPassifAvantResultat + resultatExercice;

  return {
    bilan,
    resultat,
    totaux: {
      totalActif,
      totalPassifAvantResultat,
      totalPassif,
      totalCharges,
      totalProduits,
      resultatExercice,
      totalDebit,
      totalCredit,
      equilibre,
      // Le bilan est équilibré si Actif == Passif (résultat reporté inclus).
      bilanEquilibre: Math.abs(totalActif - totalPassif) < 0.005,
    },
  };
}

// ---------------------------------------------------------------------------
// Formatage des montants en EUR (style belge : espace insécable + virgule).
// ---------------------------------------------------------------------------
const fmt = new Intl.NumberFormat('fr-BE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
});
function euro(n) {
  return fmt.format(n);
}

// ---------------------------------------------------------------------------
// Rendu texte lisible des deux états (console + fichier de sortie).
// ---------------------------------------------------------------------------
function rendreEtats({ glossaire, langue, company, agrege }) {
  const L = (cle) => libelle(glossaire, cle, langue);
  const lignes = [];
  const sep = '='.repeat(72);
  const sub = '-'.repeat(72);

  lignes.push(sep);
  lignes.push(`${L('comptes_annuels')} — ${company.denomination || ''}`.trim());
  lignes.push(`BCE/KBO: ${company.bce || 'n/a'}   ${L('exercice_comptable')}: ${company.exercice?.debut || '?'} → ${company.exercice?.cloture || '?'}`);
  lignes.push(`Schéma: ${company.schema_comptes || 'n/a'}   Langue: ${langue}`);
  lignes.push(sep);
  lignes.push('');

  // --- BILAN ---
  lignes.push(`### ${L('bilan')}`);
  lignes.push('');
  lignes.push(`-- ${L('actif')} --`);
  for (const l of agrege.bilan.actif) {
    lignes.push(`  ${l.compte.padEnd(6)} ${String(l.libelle).padEnd(45)} ${euro(l.montant).padStart(16)}`);
  }
  lignes.push(sub);
  lignes.push(`  ${L('actif').toUpperCase().padEnd(52)} ${euro(agrege.totaux.totalActif).padStart(16)}`);
  lignes.push('');
  lignes.push(`-- ${L('passif')} --`);
  for (const l of agrege.bilan.passif) {
    lignes.push(`  ${l.compte.padEnd(6)} ${String(l.libelle).padEnd(45)} ${euro(l.montant).padStart(16)}`);
  }
  // Le résultat de l'exercice figure au passif (classe 1, fonds propres).
  lignes.push(`  ${'(R)'.padEnd(6)} ${L('resultat_exercice').padEnd(45)} ${euro(agrege.totaux.resultatExercice).padStart(16)}`);
  lignes.push(sub);
  lignes.push(`  ${L('passif').toUpperCase().padEnd(52)} ${euro(agrege.totaux.totalPassif).padStart(16)}`);
  lignes.push('');
  lignes.push(`  Équilibre Actif = Passif : ${agrege.totaux.bilanEquilibre ? 'OUI' : 'NON (déséquilibre — vérifier le journal)'}`);
  lignes.push('');

  // --- COMPTE DE RÉSULTATS ---
  lignes.push(`### ${L('compte_resultats')}`);
  lignes.push('');
  lignes.push(`-- ${L('produits')} --`);
  for (const l of agrege.resultat.produits) {
    lignes.push(`  ${l.compte.padEnd(6)} ${String(l.libelle).padEnd(45)} ${euro(l.montant).padStart(16)}`);
  }
  lignes.push(sub);
  lignes.push(`  ${L('produits').toUpperCase().padEnd(52)} ${euro(agrege.totaux.totalProduits).padStart(16)}`);
  lignes.push('');
  lignes.push(`-- ${L('charges')} --`);
  for (const l of agrege.resultat.charges) {
    lignes.push(`  ${l.compte.padEnd(6)} ${String(l.libelle).padEnd(45)} ${euro(l.montant).padStart(16)}`);
  }
  lignes.push(sub);
  lignes.push(`  ${L('charges').toUpperCase().padEnd(52)} ${euro(agrege.totaux.totalCharges).padStart(16)}`);
  lignes.push('');
  lignes.push(sub);
  lignes.push(`  ${L('resultat_exercice').toUpperCase().padEnd(52)} ${euro(agrege.totaux.resultatExercice).padStart(16)}`);
  const sens = agrege.totaux.resultatExercice >= 0 ? 'Bénéfice / Winst' : 'Perte / Verlies';
  lignes.push(`  (${sens})`);
  lignes.push('');

  // Contrôle d'équilibre du journal (partie double).
  if (!agrege.totaux.equilibre) {
    lignes.push('!! AVERTISSEMENT : journal non équilibré (somme débits ≠ somme crédits).');
    lignes.push(`   Débits=${euro(agrege.totaux.totalDebit)}  Crédits=${euro(agrege.totaux.totalCredit)}`);
    lignes.push('');
  }
  lignes.push(sep);
  return lignes.join('\n');
}

// ---------------------------------------------------------------------------
// Programme principal.
// ---------------------------------------------------------------------------
async function main() {
  const glossaire = await chargerGlossaire();
  const { data: company, source: srcCompany } = await chargerCompany();
  const { data: journal, source: srcJournal } = await chargerJournal();
  const langue = deduireLangue(company);

  const agrege = agreger(journal.ecritures);
  const texte = rendreEtats({ glossaire, langue, company, agrege });

  // Sortie console.
  console.log(texte);
  console.log(`\n(Config: ${srcCompany})`);
  console.log(`(Journal: ${srcJournal})`);

  // Écriture des fichiers de sortie : texte lisible + JSON structuré (réutilisé
  // par generate-pdfs.js).
  const dossierSortie = join(RACINE, 'output');
  await mkdir(dossierSortie, { recursive: true });

  const cheminTxt = join(dossierSortie, 'etats-financiers.txt');
  await writeFile(cheminTxt, texte, 'utf8');

  const cheminJson = join(dossierSortie, 'etats-financiers.json');
  const sortieJson = {
    meta: {
      denomination: company.denomination,
      bce: company.bce,
      exercice: company.exercice,
      schema: company.schema_comptes,
      langue,
      genere_le: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    },
    bilan: agrege.bilan,
    compte_resultats: agrege.resultat,
    totaux: agrege.totaux,
  };
  await writeFile(cheminJson, JSON.stringify(sortieJson, null, 2), 'utf8');

  console.log(`\nÉtats écrits : ${cheminTxt}`);
  console.log(`Données structurées : ${cheminJson}`);
}

main().catch((err) => {
  console.error('Erreur lors de la génération des états :', err.message);
  process.exit(1);
});
