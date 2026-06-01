# Comptabilité et dépôt des comptes — ASBL / VZW

> Référence du skill `asbl-be`. Données sourcées et datées (consultation : 2026-06-01).
> **FR** — Comptabilité simplifiée. **NL** — Vereenvoudigde boekhouding.
> *(glossaire `comptabilite_simplifiee` — confirmé)*.

---

## 1. Type de comptabilité (seuils)

L'ASBL tient une **comptabilité en partie double** si elle dépasse au moins **2 des 4 critères**
suivants ; sinon elle peut tenir une **comptabilité simplifiée**.

| Critère | Seuil |
|---------|-------|
| Travailleurs (ETP) | **5** |
| Recettes hors TVA | **334.500 EUR** |
| Total des avoirs | **1.337.000 EUR** |
| Total des dettes | **1.337.000 EUR** |

La **comptabilité simplifiée** comprend : un **état des recettes et dépenses** + un **état du
patrimoine** + une **annexe**.

- **id source :** `asbl-compta-type` — **statut : confirmé** — consultation 2026-06-01
- **Source :** SPF Justice — Obligations comptables des ASBL, https://justice.belgium.be/fr/themes_et_dossiers/societes_associations_et_fondations/associations/asbl/obligations_comptables

---

## 2. Base réglementaire des comptes annuels

Les comptes annuels des ASBL relèvent de l'**AR du 29/04/2019** portant exécution du CSA
(comptes annuels des sociétés, ASBL, AISBL et fondations).

- **id source :** `asbl-ar-comptes` — **statut : confirmé** — consultation 2026-06-01
- **Source :** CNC / CBN, https://www.cnc-cbn.be/fr/node/1845

---

## 3. Dépôt des comptes annuels

| Catégorie d'ASBL | Lieu de dépôt | Délai |
|------------------|---------------|-------|
| Très petite / petite ASBL | **Greffe du tribunal de l'entreprise** *(glossaire `greffe`)* | dans les **30 jours** de l'AG |
| Grande ASBL | **BNB / NBB — Centrale des bilans / Balanscentrale** *(glossaire `centrale_bilans`)* | dans les **30 jours** de l'AG |

- **id source :** `asbl-depot-comptes` — **statut : confirmé** — consultation 2026-06-01
- **Source :** SPF Justice — Obligations comptables des ASBL, https://justice.belgium.be/fr/themes_et_dossiers/societes_associations_et_fondations/associations/asbl/obligations_comptables

---

## 4. Points à vérifier (exclus de tout calcul)

> Les éléments ci-dessous portent la mention **« À VÉRIFIER — source non confirmée »** et
> **ne doivent jamais entrer dans un calcul**.

- **Catégories micro / petite / grande (art. 1:28-1:29 CSA)** déterminant le schéma des comptes
  et l'obligation de commissaire : divergence de sources (recettes **9.000.000** vs
  **11.250.000 EUR**) ; à recouper sur l'AR du 29/04/2019 / CDE art. III.82-III.95.
  - **id source :** `av-asbl-categories-csa` — **statut : à vérifier**.
- **Réforme annoncée** (dépôt obligatoire de toutes les ASBL à la BNB dès 2026) : non confirmée
  comme droit en vigueur.
  - **id source :** `av-asbl-reforme-2026` — **statut : à vérifier**.
