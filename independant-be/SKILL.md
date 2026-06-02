---
name: independant-be
description: Assistant pour indépendant personne physique belge FR/NL. Use when working on personal income tax (IPP — bareme, quotite exemptee, frais professionnels, versements anticipes), INASTI/RSVZ social contributions (taux, cotisation minimale, primostarter, complementaire, paiement trimestriel), VAT franchise threshold, simplified bookkeeping (3 journaux), or organizing a structured cabinet-level professional dossier. Relies on sourced, dated values and excludes unconfirmed data from any calculation.
metadata:
  short-description: Belgian sole-trader IPP, INASTI and dossier workflows
  version: "1.0.0"
  last-updated: "2026-06-02"
  languages: ["fr", "nl"]
---

# independant-be — Indépendant personne physique belge (FR/NL)

> Skill d'assistance pour l'**indépendant personne physique** belge
> (à titre principal ou complémentaire) : impôt des personnes physiques (IPP),
> cotisations sociales INASTI/RSVZ, franchise TVA, comptabilité simplifiée et
> organisation d'un **dossier professionnel structuré (niveau cabinet)**.
> Toutes les valeurs chiffrées proviennent de `references/sources.json` (copie
> des entrées confirmées de `data/sources.json`). Aucune valeur n'est codée en
> dur sans source. Date de consultation des sources : 2026-06-02. Année de
> référence : exercice d'imposition 2026 (revenus 2025) ; cotisations 2026.

---

## 0. Garde-fou (à lire avant toute réponse)

1. **N'invente jamais** un taux, un seuil, un montant de cotisation ou une
   échéance. Utilise uniquement les valeurs présentes dans
   `references/sources.json` et dans les fichiers `references/*.md` de ce skill.
2. **Chaque donnée chiffrée citée** doit renvoyer à un `id` de
   `references/sources.json`, porter sa **source**, sa **date** (2026-06-02) et
   son **statut**.
3. Les données **`a_verifier`** peuvent être **mentionnées** avec la mention
   littérale « À VÉRIFIER — source non confirmée », mais **jamais utilisées dans
   un calcul** ni présentées comme certaines. Les valeurs marquées
   `confirme_partiel` ou `confirme_avec_reserve` portent leur réserve dans la
   réponse (« sous réserve de confirmation … »).
4. Si `company.json` est absent, demande-le ou utilise `company.example.json`
   comme gabarit (en signalant que les données sont des exemples synthétiques).

---

## 1. Procédure

### (a) Lire `company.json`
Charge la configuration entreprise (voir `company.example.json`). Pour un
indépendant personne physique, champs déterminants : `forme_juridique`
(**personne physique** — pas une société), `denomination`, `bce`, `numero_tva`,
`region`, `langue`, `regime_tva`, `periodicite_tva`, `exercice`
(`debut` / `cloture`), et la nature de l'activité (principale / complémentaire,
primostarter ou non — à confirmer avec l'intéressé).

> **Distinction clé.** L'indépendant personne physique relève de l'**IPP**
> (impôt des personnes physiques), **pas** de l'ISoc. Il paie des **cotisations
> sociales INASTI/RSVZ** (et non l'ONSS salarié). Ne pas confondre avec une
> SRL/BV gérée par un dirigeant (voir le skill `comptable-be`).

### (b) Déterminer la langue de travail selon `region`
Règle pivot : art. 52 des lois coordonnées sur l'emploi des langues — langue de
la région du siège d'exploitation (`langue-regle-pivot`, source confirmée du
registre central).

| `region` | Langue de travail |
|----------|-------------------|
| `bruxelles` | **fr-nl** (bilingue — FR avec NL en regard) |
| `flandre` | **nl** |
| `wallonie` | **fr** |

Les libellés FR/NL proviennent **exclusivement** de `glossaire-fr-nl.json`.

### (c) Choisir le geste utile
- **Fiscalité IPP** (barème, quotité, frais pro, versements anticipés), voir §2
  et `references/fiscalite-ipp.md`.
- **Cotisations sociales INASTI** (taux, minimum, primostarter, complémentaire,
  paiement), voir §3 et `references/cotisations-sociales.md`.
- **TVA et comptabilité simplifiée**, voir §4 et
  `references/comptabilite-independant.md`.
- **Organiser un dossier professionnel** (niveau cabinet), voir §5 et
  `references/dossier-professionnel.md`.
- **Planifier les échéances / faire le point**, voir §6 (outils).

---

## 2. Fiscalité IPP (impôt des personnes physiques)

Voir `references/fiscalite-ipp.md`. Valeurs sourcées (registre central) :

- **Barème progressif** — ex. imp. 2026 (revenus 2025) : **25 %** (0–16.320 EUR) /
  40 % (16.320–28.800) / 45 % (28.800–49.840) / 50 % (au-delà de 49.840) ;
  additionnels communaux en sus (`ipp-bareme`, confirmé).
- **Quotité du revenu exemptée d'impôt** (montant de base, revenus 2025) :
  **10.910 EUR** (`ipp-quotite-exemptee`, confirmé).
- **Frais professionnels forfaitaires** : dirigeant d'entreprise 3 % (plafond
  3.130 EUR) ; indépendant (bénéfices/profits) forfait ~30 % (plafond ~5.930 EUR,
  à confirmer CIR 92 art. 51) ; option **frais réels** possible
  (`ipp-frais-pro`, confirmé partiel — annoncer la réserve).
- **Versements anticipés IPP** : **4 échéances** (10/04, 10/07, 10/10, 20/12) ;
  majoration en cas d'insuffisance ; **primostarters exonérés de majoration
  3 ans** (`ipp-versements-anticipes`, confirmé partiel — taux structurel à
  confirmer pour l'ex. imp. 2026).

---

## 3. Cotisations sociales INASTI / RSVZ

Voir `references/cotisations-sociales.md`. Valeurs sourcées (registre central) :

- **Taux (à titre principal, 2026)** : **20,50 %** sur le revenu net
  professionnel jusqu'à 75.024,54 EUR ; 14,16 % de 75.024,54 à 110.562,42 EUR ;
  0 % au-delà (plafond). Hors frais de gestion (`inasti-taux`, confirmé).
- **Cotisation minimale (principal, 2026)** : revenu plancher 17.374,08 EUR →
  **890,42 EUR/trimestre** (hors frais de gestion) (`inasti-minimum`, confirmé).
- **Plafond de cotisation (2026)** : revenu max 110.562,42 EUR →
  5.103,05 EUR/trimestre max (hors frais de gestion) (`inasti-plafond`, confirmé).
- **Primostarter (4 premiers trimestres)** : revenu plancher réduit 8.972,07 EUR ;
  cotisation réduite (≈ 459,82 EUR/trimestre) ; cotisations provisoires sur
  revenu N-3 réévalué puis **régularisation** (`inasti-primostarter`, confirmé).
- **À titre complémentaire** : aucune cotisation si revenu < **1.922,16 EUR** ;
  au-delà, mêmes taux (20,50 % / 14,16 %) ; pas de cotisation minimale
  (`inasti-complementaire`, confirmé).
- **Paiement** : affiliation obligatoire à une **caisse d'assurances sociales**
  avant le début de l'activité ; cotisations **trimestrielles** dues au plus tard
  le **dernier jour du trimestre** (mars/juin/sept/déc) ; retard = majoration
  3 %/trimestre ; **frais de gestion (~3–4,25 %)** en sus du barème INASTI
  (`inasti-paiement`, confirmé).

---

## 4. TVA et comptabilité simplifiée

Voir `references/comptabilite-independant.md`. Valeurs sourcées :

- **Comptabilité simplifiée** : l'indépendant personne physique tient une
  comptabilité simplifiée (**≥ 3 journaux** — livre des recettes, facturier
  d'entrée, journal financier) si le **CA HT du dernier exercice ≤ 500.000 EUR**
  (620.000 EUR hydrocarbures) ; au-delà, comptabilité en partie double
  (CDE Livre III, art. III.84/III.85) (`compta-indep-simplifiee`, confirmé partiel).
- **TVA — taux** : 21 % / 12 % / 6 % / 0 % (`fisc-tva-taux`, confirmé).
- **TVA — franchise** : seuil **25.000 EUR** HT/an ; tolérance 10 %
  (`fisc-tva-franchise`, confirmé).
- **Périodicité** : voir `fisc-tva-periodicite` (confirmé).

---

## 5. Dossier professionnel (niveau cabinet)

Voir `references/dossier-professionnel.md`. Méthode d'organisation « niveau
cabinet » (KPMG-level) — **organisation et méthode, sans chiffre non sourcé** :

- **Dossier permanent** : identité (nom, BCE, n° TVA, régime), affiliations
  (caisse d'assurances sociales, mutuelle, guichet d'entreprises), contrats
  structurants, autorisations/agréments.
- **Dossier annuel** : journal des recettes/dépenses, justificatifs classés,
  déclarations (TVA, IPP, INASTI), preuves de versements anticipés.
- **Note de synthèse** : situation IPP + INASTI + TVA de l'exercice, points
  ouverts, échéances à venir.
- **Reporting trimestriel** : suivi des cotisations INASTI et de la TVA,
  rapproché des relevés bancaires.

S'appuie sur les outils (§6) : `npm run classeur` (arborescence + nommage),
`npm run echeancier` (échéances), `npm run dashboard` (tableau de bord).

---

## 6. Outils (scripts)

Ce skill ne calcule rien « à la main » : il renvoie aux scripts du dépôt, qui
lisent `company.json` et n'utilisent que des données sourcées.

| Commande | Rôle |
|----------|------|
| `npm run echeancier` | Calcule les échéances fiscales officielles sur un horizon donné ; option `--ics` pour l'export iCalendar. |
| `npm run classeur` | Crée l'arborescence d'archivage (`--init`) et propose le dossier + nom canonique d'une pièce (`--suggest`). |
| `npm run dashboard` | Génère un tableau de bord HTML (KPIs calculables + prochaines échéances). |

> Les dates proviennent des entrées confirmées du registre central (aucune date
> « inventée », report au 1er jour ouvrable si week-end/férié).

---

## 7. Échéances clés (rappel)

| Échéance | Règle | Source (id) |
|----------|-------|-------------|
| Cotisations sociales INASTI | trimestrielles, dernier jour du trimestre (mars/juin/sept/déc) | `inasti-paiement` (confirmé) |
| Versements anticipés IPP | 4 échéances : 10/04, 10/07, 10/10, 20/12 | `ipp-versements-anticipes` (confirmé partiel) |
| Déclaration TVA | le 20 (mensuelle) / le 25 (trimestrielle) du mois suivant | `fisc-tva-periodicite` (confirmé) |
| Listing clients annuel | au plus tard le 31 mars | `fisc-tva-periodicite` (confirmé) |

---

## 8. Rappel garde-fou (récapitulatif)

- Tout chiffre provient de `references/sources.json` avec son `id`, sa source et sa date.
- **Aucun taux ni montant en dur** sans renvoi à une source confirmée.
- Toute valeur `a_verifier` : mention « À VÉRIFIER — source non confirmée », **exclue des calculs**.
- Bilinguisme : libellés tirés de `glossaire-fr-nl.json` uniquement.

---

## 9. Avertissement légal / Juridische disclaimer

**FR** — Ce skill fournit une assistance d'orientation pour l'indépendant
personne physique. Il **ne remplace ni un expert-comptable / conseiller fiscal
certifié (ITAA), ni votre caisse d'assurances sociales, ni l'INASTI, ni le
SPF Finances**. Les barèmes IPP, montants de cotisations INASTI et seuils
peuvent évoluer chaque année : vérifiez toujours les sources officielles
(SPF Finances / FOD Financiën, INASTI / RSVZ, votre caisse d'assurances
sociales, Moniteur belge / Belgisch Staatsblad) avant toute déclaration,
paiement ou décision.

**NL** — Deze skill biedt oriënterende ondersteuning voor de zelfstandige
natuurlijke persoon. Hij **vervangt geen gecertificeerd accountant /
belastingadviseur (ITAA), geen sociaalverzekeringsfonds, noch het RSVZ of de
FOD Financiën**. De PB-tarieven, RSVZ-bijdragen en drempels kunnen jaarlijks
wijzigen: controleer steeds de officiële bronnen (FOD Financiën, RSVZ, uw
sociaalverzekeringsfonds, Belgisch Staatsblad) vóór elke aangifte, betaling of
beslissing.
