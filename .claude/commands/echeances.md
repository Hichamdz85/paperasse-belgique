---
description: Échéancier fiscal/légal (echeancier.mjs) synthétisé par le directeur financier
argument-hint: [client]
---

# /echeances — échéancier légal / wettelijke vervaldagen

Calcule l'**échéancier fiscal et légal** du client `$1` puis le fait
synthétiser par **`directeur-financier`**.

## Déroulé attendu

1. **Lire `company.json`** (`forme_juridique`, `region`, `langue`,
   `regime_tva`, `periodicite_tva`, `exercice`) — l'échéancier dépend de la
   forme juridique et du régime TVA.
2. **Exécuter le script** (sortie console sourcée, chaque échéance porte un
   `source_id`) :

   ```bash
   node scripts/echeancier.mjs
   ```

   Pour produire aussi un calendrier importable (`output/echeances.ics`,
   rappel J-7) :

   ```bash
   node scripts/echeancier.mjs --ics
   ```

   Options : `--from=YYYY-MM-DD` (départ de l'horizon, défaut aujourd'hui),
   `--mois=N` (horizon, défaut 12).
3. **`directeur-financier`** — synthétise : prochaines échéances par ordre de
   date, points d'attention, prochaine action. Peut enregistrer la synthèse
   dans `dossiers/$1/echeances/`.

## Garde-fous (non négociables)

- Le script n'invente aucune date : uniquement des échéances légales
  officielles, chacune adossée à un `source_id` de `data/sources.json`.
- Les dates exactes varient chaque année ; report au 1er jour ouvrable si
  week-end/férié ; revérifier le calendrier officiel.
- Livrable (si écrit) avec frontmatter YAML (`client`, `agent`, `date`,
  `version`, `statut`).
- **Validation humaine obligatoire** avant de se fier à une échéance pour un
  dépôt ou un paiement.
