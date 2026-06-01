// echeancier.mjs
// -----------------------------------------------------------------------------
// Échéancier LÉGAL belge + export iCalendar (.ics).
//
// À partir de la configuration entreprise (company.json, repli
// company.example.json), calcule les échéances officielles sur un horizon
// donné (TVA, listing clients, ISoc/Biztax, comptes annuels, ou — pour les
// ASBL — taxe patrimoniale et dépôt des comptes).
//
// Choix techniques (cf. brief paperasse-be) :
//   - ESM natif, Node >= 18, AUCUNE dépendance externe (modules natifs seulement).
//   - Aucune date fiscale « inventée » : uniquement des échéances officielles,
//     sans buffer personnel. Chaque échéance porte un `source_id` traçable
//     dans data/sources.json.
//
// Arguments CLI optionnels :
//   --from=YYYY-MM-DD   date de départ de l'horizon (défaut : aujourd'hui)
//   --mois=N            horizon en mois (défaut : 12)
//   --ics               écrit aussi output/echeances.ics
//
// La fonction computeEcheances() est EXPORTÉE afin d'être réutilisée par
// dashboard.mjs (section « Prochaines échéances »).
// -----------------------------------------------------------------------------

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Racine du projet = dossier parent de scripts/.
const __dirname = dirname(fileURLToPath(import.meta.url));
const RACINE = join(__dirname, '..');

// ---------------------------------------------------------------------------
// Outils de dates (manipulation en UTC pour éviter les décalages de fuseau).
// ---------------------------------------------------------------------------

// Construit une date UTC à partir de composantes (mois 1-12).
function dateUTC(annee, mois, jour) {
  return new Date(Date.UTC(annee, mois - 1, jour));
}

// Formate une date en YYYY-MM-DD (UTC).
function isoJour(d) {
  return d.toISOString().slice(0, 10);
}

// Parse une chaîne YYYY-MM-DD en date UTC ; renvoie null si invalide.
function parseJour(s) {
  if (typeof s !== 'string') return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = dateUTC(Number(m[1]), Number(m[2]), Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

// ---------------------------------------------------------------------------
// Chargement de la configuration entreprise (company.json sinon l'exemple).
// Même logique de repli que generate-statements.js.
// ---------------------------------------------------------------------------
async function chargerCompany() {
  const principal = join(RACINE, 'company.json');
  const repli = join(RACINE, 'company.example.json');
  const chemin = existsSync(principal) ? principal : repli;
  const data = JSON.parse(await readFile(chemin, 'utf8'));
  return { data, source: chemin };
}

// Déduit la langue d'affichage (même règle que generate-statements.js).
export function deduireLangue(company) {
  if (company.langue) return company.langue;
  switch (company.region) {
    case 'flandre': return 'nl';
    case 'wallonie': return 'fr';
    case 'bruxelles': return 'fr-nl';
    default: return 'fr';
  }
}

// Affiche le libellé selon la langue : fr-nl -> FR (cf. brief).
export function afficherLabel(echeance, langue) {
  if (langue === 'nl') return echeance.label_nl;
  // fr-nl affiche FR (et fr également).
  return echeance.label_fr;
}

// Liste des formes juridiques considérées comme « société » (vs ASBL).
const FORMES_SOCIETE = new Set(['SRL', 'SA', 'SNC', 'SComm', 'SC']);

// ---------------------------------------------------------------------------
// Calcul des échéances LÉGALES sur l'horizon [from, from + mois].
//
// Retourne un tableau d'objets :
//   { date (YYYY-MM-DD), label_fr, label_nl, source_id }
// trié par date croissante.
//
// Règles (dates officielles, sans buffer) :
//   * TVA trimestrielle  -> le 25 du mois suivant chaque trimestre
//                           (25/04, 25/07, 25/10, 25/01).
//   * TVA mensuelle       -> le 20 du mois suivant chaque mois.
//   * Listing clients annuel -> 31/03.
//   * Société (SRL/SA/...) :
//       - ISoc Biztax : dernier jour du 7e mois après la clôture.
//       - AG des comptes : <= 6 mois après la clôture.
//       - Dépôt comptes annuels : <= 30 jours après l'AG, limite 7 mois.
//   * ASBL :
//       - Taxe patrimoniale : déclaration + paiement avant le 31/03.
//       - Dépôt des comptes (greffe / BNB).
// ---------------------------------------------------------------------------
export function computeEcheances(company, fromDate, mois = 12) {
  const from = fromDate instanceof Date ? fromDate : (parseJour(fromDate) || new Date());
  // Date de départ normalisée à minuit UTC.
  const debut = dateUTC(from.getUTCFullYear(), from.getUTCMonth() + 1, from.getUTCDate());
  // Borne de fin de l'horizon (from + N mois).
  const fin = dateUTC(
    debut.getUTCFullYear(),
    debut.getUTCMonth() + 1 + Number(mois),
    debut.getUTCDate()
  );

  const echeances = [];

  // Bornes d'années à parcourir (on couvre toutes les années touchées par
  // l'horizon, +1 pour les échéances de janvier de l'année suivante).
  const anneeDebut = debut.getUTCFullYear();
  const anneeFin = fin.getUTCFullYear();

  const forme = String(company.forme_juridique || '').trim();
  const estSociete = FORMES_SOCIETE.has(forme);
  const estAsbl = forme === 'ASBL';
  const periodicite = company.periodicite_tva || 'trimestrielle';
  const regimeTva = company.regime_tva || 'normal';
  // Le dépôt de déclarations TVA ne concerne que les assujettis au régime normal.
  const deposeTva = regimeTva === 'normal';

  // --- TVA périodique ---
  if (deposeTva) {
    if (periodicite === 'trimestrielle') {
      // Échéance le 25 du mois suivant la fin de chaque trimestre.
      // T1->25/04, T2->25/07, T3->25/10, T4->25/01 (année N+1).
      for (let an = anneeDebut; an <= anneeFin + 1; an += 1) {
        const trimestres = [
          { mois: 4, t: 'T1' },
          { mois: 7, t: 'T2' },
          { mois: 10, t: 'T3' },
          { mois: 1, t: 'T4', anneeRef: an - 1 }, // T4 de N déclaré en janvier N+1
        ];
        for (const tr of trimestres) {
          const ref = tr.anneeRef !== undefined ? tr.anneeRef : an;
          echeances.push({
            date: isoJour(dateUTC(an, tr.mois, 25)),
            label_fr: `Déclaration TVA — ${tr.t} ${ref} (trimestrielle)`,
            label_nl: `Btw-aangifte — ${tr.t} ${ref} (per kwartaal)`,
            source_id: 'fisc-tva-calendrier-2026',
          });
        }
      }
    } else if (periodicite === 'mensuelle') {
      // Échéance le 20 du mois suivant chaque mois déclaré.
      for (let an = anneeDebut; an <= anneeFin + 1; an += 1) {
        for (let m = 1; m <= 12; m += 1) {
          // Le mois m est déclaré le 20 du mois m+1.
          const depot = dateUTC(an, m + 1, 20);
          const moisRef = dateUTC(an, m, 1);
          const moisFr = moisRef.toLocaleString('fr-BE', { month: 'long', timeZone: 'UTC' });
          const moisNl = moisRef.toLocaleString('nl-BE', { month: 'long', timeZone: 'UTC' });
          echeances.push({
            date: isoJour(depot),
            label_fr: `Déclaration TVA — ${moisFr} ${an} (mensuelle)`,
            label_nl: `Btw-aangifte — ${moisNl} ${an} (maandelijks)`,
            source_id: 'fisc-tva-calendrier-2026',
          });
        }
      }
    }

    // --- Listing clients annuel : 31/03 ---
    for (let an = anneeDebut; an <= anneeFin + 1; an += 1) {
      echeances.push({
        date: isoJour(dateUTC(an, 3, 31)),
        label_fr: `Listing clients TVA annuel — exercice ${an - 1}`,
        label_nl: `Jaarlijkse btw-klantenlisting — boekjaar ${an - 1}`,
        source_id: 'fisc-tva-calendrier-2026',
      });
    }
  }

  // --- Échéances liées à la clôture de l'exercice (société ou ASBL) ---
  const cloture = parseJour(company.exercice?.cloture);
  if (cloture) {
    // On calcule les échéances pour la clôture configurée ET pour la clôture
    // de l'année suivante, afin de couvrir un horizon de 12 mois quelle que
    // soit la date de départ.
    for (let decalAnnee = 0; decalAnnee <= 1; decalAnnee += 1) {
      const anCloture = cloture.getUTCFullYear() + decalAnnee;
      const moisCloture = cloture.getUTCMonth() + 1;
      const jourCloture = cloture.getUTCDate();

      if (estSociete) {
        // ISoc Biztax : dernier jour du 7e mois après la clôture.
        // (Pour clôture 31/12 -> 31/07 de l'année suivante : on prend le
        //  dernier jour du mois (moisCloture + 7).)
        const moisBiztax = moisCloture + 7;
        // Le « jour 0 » du mois suivant donne le dernier jour du mois voulu.
        const dernierJourBiztax = dateUTC(anCloture, moisBiztax + 1, 0);
        echeances.push({
          date: isoJour(dernierJourBiztax),
          label_fr: `Déclaration ISoc (Biztax) — exercice clos le ${jourCloture}/${moisCloture}/${anCloture}`,
          label_nl: `Aangifte vennootschapsbelasting (Biztax) — boekjaar afgesloten ${jourCloture}/${moisCloture}/${anCloture}`,
          source_id: 'fisc-isoc-biztax-delai',
        });

        // AG des comptes annuels : <= 6 mois après la clôture (échéance prise
        // au dernier jour du 6e mois).
        const dernierJourAG = dateUTC(anCloture, moisCloture + 6 + 1, 0);
        echeances.push({
          date: isoJour(dernierJourAG),
          label_fr: `Assemblée générale d'approbation des comptes — exercice ${anCloture}`,
          label_nl: `Algemene vergadering ter goedkeuring van de jaarrekening — boekjaar ${anCloture}`,
          source_id: 'compta-bnb-delais',
        });

        // Dépôt des comptes annuels à la BNB : <= 30 jours après l'AG, limite
        // 7 mois après la clôture (on retient la limite légale des 7 mois).
        const dernierJourDepot = dateUTC(anCloture, moisCloture + 7 + 1, 0);
        echeances.push({
          date: isoJour(dernierJourDepot),
          label_fr: `Dépôt des comptes annuels (BNB) — exercice ${anCloture}`,
          label_nl: `Neerlegging van de jaarrekening (NBB) — boekjaar ${anCloture}`,
          source_id: 'compta-bnb-delais',
        });
      }

      if (estAsbl) {
        // Dépôt des comptes (greffe / BNB selon la catégorie d'ASBL).
        const dernierJourDepotAsbl = dateUTC(anCloture, moisCloture + 6 + 1, 0);
        echeances.push({
          date: isoJour(dernierJourDepotAsbl),
          label_fr: `Dépôt des comptes annuels de l'ASBL (greffe/BNB) — exercice ${anCloture}`,
          label_nl: `Neerlegging van de jaarrekening van de vzw (griffie/NBB) — boekjaar ${anCloture}`,
          source_id: 'asbl-depot-comptes',
        });
      }
    }
  }

  // --- ASBL : taxe patrimoniale annuelle (déclaration + paiement avant 31/03) ---
  if (estAsbl) {
    for (let an = anneeDebut; an <= anneeFin + 1; an += 1) {
      echeances.push({
        date: isoJour(dateUTC(an, 3, 31)),
        label_fr: `Taxe patrimoniale des ASBL — déclaration + paiement (avant le 31/03) ${an}`,
        label_nl: `Patrimoniumtaks vzw's — aangifte + betaling (vóór 31/03) ${an}`,
        source_id: 'asbl-taxe-patrimoniale',
      });
    }
  }

  // Filtrage sur l'horizon [debut, fin] (bornes incluses pour debut, exclues
  // pour fin), dédoublonnage par (date + source_id + label_fr), puis tri.
  const vues = new Set();
  const dansHorizon = [];
  for (const e of echeances) {
    const d = parseJour(e.date);
    if (!d) continue;
    if (d < debut || d > fin) continue;
    const cle = `${e.date}|${e.source_id}|${e.label_fr}`;
    if (vues.has(cle)) continue;
    vues.add(cle);
    dansHorizon.push(e);
  }
  dansHorizon.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  return dansHorizon;
}

// Note d'honnêteté affichée en tête (et exportée pour réutilisation).
export const NOTE_HONNETETE =
  'Échéances légales sourcées ; les dates exactes varient chaque année ; ' +
  'report au 1er jour ouvrable si week-end/férié ; revérifier le calendrier officiel.';

// ---------------------------------------------------------------------------
// Lecture des arguments CLI (--from, --mois, --ics).
// ---------------------------------------------------------------------------
function lireArgs() {
  const argv = process.argv.slice(2);
  let from = null;
  let mois = 12;
  let ics = false;
  for (const a of argv) {
    if (a.startsWith('--from=')) from = a.slice('--from='.length);
    else if (a.startsWith('--mois=')) mois = Number(a.slice('--mois='.length)) || 12;
    else if (a === '--ics') ics = true;
  }
  return { from, mois, ics };
}

// ---------------------------------------------------------------------------
// Génération du contenu iCalendar (.ics) : un VEVENT all-day par échéance,
// avec une alarme (VALARM) 7 jours avant.
// ---------------------------------------------------------------------------
function genererICS(echeances, langue) {
  // Échappement des caractères spéciaux iCalendar.
  const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  // Date all-day au format YYYYMMDD ; DTEND = jour suivant (exclusif).
  const compact = (iso) => iso.replace(/-/g, '');
  const lendemain = (iso) => {
    const d = parseJour(iso);
    d.setUTCDate(d.getUTCDate() + 1);
    return compact(isoJour(d));
  };
  const horodatage = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');

  const lignes = [];
  lignes.push('BEGIN:VCALENDAR');
  lignes.push('VERSION:2.0');
  lignes.push('PRODID:-//paperasse-be//echeancier//FR');
  lignes.push('CALSCALE:GREGORIAN');
  lignes.push('METHOD:PUBLISH');

  echeances.forEach((e, i) => {
    const titre = afficherLabel(e, langue);
    lignes.push('BEGIN:VEVENT');
    lignes.push(`UID:paperasse-be-${compact(e.date)}-${i}@paperasse-be`);
    lignes.push(`DTSTAMP:${horodatage}`);
    lignes.push(`DTSTART;VALUE=DATE:${compact(e.date)}`);
    lignes.push(`DTEND;VALUE=DATE:${lendemain(e.date)}`);
    lignes.push(`SUMMARY:${esc(titre)}`);
    lignes.push(`DESCRIPTION:${esc(`Échéance légale belge. source_id: ${e.source_id}. ${NOTE_HONNETETE}`)}`);
    lignes.push('TRANSP:TRANSPARENT');
    // Alarme 7 jours avant l'échéance.
    lignes.push('BEGIN:VALARM');
    lignes.push('TRIGGER:-P7D');
    lignes.push('ACTION:DISPLAY');
    lignes.push(`DESCRIPTION:${esc(`Rappel (J-7) : ${titre}`)}`);
    lignes.push('END:VALARM');
    lignes.push('END:VEVENT');
  });

  lignes.push('END:VCALENDAR');
  // Les lignes iCalendar se terminent par CRLF.
  return lignes.join('\r\n') + '\r\n';
}

// ---------------------------------------------------------------------------
// Programme principal.
// ---------------------------------------------------------------------------
async function main() {
  const { from, mois, ics } = lireArgs();
  const { data: company, source: srcCompany } = await chargerCompany();
  const langue = deduireLangue(company);
  const dateDepart = from ? (parseJour(from) || new Date()) : new Date();

  const echeances = computeEcheances(company, dateDepart, mois);

  // Affichage console.
  const sep = '='.repeat(72);
  console.log(sep);
  console.log(`ÉCHÉANCIER LÉGAL — ${company.denomination || ''}`.trim());
  console.log(`Forme: ${company.forme_juridique || 'n/a'}   Région: ${company.region || 'n/a'}   Langue: ${langue}`);
  console.log(`Horizon: ${isoJour(dateDepart)} -> +${mois} mois   (${echeances.length} échéance(s))`);
  console.log(sep);
  console.log(`NOTE : ${NOTE_HONNETETE}`);
  console.log('-'.repeat(72));
  for (const e of echeances) {
    console.log(`  ${e.date}  ${afficherLabel(e, langue)}   [${e.source_id}]`);
  }
  console.log(sep);
  console.log(`(Config: ${srcCompany})`);

  // Export .ics si demandé.
  if (ics) {
    const dossierSortie = join(RACINE, 'output');
    await mkdir(dossierSortie, { recursive: true });
    const cheminIcs = join(dossierSortie, 'echeances.ics');
    await writeFile(cheminIcs, genererICS(echeances, langue), 'utf8');
    console.log(`Calendrier écrit : ${cheminIcs}`);
  }

  process.exit(0);
}

// N'exécute main() que lorsque le fichier est lancé directement (pas à l'import).
const lancéDirectement = process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
if (lancéDirectement) {
  main().catch((err) => {
    console.error('Erreur lors du calcul de l\'échéancier :', err.message);
    process.exit(1);
  });
}
