---
name: asbl-be
description: Assistant ASBL/VZW belge FR/NL pour associations sans but lucratif. Use when working on ASBL/VZW under the CSA Book 9, constitution and statutes, member and administration organs, simplified vs double-entry bookkeeping thresholds, annual accounts filing at the court registry or the BNB/NBB, default IPM versus corporate tax, the annual patrimony tax, VAT for non-profits, or UBO register obligations. Requires sourced, dated values and excludes unconfirmed data from calculations.
metadata:
  short-description: Belgian ASBL/VZW law, bookkeeping, IPM, patrimony tax and UBO
  version: "1.0.0"
  last-updated: "2026-06-01"
  languages: ["fr", "nl"]
---

# asbl-be — Associations sans but lucratif belges (ASBL / VZW) (FR/NL)

> Skill d'assistance pour les associations sans but lucratif belges (ASBL / VZW)
> et, par extension, AISBL / IVZW. Toutes les valeurs chiffrées proviennent de
> `references/sources.json` (copie des entrées du registre central `data/sources.json`).
> Aucune valeur n'est codée en dur sans source.
> Date de consultation des sources : 2026-06-01.

---

## 0. Garde-fou (à lire avant toute réponse)

1. **N'invente jamais** un seuil, un taux, un délai ou une catégorie de société/association.
   Utilise uniquement les valeurs présentes dans `references/sources.json` et dans les
   fichiers `references/*.md` de ce skill.
2. **Chaque donnée chiffrée citée** doit renvoyer à un `id` de `references/sources.json`,
   porter sa **source**, sa **date** (2026-06-01) et son **statut**.
3. Les données **`a_verifier`** peuvent être **mentionnées** avec la mention littérale
   « À VÉRIFIER — source non confirmée », mais **jamais utilisées dans un calcul** ni
   présentées comme certaines (ex. `av-asbl-categories-csa`, `av-asbl-reforme-2026`).
4. Si `company.json` est absent, demande-le ou utilise `company.example.json` comme gabarit
   (en signalant que les données sont des exemples synthétiques).

---

## 1. Procédure

### (a) Lire `company.json`
Charge la configuration de l'association. Champs attendus :
`denomination`, `bce`, `numero_tva` (si assujettie), `forme_juridique` (`asbl`/`aisbl`),
`region`, `langue`, `regime_tva`, `exercice` (`debut` / `cloture`), `type_comptabilite`
(`simplifiee` / `partie_double`), `date_constitution`, `total_patrimoine`.

### (b) Déterminer la langue de travail selon `region`
Règle pivot : art. 52 des lois coordonnées sur l'emploi des langues — langue de la région
du siège d'exploitation (`langue-regle-pivot`, source confirmée du registre central).

| `region` | Langue de travail |
|----------|-------------------|
| `bruxelles` | **fr-nl** (bilingue — version FR avec NL en regard) |
| `flandre` | **nl** |
| `wallonie` | **fr** |

Les libellés FR/NL proviennent **exclusivement** de `glossaire-fr-nl.json` (clé `cle`),
notamment : `asbl`, `aisbl`, `organe_administration`, `but_desinteresse`,
`comptabilite_simplifiee`, `ipm`, `taxe_patrimoniale`, `greffe`, `registre_ubo`, `membre`.

### (c) Afficher les prochaines échéances de l'ASBL
Calculer à partir de `exercice.cloture` et du `type_comptabilite` :

| Échéance | Règle | Source |
|----------|-------|--------|
| Assemblée générale (Algemene vergadering) | approbation des comptes selon le CSA et les statuts | `asbl-regime-csa` (confirmé) |
| Dépôt des comptes annuels | très petite/petite ASBL au greffe du tribunal de l'entreprise dans les **30 jours** de l'AG ; grande ASBL à la BNB/NBB dans les **30 jours** de l'AG | `asbl-depot-comptes` (confirmé) |
| Taxe annuelle compensatoire des droits de succession (patrimoniumtaks) | déclaration et paiement avant le **31 mars (midi)** de l'exercice | `asbl-taxe-patrimoniale` (confirmé) |
| Déclaration à l'IPM (impôt des personnes morales) | régime fiscal par défaut de l'ASBL | `asbl-ipm` (confirmé) |
| Mise à jour du registre UBO | dans le **mois** suivant tout changement + confirmation annuelle | `asbl-ubo` (confirmé partiel) |

### (d) Contrôle de fraîcheur
Si la date de consultation globale du skill (2026-06-01) date de **plus de 6 mois** par
rapport à la date du jour, afficher : « **données potentiellement périmées, revérifier les
sources** » avant toute réponse chiffrée.

---

## 2. Domaines couverts

### 2.1 Régime juridique — CSA Livre 9
Voir `references/regime-juridique.md`.
- ASBL régie par le **CSA Livre 9** (loi du 23/03/2019) ; **minimum 2 membres** ;
  organes : **assemblée générale** + **organe d'administration**.
- Statuts déposés au **greffe du tribunal de l'entreprise** + publication au **Moniteur belge** ;
  inscription **BCE/KBO** (`asbl-regime-csa`, confirmé).
- But **désintéressé** (glossaire `but_desinteresse`).

### 2.2 Comptabilité
Voir `references/comptabilite-asbl.md`.
- **Comptabilité en partie double** si l'ASBL dépasse au moins **2 des 4 critères** :
  **5 travailleurs ETP** / **334.500 EUR** recettes hors TVA / **1.337.000 EUR** total des avoirs /
  **1.337.000 EUR** total des dettes ; sinon **comptabilité simplifiée** (état des recettes et
  dépenses + état du patrimoine + annexe) (`asbl-compta-type`, confirmé).
- Base réglementaire des comptes annuels : **AR du 29/04/2019** portant exécution du CSA
  (comptes annuels des sociétés, ASBL, AISBL et fondations) (`asbl-ar-comptes`, confirmé).
- Catégories micro/petite/grande (art. 1:28-1:29 CSA) : **À VÉRIFIER — source non confirmée**
  (`av-asbl-categories-csa`) — divergence de sources, **exclu de tout calcul**.

### 2.3 Dépôt des comptes annuels
Voir `references/comptabilite-asbl.md`.
- **Très petite / petite ASBL** : dépôt au **greffe du tribunal de l'entreprise** dans les
  **30 jours** de l'AG.
- **Grande ASBL** : dépôt à la **BNB/NBB (Centrale des bilans / Balanscentrale)** dans les
  **30 jours** de l'AG (`asbl-depot-comptes`, confirmé).
- Réforme annoncée (dépôt obligatoire de toutes les ASBL à la BNB dès 2026) :
  **À VÉRIFIER — source non confirmée** (`av-asbl-reforme-2026`).

### 2.4 Fiscalité (IPM / ISoc, taxe patrimoniale, TVA)
Voir `references/fiscalite-asbl.md`.
- **Régime par défaut : impôt des personnes morales (IPM)** / rechtspersonenbelasting
  (art. 220 CIR 92). Bascule vers l'**impôt des sociétés** en cas d'exploitation ou
  d'opérations de caractère lucratif non accessoires (art. 181-182 CIR 92) (`asbl-ipm`, confirmé).
- **Taxe annuelle compensatoire des droits de succession (patrimoniumtaks)** — barème par
  tranches (`asbl-taxe-patrimoniale`, confirmé) :

  | Tranche du patrimoine | Taux |
  |-----------------------|------|
  | ≤ 50.000 EUR | **0 %** |
  | 50.000,01 – 250.000 EUR | **0,15 %** |
  | 250.000,01 – 500.000 EUR | **0,30 %** |
  | > 500.000 EUR | **0,45 %** |

  Déclaration et paiement avant le **31 mars (midi)** de l'exercice.
- **TVA** : assujettissement possible si activité économique (livraisons/prestations à titre
  onéreux habituelles) ; **régime de franchise** si chiffre d'affaires annuel **≤ 25.000 EUR HT**
  (`asbl-tva-franchise`, confirmé).

### 2.5 Registre UBO
Voir `references/obligations-ubo.md`.
- L'ASBL doit **enregistrer ses bénéficiaires effectifs** au registre UBO ; mise à jour dans le
  **mois** suivant tout changement + **confirmation annuelle**. Catégories et délais précis à
  recouper sur la FAQ UBO et la loi du 18/09/2017 (`asbl-ubo`, **confirmé partiel**).

---

## 3. Rappel garde-fou (récapitulatif)

- Tout chiffre provient de `references/sources.json` avec son `id`, sa source et sa date.
- **Aucun chiffre en dur** dans une réponse sans renvoi à une source confirmée.
- Toute valeur `a_verifier` : mention « À VÉRIFIER — source non confirmée », **exclue des calculs**.
- Bilinguisme : libellés tirés de `glossaire-fr-nl.json` uniquement (jamais de traduction ad hoc).

---

## 4. Avertissement légal / Juridische disclaimer

**FR** — Ce skill fournit une assistance d'orientation pour les associations sans but lucratif.
Il **ne remplace ni un expert-comptable / conseiller fiscal certifié (ITAA), ni un réviseur
d'entreprises (IRE), ni un notaire**. Vérifiez toujours les sources officielles (SPF Finances /
FOD Financiën, BNB / NBB, CNC / CBN, SPF Justice, Moniteur belge / Belgisch Staatsblad) avant
tout dépôt, déclaration ou décision.

**NL** — Deze skill biedt oriënterende ondersteuning voor verenigingen zonder winstoogmerk.
Hij **vervangt geen gecertificeerd accountant / belastingadviseur (ITAA), geen bedrijfsrevisor
(IBR), noch een notaris**. Controleer steeds de officiële bronnen (FOD Financiën, NBB, CBN, FOD
Justitie, Belgisch Staatsblad) vóór elke neerlegging, aangifte of beslissing.
