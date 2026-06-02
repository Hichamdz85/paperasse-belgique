# Comptabilité de l'indépendant personne physique (FR/NL)

> Comptabilité simplifiée / Vereenvoudigde boekhouding + TVA / Btw.
> Toutes les valeurs proviennent de `references/sources.json`.
> Aucune valeur en dur sans renvoi à une source confirmée.

---

## 1. Comptabilité simplifiée — seuil et journaux

Source : `compta-indep-simplifiee` (**confirmé partiel** — annoncer la réserve).

- L'indépendant personne physique tient une **comptabilité simplifiée** si le
  **chiffre d'affaires HT du dernier exercice ≤ 500.000 EUR**
  (620.000 EUR pour les hydrocarbures).
- Au-delà du seuil : **comptabilité en partie double** (comme une société).
- Base légale : **CDE Livre III, art. III.84 / III.85**.

La comptabilité simplifiée repose sur **au moins 3 journaux** :

| Journal | Contenu |
|---------|---------|
| Livre des recettes | encaissements / ventes |
| Facturier d'entrée | factures reçues / achats |
| Journal financier | mouvements bancaires et de caisse |

> Réserve à annoncer : le seuil et l'articulation des journaux relèvent du CDE
> Livre III (art. III.84/III.85) — vérifier la version consolidée avant usage
> officiel.

---

## 2. TVA — taux

Source : `fisc-tva-taux` (confirmé).

- **21 %** (normal) / **12 %** / **6 %** / **0 %**.

---

## 3. TVA — régime de la franchise

Source : `fisc-tva-franchise` (confirmé).

- Seuil : **25.000 EUR** HT/an.
- Tolérance : **10 %** (maximum 27.500 EUR).
- Sous ce seuil, l'indépendant peut opter pour la **franchise** (pas de TVA
  facturée, pas de droit à déduction).

---

## 4. TVA — périodicité de déclaration

Source : `fisc-tva-periodicite` (confirmé).

- **Mensuelle** par défaut.
- **Trimestrielle** si CA ≤ 2.500.000 EUR HT, catégories sensibles ≤ 250.000 EUR
  et relevé intracommunautaire ≤ 50.000 EUR.
- Déclaration mensuelle : le **20** du mois suivant ; trimestrielle : le **25**
  du mois suivant le trimestre.
- **Listing clients annuel** : au plus tard le **31 mars**.

---

## 5. Disclaimer

Ces données ne remplacent pas le SPF Finances, la CNC/CBN ni un expert-comptable
ITAA. Le seuil de comptabilité simplifiée est `confirme_partiel` : vérifier le
CDE Livre III avant tout usage officiel.
