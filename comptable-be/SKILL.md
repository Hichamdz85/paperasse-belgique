---
name: comptable-be
description: Skill comptable belge bilingue FR/NL — écritures en PCMN/MAR, TVA/BTW, calcul ISoc/Ven.B, clôture annuelle et dépôt des comptes à la BNB, à partir d'une configuration entreprise (company.json) et de données sourcées et datées.
last_updated: 2026-05-29
langues: [fr, nl]
---

# comptable-be — Comptabilité & fiscalité des sociétés belges (FR/NL)

> Skill d'assistance comptable et fiscale pour sociétés belges (SRL/BV, SA/NV, etc.).
> Toutes les valeurs chiffrées proviennent de `references/sources.json` (copie des entrées
> `confirme` de `data/sources.json`). Aucune valeur n'est codée en dur sans source.
> Date de consultation des sources : 2026-05-29. Année de référence : exercice d'imposition 2026 (revenus 2025).

---

## 0. Garde-fou (à lire avant toute réponse)

1. **N'invente jamais** un taux, un seuil, un numéro de compte PCMN ou une échéance.
   Utilise uniquement les valeurs présentes dans `references/sources.json` et dans les
   fichiers `references/*.md` / `data/pcmn_comptes.json` de ce skill.
2. **Chaque donnée chiffrée citée** doit renvoyer à un `id` de `references/sources.json`,
   porter sa **source**, sa **date** (2026-05-29) et son **statut** (`confirme` / `a_verifier`).
3. Les données **`a_verifier`** peuvent être **mentionnées** avec la mention littérale
   « À VÉRIFIER — source non confirmée », mais **jamais utilisées dans un calcul** ni
   présentées comme certaines.
4. Si `company.json` est absent, demande-le ou utilise `company.example.json` comme gabarit
   (en signalant que les données sont des exemples synthétiques).

---

## 1. Procédure

### (a) Lire `company.json`
Charge la configuration entreprise. Champs attendus (voir `company.example.json`) :
`denomination`, `bce`, `numero_tva`, `forme_juridique`, `region`, `langue`, `regime_tva`,
`periodicite_tva`, `exercice` (`debut` / `cloture`), `taille_societe`, `schema_comptes`,
`date_constitution`, `dirigeant_remuneration_annuelle`.

### (b) Déterminer la langue de travail selon `region`
Règle pivot : art. 52 des lois coordonnées sur l'emploi des langues — langue de la région
du siège d'exploitation (`langue-regle-pivot`, source confirmée).

| `region` | Langue de travail |
|----------|-------------------|
| `bruxelles` | **fr-nl** (bilingue — version FR avec NL en regard) |
| `flandre` | **nl** |
| `wallonie` | **fr** |

Les libellés FR/NL proviennent **exclusivement** de `glossaire-fr-nl.json` (clé `cle`).
Tout le contenu est rédigé en français, avec le terme NL officiel en regard.

### (c) Afficher les prochaines échéances fiscales belges
Calculer à partir de `exercice.cloture` et de `periodicite_tva` :

| Échéance | Règle | Source |
|----------|-------|--------|
| Assemblée générale (Algemene vergadering) | dans les **6 mois** de la clôture | `compta-bnb-delais` (confirmé) |
| Dépôt des comptes annuels à la BNB (Balanscentrale) | dans les **30 jours** de l'approbation par l'AG | `compta-bnb-delais` (confirmé) |
| Limite absolue de dépôt BNB | **7 mois** après la clôture | `compta-bnb-delais` (confirmé) |
| Déclaration ISoc (Biztax) | **dernier jour du 7e mois** après clôture ; ex. d'imp. 2026 (clôture 31/12/2025) = **30/09/2026** (report au 1er jour ouvrable si week-end/férié) | `fisc-isoc-biztax-delai` (confirmé) |
| Déclaration TVA mensuelle (periodieke btw-aangifte) | **le 20** du mois suivant | `fisc-tva-periodicite` (confirmé) |
| Déclaration TVA trimestrielle | **le 25** du mois suivant le trimestre | `fisc-tva-periodicite` (confirmé) |
| Listing clients annuel (jaarlijkse klantenlisting) | au plus tard le **31 mars** | `fisc-tva-periodicite` + RESEARCH §5.3 (confirmé) |

> Note : les dates exactes du calendrier TVA peuvent être ponctuellement décalées chaque
> année (RESEARCH §8 #13, « À VÉRIFIER »). Annoncer la règle, pas une date dérogatoire non confirmée.

### (d) Contrôle de fraîcheur
Si `last_updated` du skill (2026-05-29) date de **plus de 6 mois** par rapport à la date du
jour, afficher : « **données potentiellement périmées, revérifier les sources** » avant toute
réponse chiffrée.

---

## 2. Domaines couverts

### 2.1 Écritures en PCMN / MAR
Voir `references/pcmn.md` et `data/pcmn_comptes.json`.
Plan comptable obligatoire en partie double, classes 0 à 7 (`compta-pcmn-def`, confirmé).
N'utiliser que des numéros de compte présents dans `data/pcmn_comptes.json` ;
les comptes non confirmés officiellement y portent `statut: "a_completer"`.

### 2.2 TVA / BTW
Voir `references/tva-be.md`.
- Taux : **21 %** (normal) / **12 %** / **6 %** / **0 %** (`fisc-tva-taux`, confirmé).
- Régimes : normal ; franchise (seuil **25.000 EUR** HT/an, `fisc-tva-franchise`, confirmé) ;
  forfaitaire **en extinction** (suppression au **31/12/2027**, `fisc-tva-forfaitaire`, confirmé).
- Périodicité Intervat : mensuelle par défaut ; trimestrielle sous seuils
  **2.500.000 / 250.000 / 50.000 EUR** (`fisc-tva-periodicite`, confirmé).

### 2.3 Impôt des sociétés (ISoc / Vennootschapsbelasting)
Voir `references/isoc-be.md`.
- Taux normal : **25 %** (`fisc-isoc-taux-normal`, confirmé).
- Taux réduit : **20 %** sur la **1re tranche de 100.000 EUR** (`fisc-isoc-taux-reduit`, confirmé),
  sous **3 conditions cumulatives** :
  1. être une **petite société** au sens de l'art. 1:24 CSA (`compta-seuil-petite`, confirmé) ;
  2. **rémunération minimale dirigeant** : **50.000 EUR** dès l'**exercice d'imposition 2026**
     (loi-programme du 18/07/2025, indexé ; avantages de toute nature max 20 % = 10.000 EUR) ;
     **45.000 EUR** jusqu'à l'**exercice d'imposition 2025** (ou = revenu imposable si inférieur) ;
     applicable dès la **5e période imposable** (`fisc-isoc-remuneration`, confirmé) ;
  3. **exclusions de détention** (participations, sociétés d'investissement, etc.).
- Exonération **start-up** : pas de condition de rémunération les 4 premières périodes imposables.
- Précompte mobilier : **30 %** (`fisc-precompte-mobilier`, confirmé).
- Déclaration **Biztax** : dernier jour du 7e mois (cf. §1.c).

### 2.4 Clôture annuelle
Voir `references/cloture-workflow.md`. Inventaire, écritures de régularisation,
établissement des comptes annuels, AG ≤ 6 mois, dépôt BNB ≤ 30 jours (limite 7 mois).

### 2.5 Dépôt à la BNB (Centrale des bilans / Balanscentrale)
Voir `references/cloture-workflow.md`. Formats **XBRL** (structuré, standard) et **PDF**.
Frais 2026 par schéma : `compta-bnb-frais-2026` (confirmé).

---

## 3. Rappel garde-fou (récapitulatif)

- Tout chiffre provient de `references/sources.json` avec son `id`, sa source et sa date.
- **Aucun chiffre en dur** dans une réponse sans renvoi à une source confirmée.
- Toute valeur `a_verifier` : mention « À VÉRIFIER — source non confirmée », **exclue des calculs**.
- Bilinguisme : libellés tirés de `glossaire-fr-nl.json` uniquement.

---

## 4. Avertissement légal / Juridische disclaimer

**FR** — Ce skill fournit une assistance d'orientation comptable et fiscale. Il **ne remplace
ni un expert-comptable / conseiller fiscal certifié (ITAA), ni un réviseur d'entreprises (IRE),
ni un conseil fiscal ou juridique**. Vérifiez toujours les sources officielles (SPF Finances /
FOD Financiën, BNB / NBB, CNC / CBN, Moniteur belge / Belgisch Staatsblad) avant tout dépôt,
déclaration ou décision.

**NL** — Deze skill biedt oriënterende boekhoudkundige en fiscale ondersteuning. Hij **vervangt
geen gecertificeerd accountant / belastingadviseur (ITAA), geen bedrijfsrevisor (IBR), noch
fiscaal of juridisch advies**. Controleer steeds de officiële bronnen (FOD Financiën, NBB,
CBN, Belgisch Staatsblad) vóór elke neerlegging, aangifte of beslissing.
