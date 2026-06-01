# Factures : mentions, numérotation, e-facturation (Belgique)

> Référence du skill `classeur-be`. Toutes les règles renvoient à une entrée
> confirmée de `references/sources.json`. Date de consultation : 2026-06-01.

---

## 1. Mentions obligatoires

Base légale : **Code TVA art. 53 §2 + AR n°1 art. 5**. Source : `facture-mentions`
(confirmé partiel).

Une facture doit comporter au minimum :

1. la **date d'émission** ;
2. un **numéro séquentiel unique** ;
3. le **n° TVA du fournisseur** et le **n° TVA du client** ;
4. la **date de l'opération** (livraison / prestation) ;
5. la **description** (quantité et nature des biens/services) ;
6. la **base imposable par taux** ;
7. le **taux applicable** (6 %, 12 % ou 21 %) ;
8. le **montant de la TVA** ;
9. les **mentions particulières** éventuelles (autoliquidation, exonération).

---

## 2. Numérotation

Base légale : **AR n°1 art. 5, 2°**. Source : `facture-numerotation`
(confirmé partiel).

- Numéro **séquentiel unique et continu**, **sans trou ni doublon**.
- Possibilité d'utiliser **une ou plusieurs séries** (ex. par année ou par type).
- Toute annulation se gère par **note de crédit**, jamais par suppression d'un
  numéro (ce qui créerait un trou).

---

## 3. Facturation électronique structurée B2B (depuis le 01/01/2026)

Base légale : **loi du 06/02/2024**. Source : `facture-electronique-2026`
(confirmé).

- **Obligatoire depuis le 01/01/2026** pour les assujettis TVA établis en Belgique
  (transactions **B2B**).
- Format : **facture électronique structurée** conforme à la norme **EN 16931**,
  profil **Peppol-BIS**, transmise via le **réseau Peppol**.
- Une facture PDF simple (non structurée) ne satisfait **pas** l'obligation B2B.
- Conséquence d'archivage : la pièce structurée doit rester lisible et accessible
  pendant toute la durée de conservation (voir `conservation-legale.md`).

---

## 4. Lien avec l'archivage

- Classer les factures **émises** dans `ventes/`, les factures **reçues** dans
  `achats/` (voir `taxonomie-archivage.md`).
- Conserver le **fichier structuré** d'origine (et non une simple impression) pour
  les factures électroniques B2B.
