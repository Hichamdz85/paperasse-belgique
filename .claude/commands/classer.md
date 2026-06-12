---
description: Assistant de classement et d'archivage des pièces (classeur.mjs)
argument-hint: [type] [fichier]
---

# /classer — classement & archivage / klasseren & archiveren

Assistant de **classement et d'archivage** des pièces comptables via
**`analyste-archiviste`** et `scripts/classeur.mjs`. `$1` = type de pièce
(`achat` | `vente` | `banque` | `fiscal` | `social` | `juridique`), `$2` =
nom du fichier à classer.

## Déroulé attendu

1. **Initialiser le classeur** (idempotent — crée l'arborescence par année +
   `LISEZMOI.md` + `index.json`) :

   ```bash
   node scripts/classeur.mjs --init
   ```

2. **Suggérer le classement** d'une pièce (n'affiche que le dossier cible + le
   nom canonique `YYYY-Qn_TYPE_tiers_montant.ext` ; **ne déplace rien**) :

   ```bash
   node scripts/classeur.mjs --suggest "$2" --type=$1 --date=YYYY-MM-DD --tiers=Nom --montant=123.45
   ```

3. **`analyste-archiviste`** — explique la suggestion, rappelle la convention
   de nommage et les **délais de conservation** (10 ans : pièces comptables et
   TVA ; cf. `compta-bnb-delais`, `fisc-tva-calendrier-2026`), et propose la
   prochaine action de rangement.

## Garde-fous (non négociables)

- Le script **ne déplace aucun fichier** : il suggère seulement. Le déplacement
  reste une action humaine.
- Les délais de conservation cités proviennent de `data/sources.json`, statut
  **« confirme » UNIQUEMENT** (citer l'`id`). Vérifier le délai applicable au
  cas précis auprès du comptable.
- Aucune donnée réelle n'est inscrite dans le dépôt sans frontmatter ni
  traçabilité ; le classeur organise, il ne juge pas.
