// generate-pdfs.js
// -----------------------------------------------------------------------------
// Produit un document IMPRIMABLE des états financiers générés par
// generate-statements.js (lit output/etats-financiers.json).
//
// CHOIX TECHNIQUE — pourquoi pas un vrai PDF binaire :
//   Le brief impose Node >= 18 SANS aucune dépendance npm externe (pas de
//   pdfkit, puppeteer, etc.). Générer un PDF binaire conforme à la main serait
//   fragile et difficile à maintenir. On produit donc un HTML autonome (CSS
//   d'impression inclus, @media print + @page) que l'utilisateur ouvre dans un
//   navigateur puis « Imprimer > Enregistrer en PDF » (Ctrl/Cmd+P). Un fallback
//   texte est aussi écrit. Cette approche reste 100 % modules natifs, lisible,
//   et donne un rendu propre A4. Les libellés viennent du glossaire (par `cle`),
//   jamais de traduction ad hoc.
// -----------------------------------------------------------------------------

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RACINE = join(__dirname, '..');
const DOSSIER_SORTIE = join(RACINE, 'output');

// Charge le glossaire et l'indexe par `cle` (source de vérité FR/NL).
async function chargerGlossaire() {
  const data = JSON.parse(await readFile(join(RACINE, 'glossaire-fr-nl.json'), 'utf8'));
  const index = new Map();
  for (const t of data.termes) index.set(t.cle, t);
  return index;
}

// Résout un libellé par `cle` selon la langue ('fr' | 'nl' | 'fr-nl').
function libelle(glossaire, cle, langue) {
  const t = glossaire.get(cle);
  if (!t) return `[clé manquante: ${cle}]`;
  if (langue === 'nl') return t.nl;
  if (langue === 'fr-nl') return `${t.fr} / ${t.nl}`;
  return t.fr;
}

// Charge les états générés au préalable.
async function chargerEtats() {
  const chemin = join(DOSSIER_SORTIE, 'etats-financiers.json');
  if (!existsSync(chemin)) {
    throw new Error(
      `États introuvables : ${chemin}\n` +
      `Lancez d'abord : npm run statements (génère output/etats-financiers.json).`,
    );
  }
  return JSON.parse(await readFile(chemin, 'utf8'));
}

// Formatage EUR (Belgique).
const fmt = new Intl.NumberFormat('fr-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
const euro = (n) => fmt.format(n);

// Échappement HTML minimal (sécurité d'affichage des libellés).
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Génère les lignes <tr> d'un poste d'état.
function lignesTable(postes) {
  return postes
    .map(
      (l) =>
        `<tr><td class="compte">${esc(l.compte)}</td><td>${esc(l.libelle)}</td><td class="montant">${esc(euro(l.montant))}</td></tr>`,
    )
    .join('\n');
}

// Construit le document HTML autonome imprimable.
function construireHtml({ glossaire, etats }) {
  const langue = etats.meta.langue || 'fr';
  const L = (cle) => libelle(glossaire, cle, langue);
  const t = etats.totaux;
  const sens = t.resultatExercice >= 0 ? 'Bénéfice / Winst' : 'Perte / Verlies';
  // L'attribut lang du document : on retient 'fr' pour fr/fr-nl, 'nl' pour nl.
  const langDoc = langue === 'nl' ? 'nl' : 'fr';

  return `<!DOCTYPE html>
<html lang="${langDoc}">
<head>
<meta charset="utf-8">
<title>${esc(L('comptes_annuels'))} — ${esc(etats.meta.denomination || '')}</title>
<style>
  /* CSS d'impression : rendu A4 propre, noir sur blanc, sans dépendance. */
  :root { --gris: #555; --trait: #222; }
  * { box-sizing: border-box; }
  body { font-family: "Helvetica Neue", Arial, sans-serif; color: #111; margin: 0; padding: 24px; }
  h1 { font-size: 18px; margin: 0 0 4px; }
  h2 { font-size: 14px; margin: 24px 0 8px; border-bottom: 2px solid var(--trait); padding-bottom: 4px; }
  .entete { font-size: 12px; color: var(--gris); margin-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th, td { text-align: left; padding: 4px 6px; }
  td.compte { width: 60px; color: var(--gris); font-variant-numeric: tabular-nums; }
  td.montant, th.montant { text-align: right; font-variant-numeric: tabular-nums; white-space: nowrap; }
  tr.total td { border-top: 1px solid var(--trait); font-weight: 700; }
  tr.resultat td { border-top: 2px solid var(--trait); font-weight: 700; }
  .note { font-size: 11px; color: var(--gris); margin-top: 16px; }
  .alerte { color: #b00; font-weight: 700; }
  @page { size: A4; margin: 18mm; }
  @media print {
    body { padding: 0; }
    .no-print { display: none; }
    h2 { page-break-after: avoid; }
    tr { page-break-inside: avoid; }
  }
  .no-print { background: #f4f4f4; border: 1px solid #ddd; padding: 8px 12px; font-size: 12px; margin-bottom: 16px; }
</style>
</head>
<body>
<div class="no-print">Pour produire un PDF : ouvrez ce fichier dans un navigateur, puis Imprimer (Ctrl/Cmd+P) &gt; « Enregistrer en PDF ».</div>

<h1>${esc(L('comptes_annuels'))} — ${esc(etats.meta.denomination || '')}</h1>
<div class="entete">BCE/KBO : ${esc(etats.meta.bce || 'n/a')} &nbsp;·&nbsp; ${esc(L('exercice_comptable'))} : ${esc(etats.meta.exercice?.debut || '?')} → ${esc(etats.meta.exercice?.cloture || '?')}</div>
<div class="entete">Schéma : ${esc(etats.meta.schema || 'n/a')} &nbsp;·&nbsp; Langue : ${esc(langue)} &nbsp;·&nbsp; Généré le : ${esc(etats.meta.genere_le || '')}</div>

<h2>${esc(L('bilan'))}</h2>
<table>
  <thead><tr><th>Compte</th><th>${esc(L('actif'))}</th><th class="montant">EUR</th></tr></thead>
  <tbody>
    ${lignesTable(etats.bilan.actif)}
    <tr class="total"><td></td><td>${esc(L('actif').toUpperCase())}</td><td class="montant">${esc(euro(t.totalActif))}</td></tr>
  </tbody>
</table>
<table style="margin-top:12px;">
  <thead><tr><th>Compte</th><th>${esc(L('passif'))}</th><th class="montant">EUR</th></tr></thead>
  <tbody>
    ${lignesTable(etats.bilan.passif)}
    <tr><td class="compte">(R)</td><td>${esc(L('resultat_exercice'))}</td><td class="montant">${esc(euro(t.resultatExercice))}</td></tr>
    <tr class="total"><td></td><td>${esc(L('passif').toUpperCase())}</td><td class="montant">${esc(euro(t.totalPassif))}</td></tr>
  </tbody>
</table>
<div class="note">Équilibre Actif = Passif : ${t.bilanEquilibre ? 'OUI' : '<span class="alerte">NON — vérifier le journal</span>'}</div>

<h2>${esc(L('compte_resultats'))}</h2>
<table>
  <thead><tr><th>Compte</th><th>${esc(L('produits'))}</th><th class="montant">EUR</th></tr></thead>
  <tbody>
    ${lignesTable(etats.compte_resultats.produits)}
    <tr class="total"><td></td><td>${esc(L('produits').toUpperCase())}</td><td class="montant">${esc(euro(t.totalProduits))}</td></tr>
  </tbody>
</table>
<table style="margin-top:12px;">
  <thead><tr><th>Compte</th><th>${esc(L('charges'))}</th><th class="montant">EUR</th></tr></thead>
  <tbody>
    ${lignesTable(etats.compte_resultats.charges)}
    <tr class="total"><td></td><td>${esc(L('charges').toUpperCase())}</td><td class="montant">${esc(euro(t.totalCharges))}</td></tr>
    <tr class="resultat"><td></td><td>${esc(L('resultat_exercice').toUpperCase())} (${esc(sens)})</td><td class="montant">${esc(euro(t.resultatExercice))}</td></tr>
  </tbody>
</table>

${!t.equilibre ? '<div class="note alerte">AVERTISSEMENT : journal non équilibré (somme débits ≠ somme crédits).</div>' : ''}
<div class="note">Document généré par paperasse-be — valeurs issues du journal d'écritures. Aucun chiffre fiscal en dur.</div>
</body>
</html>
`;
}

// Fallback texte : on réutilise le .txt déjà produit par generate-statements,
// sinon on le reconstruit minimalement depuis le JSON.
async function ecrireFallbackTexte(etats, glossaire) {
  const cheminTxtSource = join(DOSSIER_SORTIE, 'etats-financiers.txt');
  if (existsSync(cheminTxtSource)) {
    // Déjà disponible ; rien à refaire (source unique).
    return cheminTxtSource;
  }
  const langue = etats.meta.langue || 'fr';
  const L = (cle) => libelle(glossaire, cle, langue);
  const lignes = [
    `${L('comptes_annuels')} — ${etats.meta.denomination || ''}`,
    `${L('bilan')} / ${L('compte_resultats')}`,
    `${L('resultat_exercice')}: ${euro(etats.totaux.resultatExercice)}`,
  ];
  const chemin = join(DOSSIER_SORTIE, 'etats-financiers.txt');
  await writeFile(chemin, lignes.join('\n'), 'utf8');
  return chemin;
}

async function main() {
  const glossaire = await chargerGlossaire();
  const etats = await chargerEtats();

  await mkdir(DOSSIER_SORTIE, { recursive: true });

  const html = construireHtml({ glossaire, etats });
  const cheminHtml = join(DOSSIER_SORTIE, 'etats-financiers.html');
  await writeFile(cheminHtml, html, 'utf8');

  const cheminTxt = await ecrireFallbackTexte(etats, glossaire);

  console.log('Document imprimable généré.');
  console.log(`HTML (à imprimer en PDF) : ${cheminHtml}`);
  console.log(`Fallback texte           : ${cheminTxt}`);
  console.log('Astuce : ouvrez le HTML dans un navigateur puis Ctrl/Cmd+P > Enregistrer en PDF.');
}

main().catch((err) => {
  console.error('Erreur lors de la génération du document imprimable :', err.message);
  process.exit(1);
});
