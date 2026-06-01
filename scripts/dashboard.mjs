// dashboard.mjs
// -----------------------------------------------------------------------------
// Tableau de bord HTML autonome (régénéré à la demande : `npm run dashboard`).
//
// Lit la configuration entreprise (company.json, repli company.example.json)
// et le journal d'écritures (scripts/journal.example.json, même schéma que
// generate-statements.js) et produit output/dashboard.html.
//
// Principes :
//   - ESM natif, Node >= 18, AUCUNE dépendance externe.
//   - On n'affiche QUE des KPIs réellement calculables depuis le journal
//     (produits = classe 7, charges = classe 6, résultat, nb d'écritures,
//     période). Tout KPI non dérivable (ex. « TVA à payer ») est marqué
//     honnêtement « non calculé ».
//   - La section « Prochaines échéances » réutilise computeEcheances() exporté
//     par echeancier.mjs (source unique de la logique d'échéancier).
//   - Styles inline, palette belge (noir #1A1A1A / jaune #FFD100 / rouge
//     #EF3340, fond clair). Pas de JS lourd côté page.
// -----------------------------------------------------------------------------

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Réutilisation de la logique d'échéancier (source unique).
import {
  computeEcheances,
  afficherLabel,
  deduireLangue,
  NOTE_HONNETETE,
} from './echeancier.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RACINE = join(__dirname, '..');

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

// ---------------------------------------------------------------------------
// Chargement du journal d'écritures (scripts/journal.example.json).
// Schéma : { meta, ecritures:[{date, compte, libelle, debit, credit}] }
// ---------------------------------------------------------------------------
async function chargerJournal() {
  const chemin = join(__dirname, 'journal.example.json');
  const data = JSON.parse(await readFile(chemin, 'utf8'));
  if (!Array.isArray(data.ecritures)) {
    throw new Error(`Journal invalide : champ 'ecritures' absent (${chemin}).`);
  }
  return { data, source: chemin };
}

// ---------------------------------------------------------------------------
// Calcul des KPIs RÉELLEMENT dérivables du journal.
//   - totalProduits : somme des soldes créditeurs des comptes classe 7
//   - totalCharges  : somme des soldes débiteurs des comptes classe 6
//   - resultat      : produits - charges
//   - nbEcritures   : nombre de lignes du journal
//   - periode       : min/max des dates rencontrées
// ---------------------------------------------------------------------------
function calculerKpis(ecritures) {
  let totalProduits = 0;
  let totalCharges = 0;
  let dateMin = null;
  let dateMax = null;

  for (const e of ecritures) {
    const compte = String(e.compte);
    const classe = Number(compte[0]); // 1er chiffre = classe PCMN
    const debit = Number(e.debit) || 0;
    const credit = Number(e.credit) || 0;

    if (classe === 7) {
      // Produits : nature créditrice -> crédit - débit.
      totalProduits += credit - debit;
    } else if (classe === 6) {
      // Charges : nature débitrice -> débit - crédit.
      totalCharges += debit - credit;
    }

    if (typeof e.date === 'string') {
      if (dateMin === null || e.date < dateMin) dateMin = e.date;
      if (dateMax === null || e.date > dateMax) dateMax = e.date;
    }
  }

  return {
    totalProduits,
    totalCharges,
    resultat: totalProduits - totalCharges,
    nbEcritures: ecritures.length,
    periode: { debut: dateMin, fin: dateMax },
  };
}

// Formatage EUR (style belge).
const fmt = new Intl.NumberFormat('fr-BE', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
});
function euro(n) {
  return fmt.format(n);
}

// Échappement HTML minimal (pas de dépendance).
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Libellés bilingues du tableau de bord (fr-nl -> « FR / NL »).
function bi(langue, fr, nl) {
  if (langue === 'nl') return nl;
  if (langue === 'fr-nl') return `${fr} / ${nl}`;
  return fr;
}

// ---------------------------------------------------------------------------
// Construction du document HTML autonome.
// ---------------------------------------------------------------------------
function rendreHtml({ company, langue, kpis, echeances, genereLe }) {
  // Palette belge.
  const NOIR = '#1A1A1A';
  const JAUNE = '#FFD100';
  const ROUGE = '#EF3340';
  const FOND = '#F7F7F5';
  const CARTE = '#FFFFFF';

  const resultatPositif = kpis.resultat >= 0;
  const couleurResultat = resultatPositif ? NOIR : ROUGE;
  const sensResultat = resultatPositif
    ? bi(langue, 'Bénéfice', 'Winst')
    : bi(langue, 'Perte', 'Verlies');

  // Cartes KPI.
  const carte = (titre, valeur, couleur = NOIR) => `
      <div style="background:${CARTE};border:1px solid #E5E5E0;border-top:4px solid ${JAUNE};border-radius:8px;padding:18px 20px;">
        <div style="font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:#777;">${esc(titre)}</div>
        <div style="font-size:24px;font-weight:700;color:${couleur};margin-top:6px;">${esc(valeur)}</div>
      </div>`;

  const periodeTexte = (kpis.periode.debut && kpis.periode.fin)
    ? `${kpis.periode.debut} → ${kpis.periode.fin}`
    : bi(langue, 'non calculé', 'niet berekend');

  // Section échéances.
  const lignesEcheances = echeances.length
    ? echeances.map((e) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #EEE;white-space:nowrap;font-variant-numeric:tabular-nums;">${esc(e.date)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #EEE;">${esc(afficherLabel(e, langue))}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #EEE;color:#888;font-size:12px;">${esc(e.source_id)}</td>
        </tr>`).join('')
    : `<tr><td colspan="3" style="padding:12px;color:#888;">${esc(bi(langue, 'Aucune échéance sur l\'horizon.', 'Geen vervaldagen in de horizon.'))}</td></tr>`;

  // KPI explicitement « non calculé » (honnêteté : non dérivable du journal seul).
  const nonCalcule = bi(langue, 'non calculé', 'niet berekend');

  return `<!DOCTYPE html>
<html lang="${langue === 'nl' ? 'nl' : 'fr'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(bi(langue, 'Tableau de bord', 'Dashboard'))} — ${esc(company.denomination || 'paperasse-be')}</title>
</head>
<body style="margin:0;background:${FOND};color:${NOIR};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;line-height:1.45;">
  <div style="max-width:980px;margin:0 auto;padding:28px 20px 60px;">

    <header style="border-bottom:3px solid ${NOIR};padding-bottom:14px;margin-bottom:8px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="display:inline-block;width:14px;height:28px;background:${NOIR};"></span>
        <span style="display:inline-block;width:14px;height:28px;background:${JAUNE};"></span>
        <span style="display:inline-block;width:14px;height:28px;background:${ROUGE};"></span>
        <h1 style="font-size:22px;margin:0 0 0 8px;">${esc(bi(langue, 'Tableau de bord', 'Dashboard'))}</h1>
      </div>
      <div style="margin-top:8px;color:#555;font-size:14px;">
        ${esc(company.denomination || '')} &nbsp;·&nbsp; BCE/KBO : ${esc(company.bce || 'n/a')}
        &nbsp;·&nbsp; ${esc(bi(langue, 'Forme', 'Vorm'))} : ${esc(company.forme_juridique || 'n/a')}
        &nbsp;·&nbsp; ${esc(bi(langue, 'Exercice', 'Boekjaar'))} : ${esc(company.exercice?.debut || '?')} → ${esc(company.exercice?.cloture || '?')}
      </div>
    </header>

    <p style="font-size:12px;color:#888;margin:6px 0 24px;">
      ${esc(bi(langue, 'Généré le', 'Gegenereerd op'))} ${esc(genereLe)} —
      ${esc(bi(langue, 'à régénérer après modification (npm run dashboard).', 'opnieuw genereren na wijziging (npm run dashboard).'))}
    </p>

    <h2 style="font-size:16px;text-transform:uppercase;letter-spacing:.05em;border-left:4px solid ${JAUNE};padding-left:10px;">
      ${esc(bi(langue, 'Indicateurs (journal)', 'Indicatoren (grootboek)'))}
    </h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:14px 0 10px;">
      ${carte(bi(langue, 'Produits (classe 7)', 'Opbrengsten (klasse 7)'), euro(kpis.totalProduits))}
      ${carte(bi(langue, 'Charges (classe 6)', 'Kosten (klasse 6)'), euro(kpis.totalCharges))}
      ${carte(`${bi(langue, 'Résultat', 'Resultaat')} (${esc(sensResultat)})`, euro(kpis.resultat), couleurResultat)}
      ${carte(bi(langue, "Nombre d'écritures", 'Aantal boekingen'), String(kpis.nbEcritures))}
      ${carte(bi(langue, 'Période couverte', 'Gedekte periode'), periodeTexte)}
      ${carte(bi(langue, 'TVA à payer', 'Te betalen btw'), nonCalcule, '#999')}
    </div>
    <p style="font-size:12px;color:#888;margin:4px 0 28px;">
      ${esc(bi(langue,
        'Les indicateurs marqués « non calculé » ne sont pas dérivables du seul journal d\'écritures.',
        'Indicatoren met « niet berekend » zijn niet af te leiden uit het grootboek alleen.'))}
    </p>

    <h2 style="font-size:16px;text-transform:uppercase;letter-spacing:.05em;border-left:4px solid ${ROUGE};padding-left:10px;">
      ${esc(bi(langue, 'Prochaines échéances', 'Komende vervaldagen'))}
    </h2>
    <table style="width:100%;border-collapse:collapse;background:${CARTE};border:1px solid #E5E5E0;border-radius:8px;overflow:hidden;margin-top:12px;font-size:14px;">
      <thead>
        <tr style="background:${NOIR};color:#FFF;text-align:left;">
          <th style="padding:10px 12px;">${esc(bi(langue, 'Date', 'Datum'))}</th>
          <th style="padding:10px 12px;">${esc(bi(langue, 'Échéance', 'Vervaldag'))}</th>
          <th style="padding:10px 12px;">source_id</th>
        </tr>
      </thead>
      <tbody>${lignesEcheances}
      </tbody>
    </table>
    <p style="font-size:12px;color:#888;margin-top:10px;">${esc(NOTE_HONNETETE)}</p>

    <footer style="margin-top:40px;border-top:1px solid #DDD;padding-top:12px;font-size:11px;color:#AAA;">
      paperasse-be · dashboard.mjs · ${esc(bi(langue, 'données', 'gegevens'))} : journal.example.json
    </footer>
  </div>
</body>
</html>
`;
}

// ---------------------------------------------------------------------------
// Programme principal.
// ---------------------------------------------------------------------------
async function main() {
  const { data: company, source: srcCompany } = await chargerCompany();
  const { data: journal, source: srcJournal } = await chargerJournal();
  const langue = deduireLangue(company);

  const kpis = calculerKpis(journal.ecritures);
  // Échéances calculées à partir d'aujourd'hui sur 12 mois (logique partagée).
  const echeances = computeEcheances(company, new Date(), 12);
  const genereLe = new Date().toISOString().slice(0, 10);

  const html = rendreHtml({ company, langue, kpis, echeances, genereLe });

  const dossierSortie = join(RACINE, 'output');
  await mkdir(dossierSortie, { recursive: true });
  const cheminHtml = join(dossierSortie, 'dashboard.html');
  await writeFile(cheminHtml, html, 'utf8');

  console.log('Tableau de bord généré.');
  console.log(`  Config : ${srcCompany}`);
  console.log(`  Journal : ${srcJournal}`);
  console.log(`  Produits : ${euro(kpis.totalProduits)}  Charges : ${euro(kpis.totalCharges)}  Résultat : ${euro(kpis.resultat)}`);
  console.log(`  Écritures : ${kpis.nbEcritures}  Période : ${kpis.periode.debut || '?'} → ${kpis.periode.fin || '?'}`);
  console.log(`  Échéances (12 mois) : ${echeances.length}`);
  console.log(`  HTML : ${cheminHtml}`);

  process.exit(0);
}

main().catch((err) => {
  console.error('Erreur lors de la génération du tableau de bord :', err.message);
  process.exit(1);
});
