# Taxonomie d'archivage & convention de nommage

> Référence du skill `classeur-be`. Structure stable pour classer les pièces
> administratives d'une entreprise belge. L'outil `npm run classeur --init`
> matérialise cette arborescence ; `npm run classeur --suggest` propose le
> dossier et le nom canonique d'une pièce.

---

## 1. Arborescence type

Deux axes : **catégorie** (nature de la pièce) puis **année** (et trimestre si
le volume le justifie).

```
classeur/
├── achats/        (factures fournisseurs, notes de frais, bons de commande)
│   └── 2026/
│       ├── T1/
│       ├── T2/
│       ├── T3/
│       └── T4/
├── ventes/        (factures clients émises, notes de crédit)
│   └── 2026/T1..T4/
├── banque/        (relevés bancaires, preuves de paiement, rapprochements)
│   └── 2026/T1..T4/
├── fiscal/        (déclarations TVA, ISoc/Biztax, avertissements-extraits de rôle)
│   └── 2026/
├── social/        (paie, ONSS/RSZ, contrats de travail, assurances)
│   └── 2026/
└── juridique/     (statuts, PV d'AG, baux, contrats, actes notariés)
    └── permanent/
```

- **achats / ventes / banque** : forte volumétrie, découpe par **trimestre**.
- **fiscal / social** : découpe par **année** (volume plus faible).
- **juridique** : souvent **permanent** (documents de société à durée de vie longue).

---

## 2. Convention de nommage

Format unique : **`AAAA-Tn_TYPE_tiers_montant.ext`**

| Élément | Règle | Exemple |
|---------|-------|---------|
| `AAAA` | année sur 4 chiffres | `2026` |
| `Tn` | trimestre `T1`–`T4` (ou `T0` si non applicable) | `T1` |
| `TYPE` | catégorie en MAJUSCULES | `ACHAT`, `VENTE`, `BANQUE`, `FISCAL`, `SOCIAL`, `JURIDIQUE` |
| `tiers` | nom du tiers, minuscules, sans accent ni espace | `proximus` |
| `montant` | montant TTC, point décimal remplacé par `-` | `120-50` |
| `.ext` | extension d'origine | `.pdf` |

Exemple complet : `2026-T1_ACHAT_proximus_120-50.pdf`

---

## 3. Principes de classement

1. **Un document = un fichier.** Pas de PDF multi-pièces mélangées.
2. **Pas d'accents ni d'espaces** dans les noms de fichiers (portabilité).
3. **Original préservé.** On archive le document d'origine ; jamais de recadrage
   destructif ni de réécriture du contenu.
4. **Lisibilité.** Un scan doit être net et complet (toutes les mentions visibles).
5. **Sauvegarde redondante.** Au moins deux emplacements (local + cloud chiffré).
6. **Cohérence trimestrielle.** Classer la pièce dans le trimestre de sa **date
   d'opération**, pas de la date de réception.
7. **Index.** Tenir un `index.json` (généré par `npm run classeur`) listant les
   pièces archivées pour retrouver vite un document.

> Rappel : la durée pendant laquelle ces fichiers doivent rester accessibles est
> fixée par les délais de conservation légale — voir `conservation-legale.md`.
