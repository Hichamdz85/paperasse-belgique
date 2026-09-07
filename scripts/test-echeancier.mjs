// test-echeancier.mjs
// Tests unitaires (Node natif, sans dépendance) du report au 1er jour ouvrable
// et des jours fériés légaux belges. Lancer : node scripts/test-echeancier.mjs
import assert from 'node:assert/strict';
import {
  computeEcheances,
  datePaques,
  joursFeriesBelges,
  reporterJourOuvrable,
} from './echeancier.mjs';

const iso = (d) => d.toISOString().slice(0, 10);
const utc = (y, m, j) => new Date(Date.UTC(y, m - 1, j));

// Pâques (dates connues).
assert.equal(iso(datePaques(2026)), '2026-04-05');
assert.equal(iso(datePaques(2027)), '2027-03-28');
assert.equal(iso(datePaques(2025)), '2025-04-20');

// Fériés mobiles 2026 : lundi de Pâques 06/04, Ascension 14/05, Pentecôte 25/05.
const f2026 = joursFeriesBelges(2026);
for (const j of ['2026-01-01', '2026-04-06', '2026-05-01', '2026-05-14', '2026-05-25',
  '2026-07-21', '2026-08-15', '2026-11-01', '2026-11-11', '2026-12-25']) {
  assert.ok(f2026.has(j), `férié attendu : ${j}`);
}
assert.equal(f2026.size, 10);

// Report : 25/10/2026 est un dimanche -> lundi 26/10/2026.
assert.equal(iso(reporterJourOuvrable(utc(2026, 10, 25))), '2026-10-26');
// 31/07/2027 est un samedi -> lundi 02/08/2027.
assert.equal(iso(reporterJourOuvrable(utc(2027, 7, 31))), '2027-08-02');
// 01/11/2027 (Toussaint, lundi) -> mardi 02/11/2027.
assert.equal(iso(reporterJourOuvrable(utc(2027, 11, 1))), '2027-11-02');
// Jour ouvrable inchangé.
assert.equal(iso(reporterJourOuvrable(utc(2026, 9, 8))), '2026-09-08');

// Intégration : SRL bruxelloise trimestrielle, TVA T3 2026 reportée au 26/10.
const company = {
  forme_juridique: 'SRL', region: 'bruxelles', regime_tva: 'normal',
  periodicite_tva: 'trimestrielle', exercice: { debut: '2026-01-01', cloture: '2026-12-31' },
};
const ech = computeEcheances(company, '2026-09-07', 12);
const t3 = ech.find((e) => e.label_fr.startsWith('Déclaration TVA — T3 2026'));
assert.ok(t3, 'échéance T3 2026 absente');
assert.equal(t3.date, '2026-10-26');
assert.equal(t3.date_legale, '2026-10-25');
assert.equal(t3.reportee, true);
const biztax = ech.find((e) => e.label_fr.startsWith('Déclaration ISoc (Biztax)'));
assert.ok(biztax);
assert.equal(biztax.date, '2027-08-02');
assert.equal(biztax.date_legale, '2027-07-31');
// Dépôt BNB : pas de report (choix conservateur), reste au 31/07/2027.
const bnb = ech.find((e) => e.label_fr.startsWith('Dépôt des comptes annuels (BNB)'));
assert.ok(bnb);
assert.equal(bnb.date, '2027-07-31');
assert.equal(bnb.reportee, false);

console.log('OK — test-echeancier : report jours ouvrables et fériés belges (15 assertions)');
