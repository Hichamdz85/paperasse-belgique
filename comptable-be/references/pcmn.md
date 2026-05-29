# PCMN / MAR — Plan comptable minimum normalisé

> Référence du skill `comptable-be`. Données sourcées et datées (consultation : 2026-05-29).
> Libellés bilingues issus de `glossaire-fr-nl.json` (clé `cle`). Numéros de comptes :
> voir `../data/pcmn_comptes.json`.

---

## 1. Définition

**FR** — Plan comptable minimum normalisé (PCMN).
**NL** — Minimumindeling van het algemeen rekeningenstelsel (MAR).
*(glossaire `pcmn` — **confirmé** (2e vérif 2026-05-29), sigle NL « MAR » et orthographe « rekeningenstelsel »)*

Le PCMN est le plan comptable **obligatoire** pour toute entreprise tenue à la comptabilité
en **partie double** (SRL/BV, SA/NV, ASBL, etc.). Le plan comptable de l'entreprise doit être
conforme, dans son contenu, sa présentation et sa numérotation, au PCMN.

- **Source :** CNC/CBN, https://www.cnc-cbn.be/fr/node/2250
- **id source :** `compta-pcmn-def` — **statut : confirmé** — consultation 2026-05-29

---

## 2. Base légale

Le PCMN des entreprises est porté par l'**Arrêté royal du 21 octobre 2018** (Annexe 1re),
pris en exécution des **articles III.82 à III.95 du Code de droit économique (CDE)**. Cet AR
**abroge l'AR du 12 septembre 1983** qui fondait historiquement le PCMN. La **forme et le
contenu des comptes annuels** sont fixés, eux, par l'**AR du 29 avril 2019** portant exécution
du Code des sociétés et des associations (CSA / WVV).

> **Note :** le PCMN (plan comptable) et le schéma des comptes annuels relèvent de deux textes
> distincts : AR 21/10/2018 (plan comptable, exéc. CDE) ≠ AR 29/04/2019 (comptes annuels, exéc. CSA).

- **Statut :** **confirmé** — 2e vérification 2026-05-29 (`id source : compta-pcmn-ar`).
- **Source :** AR du 21/10/2018, Annexe 1re (Moniteur belge / ejustice) ; CNC/CBN https://www.cnc-cbn.be/fr/node/1845.

---

## 3. Structure des classes (0 à 7)

Classes **confirmées** (`compta-pcmn-def`, confirmé). Libellés FR/NL conformes au glossaire et
aux intitulés officiels CNC/CBN.

| Classe | Libellé FR | Libellé NL |
|--------|-----------|-----------|
| 0 | Droits et engagements hors bilan | Rechten en verplichtingen buiten balans |
| 1 | Fonds propres, provisions et dettes à plus d'un an | Eigen vermogen, voorzieningen en schulden op meer dan één jaar |
| 2 | Frais d'établissement, actifs immobilisés et créances à plus d'un an | Oprichtingskosten, vaste activa en vorderingen op meer dan één jaar |
| 3 | Stocks et commandes en cours d'exécution | Voorraden en bestellingen in uitvoering |
| 4 | Créances et dettes à un an au plus | Vorderingen en schulden op ten hoogste één jaar |
| 5 | Placements de trésorerie et valeurs disponibles | Geldbeleggingen en liquide middelen |
| 6 | Charges | Kosten |
| 7 | Produits | Opbrengsten |

- **Source :** CNC/CBN https://www.cnc-cbn.be/fr/node/2250 — `compta-pcmn-def` — **confirmé** (classes 0–7).

### Classes 8 et 9

Les **classes 8 et 9 sont d'usage libre / optionnel** : le PCMN ne leur impose pas de contenu
normatif (cf. **note 29 du PCMN**). L'affectation à la « comptabilité analytique » est une
**doctrine** courante, mais n'est **pas textuelle** dans le PCMN.

- **Statut :** **confirmé** — 2e vérification 2026-05-29 (`id source : compta-pcmn-classes-89`).
- **Source :** PCMN des entreprises, note 29 ; CNC/CBN https://www.cnc-cbn.be/fr/node/2250.

---

## 4. Correspondance bilan / compte de résultats

| Regroupement | Classes | Libellé FR | Libellé NL |
|--------------|---------|-----------|-----------|
| **Bilan** (Balans) | 1 à 5 | Bilan — Actif / Passif | Balans — Activa / Passiva |
| **Compte de résultats** (Resultatenrekening) | 6 et 7 | Charges / Produits | Kosten / Opbrengsten |

- Classes **1–5** = bilan (Balans) ; classes **6–7** = compte de résultats (Resultatenrekening).
- Libellés : glossaire `bilan`, `compte_resultats`, `actif`, `passif`, `charges`, `produits` (confirmés).
- **Source :** CNC/CBN https://www.cnc-cbn.be/fr/node/2250 — `compta-pcmn-def` — **confirmé**.

---

## 5. Adaptation des comptes

Les intitulés des comptes du PCMN peuvent être **adaptés** aux caractéristiques propres de
l'activité, du patrimoine, des produits et des charges de l'entreprise. Les comptes du PCMN
non pertinents pour une entreprise ne doivent pas figurer dans son plan comptable.

- **Source :** CNC/CBN — Titre 3 du PCMN des entreprises, https://www.cnc-cbn.be/fr/node/1653 — **confirmé** (principe d'adaptation).

---

## 6. Sous-comptes

Les numéros et intitulés de sous-comptes confirmés (croisés sur cnc-cbn.be) figurent dans
`../data/pcmn_comptes.json`. Les sous-comptes non confirmés officiellement y portent
`statut: "a_completer"` avec un libellé « à compléter » — **ne pas fabriquer de numéro**.

- **Source de référence des intitulés :** CNC/CBN — Titre 3 (node/1653) et annexe PCMN.
