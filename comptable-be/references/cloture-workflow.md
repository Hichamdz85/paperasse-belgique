# Clôture annuelle & dépôt BNB — workflow

> Référence du skill `comptable-be`. Données sourcées et datées (consultation : 2026-05-29).
> Libellés bilingues issus de `glossaire-fr-nl.json`. Délais et frais : voir `sources.json`.

---

## 1. Checklist ordonnée de clôture annuelle

| # | Étape FR | Étape NL | Référence |
|---|----------|----------|-----------|
| 1 | **Inventaire** (relevé des actifs, stocks, créances, dettes) | Inventaris | Obligation comptable (CSA / WVV) |
| 2 | **Écritures de régularisation** (amortissements, provisions, charges/produits à reporter, stocks) | Regularisatieboekingen | Principe comptable |
| 3 | **Établissement des comptes annuels** (bilan + compte de résultats + annexe) selon le schéma applicable | Opstellen van de jaarrekening | Schéma BNB / NBB |
| 4 | **Approbation par l'assemblée générale (AG)** | Goedkeuring door de algemene vergadering | `compta-bnb-delais` |
| 5 | **Dépôt des comptes annuels à la BNB** (Centrale des bilans / Balanscentrale) | Neerlegging bij de NBB | `compta-bnb-delais` + `compta-bnb-frais-2026` |
| 6 | **Déclaration ISoc via Biztax** | Aangifte Ven.B via Biztax | `fisc-isoc-biztax-delai` |

- Libellés glossaire : `comptes_annuels` (Jaarrekening), `bilan` (Balans), `compte_resultats`
  (Resultatenrekening), `assemblee_generale` (Algemene vergadering), `proces_verbal` (Notulen),
  `centrale_bilans` (Balanscentrale) — tous confirmés.

---

## 2. Délais légaux

| Échéance | Règle | Base |
|----------|-------|------|
| Assemblée générale (AG) | dans les **6 mois** de la clôture | art. 3:1 CSA |
| Dépôt à la BNB | dans les **30 jours** de l'approbation par l'AG | art. 3:10 CSA |
| **Limite absolue** de dépôt | **7 mois** après la clôture de l'exercice | art. 3:12 CSA |

- **Source :** BNB/NBB — Filing deadline, https://www.nbb.be/en/central-balance-sheet-office/preparation-and-filing/when-and-how-file/filing-deadline
- **id source :** `compta-bnb-delais` — **statut : confirmé** — consultation 2026-05-29

### Surcharge de dépôt tardif (art. 3:13 CSA) — barème dès le 01/01/2026 (EUR)

La surcharge s'ajoute aux frais de dépôt en cas de dépôt hors délai (au-delà des 7 mois) et
augmente avec le retard.

| Type de société | Dès le 9e mois | 10e–12e mois | Dès le 13e mois |
|------------------|---------------|--------------|------------------|
| **Petites sociétés** (schéma abrégé / micro) | **151** | **227** | **453** |
| **Autres sociétés** (schéma complet) | **504** | **755** | **1.510** |

- **id source :** `compta-bnb-surcharge` — **statut : confirmé** (2e vérif 2026-05-29).
- **Source :** BNB/NBB — Filing fee, https://www.nbb.be/en/central-balance-sheet-office/preparation-and-filing/how-and-how-much-pay/filing-fee

---

## 3. Dépôt à la BNB — format & paiement

### 3.1 Formats
Deux formats via l'application Filing de la Centrale des bilans (Balanscentrale) :
- **XBRL** (structuré, standard) ;
- **PDF**.
- **Source :** BNB/NBB — Filing fees (lien §3.2) — **confirmé**.

### 3.2 Frais de dépôt 2026 — sociétés (EUR)

| Schéma | XBRL | PDF |
|--------|------|-----|
| Complet (volledig schema) | **379,50** | **449,70** |
| Abrégé (verkort schema) | **89,40** | **159,50** |
| Micro (microschema) | **67,00** | **137,30** |

- Dépôt corrigé : complet/abrégé **86,00 EUR** ; micro **54,70 EUR**. CbCR : **86,00 EUR**.
- Libellés glossaire : `schema_complet`, `schema_abrege`, `schema_micro` (confirmés).
- **Source :** BNB/NBB — 2026 filing fees, https://www.nbb.be/en/central-balance-sheet-office/preparation-and-filing/how-and-how-much-pay/filing-fees-0
- **id source :** `compta-bnb-frais-2026` — **statut : confirmé** — consultation 2026-05-29

> **À VÉRIFIER — source non confirmée** : la mention « **TVAC** » (TVA comprise) des frais BNB
> n'est pas confirmée verbatim. RESEARCH §8 #6. Présenter les montants tels quels, sans affirmer
> qu'ils sont HT ou TVAC.

### 3.3 Paiement
Paiement reçu dans les **6 jours ouvrables** après marquage « prêt au paiement », sinon rejet
automatique.
- **Source :** BNB/NBB — How and how much to pay — **confirmé** (`compta-bnb-frais-2026`).

---

## 4. Correspondance schéma / taille de société

| Taille | Schéma de dépôt | Seuils (source) |
|--------|-----------------|------------------|
| Micro (microvennootschap, art. 1:25 CSA) | **micro** (microschema) | `compta-seuil-micro` — confirmé |
| Petite (kleine vennootschap, art. 1:24 CSA) | **abrégé** (verkort schema) | `compta-seuil-petite` — confirmé |
| Grande | **complet** (volledig schema) | `compta-seuil-petite` (dépassé) — confirmé |

- Une petite/micro société peut volontairement déposer un schéma plus détaillé.
- Règle de dépassement (effet décalé) : (non-)dépassement de plus d'un critère pendant
  **deux exercices consécutifs**, conséquences à partir de l'exercice suivant (RESEARCH §2.4, confirmé).

> **À VÉRIFIER — source non confirmée** : la **référence d'article CSA** imposant chaque schéma
> (complet / abrégé / micro) et la **composition détaillée** des comptes par schéma.
> RESEARCH §8 #3 et #5, statut `a_verifier`.

---

## 5. Langue de dépôt

Langue selon la région du siège d'exploitation (`langue-regle-pivot`, confirmé) :
Flandre → NL ; Wallonie → FR ; Bruxelles → FR ou NL.

> **À VÉRIFIER — source non confirmée** : les **modalités exactes du choix FR/NL à Bruxelles**
> pour le dépôt des comptes / déclarations / actes. RESEARCH §8 #20 —
> `id source : av-langue-depot-bxl`, statut `a_verifier`.
