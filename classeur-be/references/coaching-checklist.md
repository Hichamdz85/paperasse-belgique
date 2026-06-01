# Checklist de coaching — tenue de documents (FR + termes NL)

> Référence du skill `classeur-be`. Routines simples pour qu'un entrepreneur
> garde une administration propre, sans se laisser déborder. Termes NL officiels
> issus de `glossaire-fr-nl.json`.

---

## 1. Chaque semaine (wekelijks)

- [ ] **Téléverser** les nouvelles factures reçues et émises (facture / *factuur*)
      dans `achats/` et `ventes/` (voir `taxonomie-archivage.md`).
- [ ] **Renommer** chaque pièce au format `AAAA-Tn_TYPE_tiers_montant.ext`.
- [ ] **Télécharger** les relevés bancaires (relevé bancaire / *rekeninguittreksel*)
      de la semaine dans `banque/`.
- [ ] Vider la « bannette à traiter » : zéro document en attente le vendredi.

---

## 2. Chaque mois (maandelijks)

- [ ] **Rapprochement** banque ↔ factures : chaque mouvement bancaire est lié à
      une pièce justificative (pièce justificative / *verantwoordingsstuk*).
- [ ] Vérifier la **numérotation continue** des factures de vente (sans trou).
- [ ] Contrôler les **échéances** du mois suivant via `npm run echeancier`
      (TVA / *btw*, etc.).
- [ ] Transmettre les pièces du mois au comptable.

---

## 3. Chaque trimestre (per kwartaal)

- [ ] Clôturer le **classement** (classement / *klassement*) du trimestre :
      tous les `Tn` complets, rien en vrac.
- [ ] Préparer la **déclaration TVA** trimestrielle si applicable
      (déclaration périodique à la TVA / *periodieke btw-aangifte*) — échéances
      via `npm run echeancier`.
- [ ] Générer le **tableau de bord** (`npm run dashboard`) et relire les KPIs.
- [ ] Sauvegarde redondante (archivage / *archivering*) : vérifier que la copie
      cloud est à jour.

---

## 4. Une fois par an (jaarlijks)

- [ ] Ouvrir l'arborescence de l'année suivante (`npm run classeur --init --annee=AAAA`).
- [ ] Vérifier les **délais de conservation** (conservation / *bewaring* ;
      délai de conservation / *bewaartermijn*) : voir `conservation-legale.md`
      avant toute destruction.
- [ ] Préparer la clôture, l'AG et le dépôt des comptes (échéances via l'échéancier).

---

## 5. Conseils d'organisation simples

1. **Petit et régulier** vaut mieux que « tout d'un coup » : 15 minutes par semaine
   évitent des journées entières en fin d'année.
2. **Un seul endroit** par catégorie : pas de doublons dispersés.
3. **Nommer tout de suite** : une pièce non nommée est une pièce à moitié perdue.
4. **Ne jamais jeter trop tôt** : en cas de doute sur un délai
   (délai de conservation / *bewaartermijn*), conserver.
5. **Automatiser le rappel** : exporter l'échéancier en `.ics`
   (`npm run echeancier --ics`) et l'importer dans l'agenda.
