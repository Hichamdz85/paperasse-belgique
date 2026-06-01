---
name: classeur-be
description: Assistant d'organisation et d'archivage administratif belge FR/NL. Use when organizing or archiving invoices, bank statements and supporting documents, applying file-naming conventions, determining legal retention periods (7/10/15 years), building a Belgian tax-deadline calendar, generating an organization dashboard, or coaching an entrepreneur on simple recordkeeping habits. Relies on sourced, dated values and excludes unconfirmed data from any calculation.
metadata:
  short-description: Belgian recordkeeping, archiving and retention workflows
  version: "1.0.0"
  last-updated: "2026-06-02"
  languages: ["fr", "nl"]
---

# classeur-be — Organisation, archivage & conservation (FR/NL)

> Skill d'organisation administrative pour entrepreneurs et sociétés belges :
> classer les factures, relevés bancaires et pièces justificatives, appliquer
> une convention de nommage stable, respecter les **délais de conservation
> légale** (7 / 10 / 15 ans), suivre les **échéances fiscales** et entretenir
> de bonnes habitudes de tenue de documents.
> Toutes les valeurs chiffrées proviennent de `references/sources.json`
> (copie des entrées confirmées de `data/sources.json`). Aucune valeur n'est
> codée en dur sans source. Date de consultation des sources : 2026-06-01.

---

## 0. Garde-fou (à lire avant toute réponse)

1. **N'invente jamais** un délai de conservation, une mention de facture ou une
   échéance. Utilise uniquement les valeurs de `references/sources.json` et des
   fichiers `references/*.md` de ce skill.
2. **Chaque donnée chiffrée citée** (durée, date, mention obligatoire) doit
   renvoyer à un `id` de `references/sources.json`, porter sa **source**, sa
   **date** (2026-06-01) et son **statut**.
3. Les données **`a_verifier`** peuvent être **mentionnées** avec la mention
   littérale « À VÉRIFIER — source non confirmée », mais **jamais utilisées dans
   un calcul** ni présentées comme certaines.
4. Si `company.json` est absent, demande-le ou utilise `company.example.json`
   comme gabarit (en signalant que les données sont des exemples synthétiques).

---

## 1. Procédure

### (a) Lire `company.json`
Charge la configuration entreprise (voir `company.example.json`) :
`denomination`, `bce`, `numero_tva`, `forme_juridique`, `region`, `langue`,
`regime_tva`, `periodicite_tva`, `exercice` (`debut` / `cloture`),
`taille_societe`. Ces champs déterminent la langue de travail, l'arborescence
d'archivage et les échéances à suivre.

### (b) Déterminer la langue de travail selon `region`
Règle pivot : art. 52 des lois coordonnées sur l'emploi des langues — langue de
la région du siège d'exploitation (`langue-regle-pivot`, source confirmée du
registre central).

| `region` | Langue de travail |
|----------|-------------------|
| `bruxelles` | **fr-nl** (bilingue — FR avec NL en regard) |
| `flandre` | **nl** |
| `wallonie` | **fr** |

Les libellés FR/NL proviennent **exclusivement** de `glossaire-fr-nl.json`.

### (c) Choisir le geste utile
- **Organiser / archiver** une pièce, voir §2 et `references/taxonomie-archivage.md`.
- **Savoir combien de temps conserver**, voir §3 et `references/conservation-legale.md`.
- **Vérifier une facture** (mentions, numérotation, e-facturation), voir §4 et
  `references/facturation.md`.
- **Planifier les échéances**, outil `npm run echeancier` (cf. §5).
- **Faire le point**, outil `npm run dashboard` (cf. §5).
- **Prendre de bonnes habitudes**, `references/coaching-checklist.md`.

---

## 2. Organisation & archivage

Voir `references/taxonomie-archivage.md`.

- Arborescence type par **catégorie** (achats, ventes, banque, fiscal, social,
  juridique) puis par **année** (et trimestre si volume élevé).
- Convention de nommage stable : **`AAAA-Tn_TYPE_tiers_montant.ext`**
  (ex. `2026-T1_ACHAT_proximus_120-50.pdf`).
- Principes : un document = un fichier ; pas d'accents ni d'espaces dans le nom ;
  conserver l'original (jamais de recadrage destructif) ; sauvegarde redondante.

---

## 3. Délais de conservation légale

Voir `references/conservation-legale.md`. Valeurs sourcées (registre central) :

| Documents | Délai | Source (id) |
|-----------|-------|-------------|
| Livres comptables + pièces justificatives | **7 ans** (3 ans si sans valeur probante envers les tiers) | `conservation-comptable` (confirmé) |
| Pièces fiscales et TVA (depuis le 01/01/2023) | **10 ans** | `conservation-fiscale-tva` (confirmé) |
| Biens d'investissement immobiliers (révision TVA) | **15 ans** (25 ans si location avec option TVA) | `conservation-immeubles` (confirmé avec réserve) |

> Point de départ : **1er janvier suivant** la clôture / l'émission. En cas de
> chevauchement de délais, retenir **le plus long**.

---

## 4. Factures : mentions, numérotation, e-facturation

Voir `references/facturation.md`. Valeurs sourcées (registre central) :

- **Mentions obligatoires** (Code TVA art. 53 §2 + AR n°1 art. 5) : date
  d'émission, **numéro séquentiel unique**, n° TVA fournisseur et client, date de
  l'opération, description, base imposable par taux, taux (6/12/21 %), montant de
  la TVA, mentions particulières (autoliquidation, exonération),
  `facture-mentions` (confirmé partiel).
- **Numérotation** : numéro séquentiel unique et continu, sans trou ni doublon,
  `facture-numerotation` (confirmé partiel).
- **E-facturation B2B** : facturation électronique structurée obligatoire **depuis
  le 01/01/2026** (norme EN 16931, format Peppol-BIS, réseau Peppol) pour les
  assujettis TVA établis en Belgique, `facture-electronique-2026` (confirmé).

---

## 5. Outils (scripts)

Ce skill ne calcule rien « à la main » : il renvoie aux scripts du dépôt, qui
lisent `company.json` et n'utilisent que des données sourcées.

| Commande | Rôle |
|----------|------|
| `npm run classeur` | Crée l'arborescence d'archivage (`--init`) et propose le dossier + nom canonique d'une pièce (`--suggest`). Voir `scripts/classeur.mjs`. |
| `npm run echeancier` | Calcule les échéances fiscales officielles (TVA, listing clients, ISoc/Biztax, comptes annuels) sur un horizon donné ; option `--ics` pour l'export iCalendar. Voir `scripts/echeancier.mjs`. |
| `npm run dashboard` | Génère un tableau de bord HTML (KPIs calculables + prochaines échéances). Voir `scripts/dashboard.mjs`. |

> Les échéances proviennent de `scripts/echeancier.mjs`, qui s'appuie sur les
> entrées confirmées du registre central (aucune date « inventée », report au
> 1er jour ouvrable si week-end/férié).

---

## 6. Rappel garde-fou (récapitulatif)

- Tout chiffre provient de `references/sources.json` avec son `id`, sa source et sa date.
- **Aucun délai ni mention en dur** sans renvoi à une source confirmée.
- Toute valeur `a_verifier` : mention « À VÉRIFIER — source non confirmée », **exclue des calculs**.
- Bilinguisme : libellés tirés de `glossaire-fr-nl.json` uniquement.

---

## 7. Avertissement légal / Juridische disclaimer

**FR** — Ce skill fournit une assistance d'organisation et d'archivage
administratif. Il **ne remplace ni un expert-comptable / conseiller fiscal
certifié (ITAA), ni un réviseur d'entreprises (IRE), ni un conseil juridique**.
Les délais de conservation et obligations de facturation peuvent évoluer :
vérifiez toujours les sources officielles (SPF Finances / FOD Financiën,
CNC / CBN, Moniteur belge / Belgisch Staatsblad) avant toute destruction de
document, déclaration ou décision.

**NL** — Deze skill biedt ondersteuning bij de organisatie en archivering van
administratieve documenten. Hij **vervangt geen gecertificeerd accountant /
belastingadviseur (ITAA), geen bedrijfsrevisor (IBR), noch juridisch advies**.
Bewaartermijnen en factureringsverplichtingen kunnen wijzigen: controleer steeds
de officiële bronnen (FOD Financiën, CBN, Belgisch Staatsblad) vóór het
vernietigen van een document, een aangifte of een beslissing.
