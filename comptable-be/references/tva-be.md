# TVA / BTW — Taxe sur la valeur ajoutée

> Référence du skill `comptable-be`. Données sourcées et datées (consultation : 2026-05-29 ; §6-7 ajoutés le 2026-09-08).
> **FR** — TVA (taxe sur la valeur ajoutée). **NL** — Btw (belasting over de toegevoegde waarde).
> *(glossaire `tva` — confirmé)*

---

## 1. Taux

| Code | Taux | Type FR | Type NL |
|------|------|---------|---------|
| R03 | **21 %** | Taux normal | Normaal tarief |
| R02 | **12 %** | Taux intermédiaire | Tussentarief |
| R01 | **6 %** | Taux réduit | Verlaagd tarief |
| R00 | **0 %** | Taux zéro (exceptionnel) | Nultarief (uitzonderlijk) |

- **Source :** SPF Finances — Taux de TVA, https://finances.belgium.be/fr/entreprises/tva/assujettissement-tva/taux-et-calcul/taux-tva
- **id source :** `fisc-tva-taux` — **statut : confirmé** — consultation 2026-05-29

Le détail des **biens/services par taux** est fixé par l'**AR n° 20**. Exemples confirmés :
- **6 %** : eau, livres/journaux, médicaments, alimentation de base, transport de personnes,
  rénovation de logement ≥ 10 ans.
- **12 %** : restauration (hors boissons), logement social, margarine, produits phyto.
- **21 %** : le reste (taux normal par défaut).
- **id source :** `fisc-tva-ar20-exemples` — **statut : confirmé** — consultation 2026-05-29.

---

## 2. Régimes

### 2.1 Régime normal
Déclarations périodiques (mensuelles ou trimestrielles, voir §3).

### 2.2 Régime de la franchise de la taxe
**FR** — Régime de la franchise de la taxe. **NL** — Vrijstellingsregeling van belasting.
*(glossaire `regime_franchise` — confirmé)*

- Seuil de chiffre d'affaires : **25.000 EUR** HT/an.
- Tolérance de dépassement : **10 %** (maximum **27.500 EUR**).
- Dépassement > 10 % → passage au régime normal dès l'opération franchissante ;
  dépassement ≤ 10 % → perte du bénéfice l'année suivante.
- Identification via formulaires **604A / 604B**.
- **Source :** SPF Finances — Régime de la franchise, https://finances.belgium.be/fr/entreprises/tva/assujettissement-tva/regime-franchise-taxe
- **id source :** `fisc-tva-franchise` — **statut : confirmé** — consultation 2026-05-29

### 2.3 Régime forfaitaire — en extinction
- **Plus d'option possible depuis le 01/01/2022** ; **suppression définitive au 31/12/2027**.
- **Source :** SPF Finances — Régimes TVA, https://finances.belgium.be/fr/entreprises/tva/assujettissement-tva/regimes-tva
- **id source :** `fisc-tva-forfaitaire` — **statut : confirmé** — consultation 2026-05-29

---

## 3. Déclaration périodique via Intervat

**FR** — Déclaration périodique à la TVA. **NL** — Periodieke btw-aangifte.
*(glossaire `declaration_tva` — confirmé)*

### 3.1 Périodicité
- **Mensuelle** par défaut.
- **Trimestrielle** possible si **toutes** les conditions suivantes sont remplies :
  - chiffre d'affaires annuel ≤ **2.500.000 EUR** HT, **et**
  - CA des catégories sensibles (énergie, GSM, ordinateurs, véhicules) ≤ **250.000 EUR** HT, **et**
  - pas de relevé intracommunautaire mensuel > **50.000 EUR**.
- **Source :** SPF Finances — Déclaration périodique, https://finances.belgium.be/fr/entreprises/tva/declaration/declaration-periodique
- **id source :** `fisc-tva-periodicite` — **statut : confirmé** — consultation 2026-05-29

### 3.2 Échéances
- Déclaration **mensuelle** : **le 20** du mois suivant.
- Déclaration **trimestrielle** : **le 25** du mois suivant le trimestre.
- Plus d'acompte trimestriel.

> **Note** : les **dates varient chaque année** (report au 1er jour ouvrable si
> l'échéance tombe un week-end ou un jour férié). Toujours vérifier le calendrier
> officiel de l'année concernée. **Calendrier 2026 confirmé** (SPF Finances) :
>
> | Échéance | Dépôt + paiement 2026 |
> |----------|------------------------|
> | Mensuels — déc. 2025 | **20/01/2026** |
> | Mensuels — mai 2026 (report) | **22/06/2026** |
> | Mensuels — nov. 2026 (report) | **21/12/2026** |
> | Trimestriels — T4 2025 | **26/01/2026** |
> | Trimestriels — T1 2026 | **27/04/2026** |
> | Trimestriels — T2 2026 | **25/07/2026** |
> | Trimestriels — T3 2026 | **25/10/2026** |
> | Trimestriels — T4 2026 | **25/01/2027** |
> | Listing clients annuel + relevé IC annuel | **31/03/2026** |
>
> **Source :** SPF Finances — Calendrier TVA, https://finances.belgium.be/fr/entreprises/tva/calendrier-tva
> — id source `fisc-tva-calendrier-2026` — **statut : confirmé** — consultation 2026-06-01.

### 3.3 Relevé intracommunautaire
Mensuel (le 20) ou trimestriel (le 25) ; le seuil **50.000 EUR** impose le dépôt mensuel.
- **Source :** `fisc-tva-periodicite` — **confirmé**.

---

## 4. Listing clients annuel

**FR** — Listing annuel des clients assujettis. **NL** — Jaarlijkse klantenlisting (btw-belastingplichtigen).
*(glossaire `listing_clients` — confirmé)*

- À déposer au plus tard le **31 mars** (via Intervat).
- Petites entreprises sous franchise : déclaration via Intervat (même « néant »).
- **Source :** SPF Finances — Calendrier TVA / déclaration périodique ; RESEARCH §5.3.
- **id source :** `fisc-tva-periodicite` (+ RESEARCH §5.3) — **statut : confirmé** — consultation 2026-05-29

---

## 5. Numéro de TVA

Le numéro d'entreprise BCE/KBO (10 chiffres) est activé comme numéro de TVA lors de
l'identification (`inst-bce-format`, confirmé pour le format BCE).

Le numéro de TVA se compose de « **BE** » suivi du **numéro d'entreprise (10 chiffres)**.
- **Source :** SPF Économie — Identification à la TVA, https://economie.fgov.be/fr/themes/entreprises/creer-une-entreprise/demarches-pour-creer-une/lidentification-la-tva
- **id source :** `fisc-tva-numero-be` — **statut : confirmé** — consultation 2026-05-29

---

## 6. Modernisation de la chaîne TVA (loi du 12/03/2023, en vigueur par phases depuis le 01/01/2025)

**FR** — Nouvelle chaîne TVA. **NL** — Nieuwe btw-ketting.

La loi du **12/03/2023** modernisant la chaîne TVA et le recouvrement des créances (non)
fiscales est entrée en vigueur **par phases depuis le 01/01/2025** (circulaire 2024/C/6 du
27/01/2025). Les §3.2 ci-dessus (échéances 20 / 25) en sont la première conséquence.
- **id source :** `fisc-tva-chaine-loi` — **statut : confirmé** — consultation 2026-09-08

### 6.1 Compte-provisions TVA (remplace le compte courant)
- En vigueur depuis le **01/05/2026** (communication SPF Finances du 04/03/2026 ; report
  technique depuis octobre 2025). Premières déclarations traitées : **avril 2026** (mensuels,
  dépôt 20/05/2026) et **T2 2026** (trimestriels, dépôt 25/07/2026).
- Compte numérique tenu par le SPF pour chaque assujetti : crédits non remboursés + versements
  anticipés volontaires. Le SPF y **puise automatiquement** les montants dus (déclaration,
  déclaration de substitution, intérêts de retard, amendes).
- Consultation, versements et demandes de remboursement **via MyMinfin**.
- Remboursement demandé dans la déclaration : limité au montant de la **grille 72** ; le solde
  du compte-provisions se demande séparément via MyMinfin.
- **id source :** `fisc-tva-compte-provisions` — **statut : confirmé** — consultation 2026-09-08

### 6.2 Numéros de compte de paiement
| Compte | Usage |
|--------|-------|
| **BE41 6792 0036 4210** (TVA/BTW) | Alimentation du compte-provisions, paiement anticipé, paiement de la déclaration (intérêts et amendes inclus) tant qu'aucun titre exécutoire n'est émis |
| **BE42 6792 0000 0054** | Paiement après titre exécutoire (déclaration périodique ou de substitution) |

> Un paiement sur un **ancien** numéro de compte n'est **pas conservé** : il est remboursé
> automatiquement sans transfert, avec risque de défaut de paiement (intérêts, amendes).
- **id source :** `fisc-tva-comptes-paiement` — **statut : confirmé** — consultation 2026-09-08

### 6.3 Proposition de déclaration de substitution
- En cas de **non-dépôt**, le SPF notifie une proposition de déclaration de substitution.
- L'assujetti dispose d'**un mois** pour déposer sa propre déclaration ; passé ce délai, la
  déclaration de substitution devient **définitive** et aucune déclaration périodique ne peut
  plus être déposée pour la période.
- Amende en cas de déclaration de substitution définitive : **15 %** de la taxe due (brochure SPF).
- Dette minimale fixée par la substitution : 2.100 EUR — **À VÉRIFIER — source non confirmée**
  (source secondaire ; ne pas utiliser en calcul).
- **id source :** `fisc-tva-declaration-substitution` — **statut : confirmé partiel** — consultation 2026-09-08

### 6.4 Remboursements et tolérances
- **Déclarants mensuels** : remboursement mensuel **automatique** (case « demander le
  remboursement » dans la déclaration), sans autorisation préalable.
- **Fin du régime de tolérance « vacances »** (juillet/août) pour les délais de dépôt ;
  application souple des amendes annoncée pour la période transitoire 2026 (ITAA).
- **id source :** `fisc-tva-remboursement-mensuel` — **statut : confirmé** — consultation 2026-09-08

**Conséquence pratique (règle du skill) :** toujours déposer la déclaration, même en retard,
et vérifier l'ordre de virement (BE41 6792 0036 4210) avant chaque paiement.

---

## 7. Facturation électronique B2B (Peppol) et e-reporting

**FR** — Facturation électronique structurée. **NL** — Gestructureerde elektronische facturatie.

- **Obligatoire depuis le 01/01/2026** pour les transactions **B2B** entre assujettis établis
  en Belgique (loi du 06/02/2024) : format structuré **EN 16931**, profil **Peppol-BIS**, via le
  **réseau Peppol**. Un PDF simple ne satisfait **pas** l'obligation. Détail, archivage et
  mentions obligatoires : voir le skill `classeur-be` (`references/facturation.md`).
- **id source :** `facture-electronique-2026` — **statut : confirmé** (registre central)
- **e-reporting 2028** : avant-projet de loi approuvé au Conseil des ministres du 18/07/2026
  (e-reporting quasi temps réel via Peppol « 5 coins » prévu au 01/01/2028, suppression du
  listing clients annuel). **À VÉRIFIER — source non confirmée** (non publié au Moniteur) :
  ne pas l'utiliser en calcul ni dans l'échéancier.
- **id source :** `av-tva-e-reporting-2028` — **statut : à vérifier** — consultation 2026-09-08
- Incitants fiscaux (déduction 120 % des abonnements logiciels de facturation 2024-2027,
  déduction pour investissement numérique 20 %) : **À VÉRIFIER — source non confirmée**.
- **id source :** `av-fisc-deduction-logiciels-facturation` — **statut : à vérifier**
