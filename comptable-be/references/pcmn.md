# PCMN / MAR — Plan comptable minimum normalisé

> Référence du skill `comptable-be`. Données sourcées et datées (consultation : 2026-06-02).
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

**FR** — ≈ 782 comptes (sociétés) + 373 comptes (ASBL), conformes à l'AR du 29 avril 2019.
**NL** — ≈ 782 rekeningen (vennootschappen) + 373 rekeningen (vzw's), conform het KB van 29 april 2019.
*(version courte : ≈ 782 + 373 comptes (PCMN, AR 2019))*

- **Source :** CNC/CBN, https://www.cnc-cbn.be/fr/node/2250 ; ITAA https://www.itaa.be/wp-content/uploads/ITAA_plan-comptable.pdf
- **id source :** `compta-pcmn-def`, `pcmn-cnc-consolide`, `pcmn-itaa` — **statut : confirmé** — consultation 2026-06-02

---

## 2. Base légale

La **base légale primaire** actuelle est l'**Arrêté royal du 29 avril 2019** portant exécution
du **Code des sociétés et des associations (CSA / WVV)**. Ce texte légal contraignant fixe les
**schémas de comptes annuels** et le **plan comptable** (sociétés + ASBL/fondations).

> **Contexte historique (non base d'un chiffre actuel) :** le PCMN des entreprises a été
> consolidé au **Code de droit économique (CDE) Livre III** via l'**AR du 21 octobre 2018**
> (Annexe 1re, exéc. art. III.82 à III.95 CDE), qui a **abrogé l'AR du 12 septembre 1983**. Ces
> dates ne subsistent qu'à titre de **lignée historique**.

### Hiérarchie des sources

**FR** — Source primaire : AR du 29 avril 2019 (Moniteur belge). Source interprétative
officielle : CNC/CBN (version consolidée). Source professionnelle pratique : ITAA. En cas de
divergence, l'AR 29/04/2019 prévaut.

**NL** — Primaire bron: KB van 29 april 2019 (Belgisch Staatsblad). Officiële interpretatieve
bron: CBN (geconsolideerde versie). Praktische professionele bron: ITAA. Bij tegenstrijdigheid
heeft het KB van 29/04/2019 voorrang.

Le **schéma de comptes annuels imposé** (complet / abrégé / micro) découle du **CSA art. 3:1**
(délégation au Roi) combiné aux critères de taille (**art. 1:24** petite société / **art. 1:25**
micro-société), la détermination du schéma par catégorie étant fixée par l'**AR du 29/04/2019
art. 3:58** et ses annexes (modèles). Les **modèles officiels** sont publiés par la BNB/NBB :
**Modèle C** (complet) / **Modèle A** (abrégé) / **Modèle M** (micro), déclinés sociétés à capital
et sans capital, en FR et NL.

> **Réforme CSA — capital.** Le concept de capital a été supprimé pour les SRL/BV par le CSA ;
> les apports sont comptabilisés sans notion de capital (compte 11 « apport hors capital »).
> **NL** — Het kapitaalbegrip is voor de BV afgeschaft door het WVV; inbreng wordt geboekt
> zonder kapitaalnotie.

- **Statut :** **confirmé** — vérification 2026-06-02 (`id source : pcmn-ar-2019`, `compta-pcmn-ar`, `pcmn-cnc-consolide`, `pcmn-itaa`, `compta-schema-article`, `compta-bnb-modeles`).
- **Source primaire :** AR du 29/04/2019 (Moniteur belge / Belgisch Staatsblad — ejustice https://www.ejustice.just.fgov.be, NUMAC 2019042901). **Interprétative :** CNC/CBN https://www.cnc-cbn.be/fr/node/1845. **Professionnelle :** ITAA https://www.itaa.be/wp-content/uploads/ITAA_plan-comptable.pdf. Modèles BNB/NBB https://www.nbb.be/en/central-balance-sheet-office/preparation-and-filing/what-file/models/models-companies-0.

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
