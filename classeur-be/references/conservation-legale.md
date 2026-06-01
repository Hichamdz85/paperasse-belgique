# Délais de conservation légale (Belgique)

> Référence du skill `classeur-be`. Toutes les durées renvoient à une entrée
> confirmée de `references/sources.json`. Aucun délai n'est cité sans source.
> Date de consultation : 2026-06-01.

---

## 1. Tableau des délais

| Documents concernés | Délai | Point de départ | Source (id) | Statut |
|---------------------|-------|-----------------|-------------|--------|
| Livres comptables et **pièces justificatives** | **7 ans** (3 ans pour les pièces sans valeur probante envers les tiers) | 1er janvier suivant la **clôture** | `conservation-comptable` | confirmé |
| Pièces **fiscales et TVA** (depuis le 01/01/2023) | **10 ans** (auparavant 7 ans) | 1er janvier suivant l'**émission / la clôture** | `conservation-fiscale-tva` | confirmé |
| Documents des **biens d'investissement immobiliers** | **15 ans** (25 ans pour location avec option TVA) | période de révision TVA | `conservation-immeubles` | confirmé avec réserve |

---

## 2. Bases légales

- **7 ans** — Code de droit économique, **Livre III, art. III.86** : conservation
  des livres comptables et des pièces justificatives (3 ans pour les pièces sans
  valeur probante envers les tiers). Source : `conservation-comptable`
  (CNC / CBN — https://www.cnc-cbn.be/fr/node/724).
- **10 ans** — **CIR 92 art. 315** et **Code TVA art. 60** (loi du 20/11/2022) :
  délai porté de 7 à 10 ans depuis le **01/01/2023**. Source :
  `conservation-fiscale-tva` (SPF Finances / FOD Financiën).
- **15 ans** — **Code TVA art. 48 §2** : période de révision TVA de 15 ans pour
  les biens d'investissement immobiliers, d'où une conservation de 15 ans
  (25 ans pour une location avec option TVA). Source : `conservation-immeubles`.
  **Réserve** : la loi du 10/02/2026 modifie l'art. 48 §2 — à reconfirmer au
  Moniteur belge / Belgisch Staatsblad avant tout usage définitif.

---

## 3. Règles pratiques

1. **Point de départ uniforme** : le délai court à partir du **1er janvier
   suivant** la clôture de l'exercice (comptable) ou l'émission (fiscal/TVA).
2. **Chevauchement** : si une pièce relève de plusieurs délais (ex. facture
   d'achat = comptable + fiscale), retenir **le délai le plus long**.
3. **Avant toute destruction**, vérifier qu'aucun délai n'est encore en cours et
   que la pièce n'est pas liée à un litige, un contrôle ou une garantie active.
4. La conservation **électronique** est admise si l'intégrité, la lisibilité et
   l'accès sont garantis pendant toute la durée légale (cf. `facturation.md` pour
   les factures structurées).
