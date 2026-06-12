---
description: États financiers + tableau de bord + note de synthèse
argument-hint: [client]
---

# /rapport — états & tableau de bord / staten & dashboard

Produit les **états financiers**, un **tableau de bord** et une **note de
synthèse** pour le client `$1`, via **`analyste-archiviste`**.

## Déroulé attendu

1. **Lire `company.json`** (`denomination`, `bce`, `forme_juridique`, `region`,
   `langue`, `exercice`) — détermine la langue d'affichage et le schéma BNB.
2. **États financiers** — bilan (Actif/Passif) + compte de résultats, libellés
   FR/NL résolus via `glossaire-fr-nl.json` :

   ```bash
   node scripts/generate-statements.js
   ```

   (sorties : `output/etats-financiers.txt` + `output/etats-financiers.json`).
3. **Tableau de bord** — KPIs dérivables du journal + prochaines échéances :

   ```bash
   node scripts/dashboard.mjs
   ```

   (sortie : `output/dashboard.html`).
4. **`analyste-archiviste`** — rédige une **note de synthèse** (résultat,
   équilibre du bilan, ratios calculables, échéances à venir, points
   d'attention). Livrable dans `dossiers/$1/rapports/`.

## Garde-fous (non négociables)

- Les états sont calculés **uniquement** à partir du journal d'écritures ;
  aucun chiffre fiscal en dur. Les KPIs non dérivables (ex. « TVA à payer »)
  sont marqués honnêtement « non calculé ».
- Toute valeur normative (seuils, taux, délais) provient de `data/sources.json`,
  statut **« confirme » UNIQUEMENT** (citer l'`id`).
- Livrable avec frontmatter YAML (`client`, `agent`, `date`, `version`,
  `statut`).
- **Validation humaine obligatoire** par un professionnel agréé avant tout
  usage officiel des états (dépôt, déclaration, communication aux tiers).
