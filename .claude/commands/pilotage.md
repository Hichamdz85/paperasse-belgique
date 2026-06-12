---
description: Tour de pilotage du directeur financier (CFO virtuel)
argument-hint: [client]
---

# /pilotage — tour de pilotage / stuuroverzicht

Invoque l'agent **`directeur-financier`** (CFO virtuel, orchestrateur) pour
produire une **synthèse de pilotage** du dossier client `$1` (si `$1` est
vide, utilise le dossier courant / la configuration `company.json`).

## Déroulé attendu

1. **Lire `company.json`** d'abord (`forme_juridique`, `region`, `langue`,
   `regime_tva`, `exercice`). S'il est absent, signaler l'usage de
   `company.example.json` (données synthétiques). Déterminer la langue de
   travail : `bruxelles` = fr-nl, `flandre` = nl, `wallonie` = fr.
2. **Prochaines échéances** — déléguer le calcul à `analyste-archiviste`
   (`scripts/echeancier.mjs`) ; ne jamais inventer une date.
3. **État du dossier** `dossiers/$1/` — ce qui est prêt (`valide`), ce qui est
   `a_valider`, ce qui manque.
4. **Points d'attention** — risques, données `a_verifier` (exclues des calculs),
   validations humaines requises.
5. **Recommandations** — prochaine action concrète + quel spécialiste l'exécute.

## Garde-fous (non négociables)

- L'orchestrateur **ne calcule jamais** lui-même : il route vers le spécialiste
  et reprend sa sortie sourcée telle quelle.
- Toute valeur chiffrée provient de `data/sources.json`, statut **« confirme »
  UNIQUEMENT**, en citant l'`id`. Une donnée **« a_verifier »** n'entre jamais
  dans un calcul et n'est jamais présentée comme certaine.
- Terminer en rappelant : **validation humaine obligatoire** par un
  professionnel agréé (expert-comptable ITAA, réviseur IRE, notaire, INASTI)
  avant tout dépôt, déclaration ou acte.
