---
description: Préparer la déclaration TVA/BTW d'une période
argument-hint: [client] [periode]
---

# /tva — déclaration TVA / btw-aangifte

Prépare la **déclaration TVA/BTW** du client `$1` pour la période `$2`
(ex. `2026-T1`, `2026-03`). Route vers **`comptable`** (préparation) et, si un
arbitrage fiscal est nécessaire, **`fiscaliste`**.

## Déroulé attendu

1. **Lire `company.json`** d'abord (`regime_tva`, `periodicite_tva`, `region`,
   `langue`, `exercice`). Si `regime_tva` n'est pas `normal` (ex. franchise),
   le signaler : pas de déclaration périodique à déposer.
2. **`comptable`** — agréger les opérations de la période (TVA due, TVA
   déductible, grilles), à partir des écritures de `dossiers/$1/ecritures/`.
   Livrable dans `dossiers/$1/declarations/`.
3. **`fiscaliste`** (si arbitrage) — déductibilité, autoliquidation, régimes
   particuliers ; reprend les chiffres du comptable sans les recalculer hors
   source.
4. **Échéance** — rappeler la date légale de dépôt (déléguer à
   `analyste-archiviste` / `scripts/echeancier.mjs`) : trimestrielle = le 25 du
   mois suivant le trimestre ; mensuelle = le 20 du mois suivant.

## Garde-fous (non négociables)

- Taux, grilles et échéances proviennent de `data/sources.json`, statut
  **« confirme » UNIQUEMENT** (citer l'`id`, ex. `fisc-tva-calendrier-2026`).
  Les données `a_verifier` ne sont jamais utilisées dans un calcul.
- Les dates exactes varient chaque année ; report au 1er jour ouvrable si
  week-end/férié ; revérifier le calendrier officiel (SPF Finances / Intervat).
- Livrable avec frontmatter YAML (`client`, `agent`, `date`, `version`,
  `statut`).
- **Validation humaine obligatoire** avant tout dépôt via Intervat.
