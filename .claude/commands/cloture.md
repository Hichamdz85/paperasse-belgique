---
description: Workflow de clôture annuelle séquentiel (comptable → fiscaliste → analyste)
argument-hint: [client] [exercice]
---

# /cloture — clôture annuelle / jaarafsluiting

Workflow de **clôture annuelle SÉQUENTIEL avec validation humaine** pour le
client `$1`, exercice `$2`. Chaque étape lit la sortie de la précédente ; on
**ne passe pas** à l'étape suivante sans avoir présenté la sortie de l'étape
courante pour validation.

## Préalable

Lire `company.json` (`forme_juridique`, `region`, `langue`, `regime_tva`,
`exercice`) AVANT toute production. Langue de travail : `bruxelles` = fr-nl,
`flandre` = nl, `wallonie` = fr. Si la forme est `ASBL` →
`gestionnaire-asbl` ; si `personne_physique` / `independant_complementaire` →
`conseiller-independant` (adapter la chaîne en conséquence).

## Étapes séquentielles (société SRL/BV, SA/NV…)

1. **`comptable`** — écritures de clôture (PCMN/MAR) + contrôles (équilibre
   partie double, lettrage, régularisations). Livrable dans
   `dossiers/$1/ecritures/` et `dossiers/$1/declarations/`. **STOP — présenter
   pour validation.**
2. **`fiscaliste`** — sur la base des écritures validées : ISoc/IPP +
   versements anticipés (VA), rémunération minimale dirigeant, échéance Biztax.
   Livrable dans `dossiers/$1/declarations/`. **STOP — présenter pour
   validation.**
3. **`analyste-archiviste`** — sur la base des deux étapes précédentes : états
   financiers (`generate-statements.js`), ratios, dashboard, **checklist de
   dépôt BNB** (templates/depot-bnb-checklist). Livrable dans
   `dossiers/$1/rapports/`. **STOP — présenter pour validation finale.**

## Garde-fous (non négociables)

- Toute valeur chiffrée provient de `data/sources.json`, statut **« confirme »
  UNIQUEMENT** (citer l'`id`). Les données `a_verifier` sont exclues des calculs.
- Chaque livrable porte le frontmatter YAML (`client`, `agent`, `date`,
  `version`, `statut`).
- **Validation humaine obligatoire** par un professionnel agréé avant tout
  dépôt à la BNB, déclaration ISoc/IPP ou approbation des comptes.
