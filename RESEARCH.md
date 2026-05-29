# RESEARCH.md — Paperasse Belgique (Phase 0 / Cadrage)

> **Objet.** Cadrage juridique et comptable belge servant de socle vérifié au dépôt de skills `paperasse-be` (skills Claude Code) et à la landing page bilingue.
> **Date de consultation de toutes les sources :** 2026-05-29.
> **Année de référence fiscale :** exercice d'imposition 2026 (revenus 2025).
> **Périmètre v1 :** entreprises/sociétés belges (FR/NL). Hors périmètre v1 : Communauté germanophone (DE).

---

## RÈGLE DE SOURCING (rappel)

Chaque donnée chiffrée ou règle juridique porte : **valeur + source officielle + date de consultation (2026-05-29) + statut**.

- **`confirmé`** : vérifié directement sur une source officielle belge (SPF Finances / FOD Financiën, BNB / NBB, CNC / CBN, BCE/KBO via SPF Économie, notaire.be / notaris.be, portails régionaux, Moniteur belge).
- **`à vérifier`** : cohérent entre sources mais non confirmé sur la source officielle primaire, ou réforme récente à reconfirmer.

**Aucun chiffre n'a été inventé.** Tout point non confirmé est listé en section 8 « À VÉRIFIER » et **ne doit pas être utilisé dans un calcul** tant qu'il n'est pas confirmé.

---

## 1. Système comptable belge — PCMN / MAR

### 1.1 Définition
Le **PCMN** (Plan Comptable Minimum Normalisé) — NL **MAR** (Minimumindeling van het algemeen rekeningenstelsel) — est le plan comptable obligatoire pour toute entreprise tenue à la comptabilité en partie double (SRL/BV, SA/NV, ASBL, etc.).
**Source :** CNC/CBN, https://www.cnc-cbn.be/fr/node/2250 — `confirmé`

### 1.2 Base légale
Le **PCMN entreprises** est porté par l'**Arrêté royal du 21 octobre 2018** (Annexe 1re, exécution des art. III.82 à III.95 CDE), qui **abroge l'AR du 12 septembre 1983**. L'**Arrêté royal du 29 avril 2019** (exécution du CSA) fixe la **forme et le contenu des comptes annuels** (schémas complet/abrégé/micro).
**Source :** CNC/CBN https://www.cnc-cbn.be/fr/node/1635 et https://www.cnc-cbn.be/fr/node/2250 ; Moniteur belge (ejustice). — `confirmé` (2e vérif 2026-05-29)

### 1.3 Structure des classes
| Classe | Contenu |
|--------|---------|
| 0 | Droits et engagements hors bilan |
| 1 | Fonds propres, provisions et dettes à plus d'un an |
| 2 | Frais d'établissement, actifs immobilisés, créances à plus d'un an |
| 3 | Stocks et commandes en cours |
| 4 | Créances et dettes à un an au plus |
| 5 | Placements de trésorerie et valeurs disponibles |
| 6 | Charges |
| 7 | Produits |
| 8 et 9 | Usage libre/optionnel (note 29 du PCMN ; peuvent numéroter les droits et engagements hors bilan ; « comptabilité analytique » = doctrine, non textuel) — `confirmé` (2e vérif 2026-05-29) |

Classes 1–5 = bilan ; classes 6–7 = compte de résultats.
**Source :** CNC/CBN https://www.cnc-cbn.be/fr/node/2250 — `confirmé` (classes 0–7)

---

## 2. Schémas de comptes annuels & critères de taille (CSA)

Trois schémas : **complet** (volledig), **abrégé** (verkort), **micro** (micro).

### 2.1 Micro-société — art. 1:25 CSA
Ne dépasse pas plus d'un des seuils suivants (et n'est ni mère ni filiale) :
- Travailleurs (moyenne annuelle) : **10**
- Chiffre d'affaires annuel HT : **900.000 €** (depuis 01/01/2024 ; avant 700.000 €)
- Total du bilan : **450.000 €** (depuis 01/01/2024 ; avant 350.000 €)

**Source :** BNB/NBB — Size criteria, https://www.nbb.be/en/central-balance-sheet-office/preparation-and-filing/what-file/size-criteria/companies — `confirmé`

### 2.2 Petite société — art. 1:24 CSA
Ne dépasse pas plus d'un des seuils suivants :
- Travailleurs (moyenne annuelle) : **50**
- Chiffre d'affaires annuel net HT : **11.250.000 €** (depuis 01/01/2024 ; avant 9.000.000 €)
- Total du bilan : **6.000.000 €** (depuis 01/01/2024 ; avant 4.500.000 €)

**Source :** CNC/CBN https://www.cnc-cbn.be/fr/node/2294 ; BNB/NBB (lien ci-dessus) — `confirmé`

### 2.3 Grande société
Dépasse plus d'un des critères de l'art. 1:24, ou société cotée. Mêmes valeurs-seuils que 2.2, mais dépassées.
**Source :** BNB/NBB (lien ci-dessus) — `confirmé`

### 2.4 Règle de dépassement (effet décalé)
Le (non-)dépassement de plus d'un critère ne produit effet que s'il dure **deux exercices consécutifs** ; conséquences à partir de l'exercice suivant.
**Source :** CNC/CBN — Avis « Impact de la hausse des critères de taille », https://www.cnc-cbn.be/fr/avis/impact-de-la-hausse-des-criteres-de-taille-pour-les-societes — `confirmé`

### 2.5 Correspondance schéma / taille
Micro → schéma micro ; petite → schéma abrégé ; grande → schéma complet (une petite/micro peut volontairement déposer un schéma plus détaillé).
**Source :** modèles de dépôt BNB/NBB — `confirmé` (logique) ; référence d'article CSA verbatim → section 8

---

## 3. Dépôt des comptes annuels à la BNB (Centrale des bilans / Balanscentrale)

### 3.1 Délais
- AG dans les **6 mois** de la clôture.
- Dépôt dans les **30 jours** de l'approbation par l'AG.
- Délai limite absolu : **7 mois** après la clôture.
- Base : art. 3:1, 3:10, 3:12 CSA.

**Source :** BNB/NBB — Filing deadline, https://www.nbb.be/en/central-balance-sheet-office/preparation-and-filing/when-and-how-file/filing-deadline — `confirmé`

### 3.2 Format
Deux formats : **XBRL** (structuré, standard) et **PDF**, via l'application Filing de la Centrale des bilans.
**Source :** BNB/NBB — Filing fees (lien ci-dessous) — `confirmé`

### 3.3 Frais de dépôt 2026 — sociétés
> **Pas de mention « TVAC »** sur les pages tarifs BNB ; la TVA sur la part BNB est supprimée depuis le 01/01/2017. — `confirmé` (2e vérif 2026-05-29)

| Modèle | XBRL | PDF |
|--------|------|-----|
| Complet (volledig) | **379,50 €** | **449,70 €** |
| Abrégé (verkort) | **89,40 €** | **159,50 €** |
| Micro | **67,00 €** | **137,30 €** |

Dépôt corrigé : complet/abrégé **86,00 €** ; micro **54,70 €**. CbCR : **86,00 €**.
**Source :** BNB/NBB — 2026 filing fees, https://www.nbb.be/en/central-balance-sheet-office/preparation-and-filing/how-and-how-much-pay/filing-fees-0 — `confirmé`

### 3.4 Paiement
Paiement reçu dans les **6 jours ouvrables** après marquage « prêt au paiement », sinon rejet automatique.
**Source :** BNB/NBB — How and how much to pay — `confirmé`

### 3.5 Surcharge dépôt tardif
Majoration en cas de dépôt tardif (art. 3:13 CSA), progressive selon le retard. Barème dès le **01/01/2026** :
| Type de société | Dès le 9e mois | 10e–12e mois | Dès le 13e mois |
|-----------------|----------------|--------------|-----------------|
| Petites (abrégé/micro) | **151 €** | **227 €** | **453 €** |
| Autres (complet) | **504 €** | **755 €** | **1.510 €** |

**Source :** BNB/NBB — Filing fee, https://www.nbb.be/en/central-balance-sheet-office/preparation-and-filing/how-and-how-much-pay/filing-fee — `confirmé` (2e vérif 2026-05-29)

---

## 4. Impôt des sociétés (ISoc / Vennootschapsbelasting)

### 4.1 Taux normal
**25 %** (depuis l'exercice d'imposition 2021 / période imposable ≥ 01/01/2020). Inchangé pour 2025 et 2026.
**Source :** SPF Finances — Déclaration ISoc, https://finances.belgium.be/fr/entreprises/impot_des_societes/declaration — `confirmé`

### 4.2 Taux réduit PME
**20 %** sur la première tranche de **100.000 €** de bénéfice imposable (art. 215, al. 2, CIR 92).
**Source :** SPF Finances — Explications ISoc 2025 (PDF), https://finances.belgium.be/sites/default/files/121-declaration-isoc-explications-2025.pdf — `confirmé`

**Conditions cumulatives :**
1. Être une **petite société** au sens de l'art. 1:24 §§1-6 CSA. — `confirmé`
2. **Rémunération minimale dirigeant** : à partir de l'**ex. d'imp. 2026**, au moins **50.000 €** (loi-programme du 18/07/2025 ; montant indexé ; avantages en nature plafonnés à 20 %, soit max 10.000 €) — **45.000 €** valait jusqu'à l'ex. d'imp. 2025 ; ou égale au revenu imposable de la société s'il est inférieur ; allouée à au moins un dirigeant (art. 32 CIR 92), à partir de la **5e période imposable** depuis la constitution. Base : art. 215 al. 3 c) CIR 92. — `confirmé` (2e vérif 2026-05-29)
3. **Exclusions de détention** : (a) participations > 50 % du capital libéré (sauf ≥75 %) ; (b) ≥ 50 % des parts détenues par une/des autres sociétés ; (c) non-respect de la rémunération dirigeant ; (d) certaines sociétés d'investissement/SIR/SICAF (art. 185bis CIR 92). Coopératives agréées (art. 8:4 CSA) échappent à (a) et (b). — `confirmé`
- **Exonération start-up** : pas de condition de rémunération minimale les 4 premières périodes imposables. — `confirmé`

### 4.3 Déclaration via Biztax
- Délai légal général : **dernier jour du 7e mois** suivant la clôture de l'exercice.
- Ex. d'imp. 2026 (bilan 31/12/2025) : **30 septembre 2026**. Report au 1er jour ouvrable suivant si week-end/férié.
**Source :** SPF Finances — Biztax https://finances.belgium.be/fr/E-services/biztax ; Délais https://finances.belgium.be/fr/E-services/biztax/delais-de-rentree-des-declarations — `confirmé`

### 4.4 Versements anticipés (VA)
Principe : 4 échéances trimestrielles pour éviter une majoration (pas de bonification pour les sociétés). Exonération pour la « petite société » sur les **3 premiers exercices** depuis la constitution.
**Source :** SPF Finances — Versements anticipés, https://finances.belgium.be/fr/entreprises/impot_des_societes/versements_anticipes — `confirmé` (principe)
- **Taux de majoration ex. d'imp. 2026 = 6,75 %** ; coefficients VA1–VA4 : **9,00 / 7,50 / 6,00 / 4,50 %**. Échéances 2025 : **10/04, 10/07, 10/10, 22/12/2025**. — `confirmé` (2e vérif 2026-05-29) ; **réserve : avis MB daté ex. d'imp. 2026 à confirmer** (la page SPF affichait ex. d'imp. 2027, même taux).

### 4.5 Précompte mobilier (dividendes)
Taux de base : **30 %**. (Taux réduits VVPRbis 15/20 % sous conditions — hors périmètre « standard ».)
**Source :** SPF Finances — Précompte mobilier, https://finances.belgium.be/fr/entreprises/impot_des_societes/Precomptes/precompte-mobilier — `confirmé`

### 4.6 Cotisation distincte (rémunération dirigeant insuffisante)
La cotisation distincte de **5,10 %** est **abrogée / inexistante** (retirée par le législateur en 2019). **Ne plus la mentionner.** La seule conséquence du non-respect de la rémunération minimale dirigeant = **perte du taux réduit** (retour à 25 %). L'art. **219quinquies CIR 92** vise désormais une cotisation de **10 %** (exit tax FIIS, depuis le 01/01/2024), sans rapport avec la rémunération dirigeant. — `confirmé` (2e vérif 2026-05-29)

---

## 5. TVA / BTW

### 5.1 Taux
| Code | Taux | Type |
|------|------|------|
| R03 | **21 %** | Taux normal |
| R02 | **12 %** | Taux intermédiaire |
| R01 | **6 %** | Taux réduit |
| R00 | **0 %** | Taux zéro (exceptionnel) |

Détail des biens/services par taux fixé par l'**AR n° 20** :
- **6 %** : eau, livres/journaux, médicaments, alimentation de base, transport de personnes, rénovation logement ≥ 10 ans.
- **12 %** : restauration (hors boissons), logement social, margarine, produits phyto.
- **21 %** : le reste.

**Source :** SPF Finances — Taux de TVA, https://finances.belgium.be/fr/entreprises/tva/assujettissement-tva/taux-et-calcul/taux-tva ; AR n° 20 — `confirmé` (2e vérif 2026-05-29)

### 5.2 Régimes
- **Régime normal** : déclarations périodiques.
- **Franchise (petites entreprises)** : seuil CA **25.000 € HT/an** ; tolérance de dépassement **10 %** (max 27.500 €). Dépassement > 10 % → passage au régime normal dès l'opération franchissante ; dépassement ≤ 10 % → perte du bénéfice l'année suivante. Identification via formulaires **604A / 604B**. — `confirmé`
- **Régime forfaitaire** : **en extinction** — plus d'option possible depuis le **01/01/2022**, suppression définitive au **31/12/2027**. — `confirmé`
**Source :** SPF Finances — Régimes TVA https://finances.belgium.be/fr/entreprises/tva/assujettissement-tva/regimes-tva ; Franchise https://finances.belgium.be/fr/entreprises/tva/assujettissement-tva/regime-franchise-taxe

### 5.3 Déclaration via Intervat
- **Mensuelle** par défaut. **Trimestrielle** possible si : CA annuel ≤ **2.500.000 € HT** ET CA catégories sensibles (énergie, GSM, ordinateurs, véhicules) ≤ **250.000 € HT** ET pas de relevé IC mensuel > **50.000 €**.
- Délais : mensuelle **le 20** du mois suivant ; trimestrielle **le 25** du mois suivant le trimestre (dates ponctuellement décalées). Plus d'acompte trimestriel.
- **Listing clients annuel** : au plus tard le **31 mars**. Petites entreprises sous franchise : déclaration via Intervat (même « néant », délai jusqu'au 30/04/2026 pour 2025).
- **Relevé intracommunautaire** : mensuel (le 20) ou trimestriel (le 25) ; seuil 50.000 € impose le mensuel.
**Source :** SPF Finances — Déclaration périodique https://finances.belgium.be/fr/entreprises/tva/declaration/declaration-periodique ; Calendrier TVA https://finances.belgium.be/fr/entreprises/tva/calendrier-tva — `confirmé` (seuils) ; dates exactes variables/an → section 8

---

## 6. Numéro d'entreprise BCE / KBO

- **Format : 10 chiffres**, le premier étant **0** (entités existantes) ou **1** (nouvelles entités depuis le **19/09/2023**, série « 0 » épuisée).
- Identifiant **unique, obligatoire, à vie**, non transférable.
- À l'identification TVA, le numéro d'entreprise est **activé comme numéro de TVA** : **N° TVA = « BE » + n° d'entreprise (10 chiffres)**. — `confirmé` (2e vérif 2026-05-29)
- Vérification officielle : **BCE Public Search**.
**Source :** SPF Économie — Inscription BCE https://economie.fgov.be/fr/themes/entreprises/banque-carrefour-des/inscription-la-banque ; passage au « 1 » https://news.economie.fgov.be/228779-les-numeros-d-entreprise-passent-au-1/ — `confirmé`

---

## 7. Notariat — droits par région (TOUJOURS préciser la région)

> **Réformes récentes majeures** : Flandre (habitation propre 3 %→**2 %** depuis 2025, durcissement 2026), Wallonie (12,5 %→**3 %** depuis 2025, abattement supprimé), Bruxelles (abattement porté à **200.000 €** depuis 2025).

### 7.1 Droits d'enregistrement — achat habitation propre et unique

**Bruxelles-Capitale**
- Taux de base : **12,5 %**. — `confirmé`
- Abattement : pas de droits sur la **1re tranche de 200.000 €** (depuis 2025) ; **bonus PEB +25.000 €/classe dès 2 classes** (max **+100.000 €** à 4 classes) ; plafond de prix **600.000 €**. **Précision : pas de « 250.000 € fixe »** — c'est le scénario à 2 classes PEB.
- **Source :** notaire.be — abattement Bruxelles, https://www.notaire.be/immobilier/acheter-et-vendre-un-bien-immobilier/les-frais-lies-lachat/droits-denregistrement-reduction-et-abattement-bruxelles ; be.brussels — `confirmé` (2e vérif 2026-05-29)

**Région flamande**
- Taux standard (verkooprecht) : **12 %** ; habitation propre et unique : **2 %** (depuis 01/01/2025). Le taux **1 % « monument classé »** pour l'habitation propre/unique est **aboli depuis le 01/01/2025**. Le **1 % « rénovation énergétique majeure » (IER)** subsiste (conditions durcies 01/01/2026).
- Durcissement 01/01/2026 (personnes physiques, pleine propriété, domiciliation 3 ans + maintien 1 an).
- **Source :** vlaanderen.be https://www.vlaanderen.be/verkooprechten-bij-de-aankoop-van-de-enige-eigen-woning ; Agentschap Onroerend Erfgoed ; notaris.be — `confirmé` (2e vérif 2026-05-29)

**Région wallonne**
- Taux ordinaire : **12,5 %** ; habitation propre et unique : **3 %** (depuis 01/01/2025). Abattement **supprimé** depuis 2025.
- **Source :** wallonie.be ; Circulaire 2025/C/42 du 05/07/2025 — `confirmé` (3 %)

### 7.2 Droits de succession / Erfbelasting (régional, progressif, par héritier)
- **Bruxelles** : ligne directe/conjoint 3 %→30 % ; frères/sœurs 20 %→65 % ; oncles/neveux 35 %→70 % ; autres 40 %→80 %. Logement familial : exemption conjoint/cohabitant. — `confirmé`
- **Wallonie** : ligne directe/conjoint 3 %→30 % ; frères/sœurs 20 %→65 % ; oncles/neveux 25 %→70 % ; autres 30 %→80 %. — `confirmé`
- **Flandre (erfbelasting)** : ligne directe/partenaires **3 %** (0–50.000) / **9 %** (50.000–250.000) / **27 %** (>250.000) ; meubles et immeubles taxés séparément. **Réforme 01/01/2026** : abattement partenaire mobilier porté à **75.000 €** (avant 50.000) ; la « **singlevermindering** » remplace la « vriendenerfenis ». — `confirmé` (2e vérif 2026-05-29) ; source à durcir sur belastingen.vlaanderen.be.
- **Sources :** notaire.be (tarifs Bruxelles/Wallonie) ; belastingen.vlaanderen.be (Flandre)

### 7.3 Droits de donation / Schenkbelasting (régional)
Principe : donation **mobilière** (taux fixes réduits) vs **immobilière** (barèmes progressifs).

**Donation MOBILIÈRE** — `confirmé` (2e vérif 2026-05-29) :
- **Flandre & Bruxelles** : **3 %** (ligne directe / époux / cohabitants) / **7 %** (autres).
- **Wallonie** : **3,3 %** / **5,5 %**.

**Donation IMMOBILIÈRE** :
- **Flandre** (ligne directe) : **3 %** (0–150.000) / **9 %** (150.000–250.000) / **18 %** (250.000–450.000) / **27 %** (>450.000). — `confirmé` (2e vérif 2026-05-29)
- **Bruxelles & Wallonie** : barèmes immobiliers **restent à vérifier** (section 8 #17).

**Source :** notaire.be — `confirmé` (mobilier 3 régions ; immobilier Flandre)

### 7.4 Frais de notaire
Trois blocs : (1) droits d'enregistrement (régional) ; (2) **honoraires tarifés par AR fédéral**, dégressifs, identiques chez tous les notaires ; (3) frais administratifs/débours.

**Barème des honoraires (AR du 16/12/1950, dégressif, identique chez tous les notaires) + TVA 21 % :**
| Tranche (€) | Taux |
|-------------|------|
| 0 – 7.500 | **4,56 %** |
| 7.500 – 17.500 | **2,85 %** |
| 17.500 – 30.000 | **2,28 %** |
| 30.000 – 45.495 | **1,71 %** |
| 45.495 – 64.095 | **1,14 %** |
| 64.095 – 250.095 | **0,57 %** |
| > 250.095 | **0,057 %** |

Constitution SRL/BV : honoraires non tarifés (ordre de grandeur 750–1.200 € HTVA — *à vérifier*).
**Source :** notaire.be — frais liés à l'achat ; AR 16/12/1950 — `confirmé` (2e vérif 2026-05-29 ; bornes € à confirmer sur l'annexe → section 8 #18)

### 7.5 Plus-values immobilières (impôt FÉDÉRAL)
- Bien bâti revendu **dans les 5 ans** : plus-value taxée à **16,5 %**. Exonération totale pour la **résidence principale**. Impôt fédéral (identique 3 régions).
- **Nouvelle taxe plus-values (01/01/2026)** : **10 %** sur les **actifs financiers** (pas l'immobilier résidentiel) ; **exonération 10.000 €/an** (report max **15.000 €** sur 5 ans) ; **valeur de référence au 31/12/2025** ; régime **opt-in** (retenue 10 % par la banque) ou **opt-out** (déclaration à l'IPP). — `confirmé` (2e vérif 2026-05-29)
**Source :** notaire.be ; SPF Finances — `confirmé`

### 7.6 Constitution SRL/BV
**Acte authentique notarié obligatoire** (condition de validité, CSA). Plan financier obligatoire ; e-filing (BCE + Moniteur belge).
**Source :** notaire.be — La SRL — `confirmé`

---

## 8. À VÉRIFIER (ne pas utiliser dans un calcul tant que non confirmé)

| # | Élément | Statut |
|---|---------|--------|
| 1 | Datation canonique de l'AR fondant le PCMN | **RÉSOLU (2e vérif 2026-05-29)** — AR du 21/10/2018 (abroge AR 12/09/1983) ; AR 29/04/2019 = schémas comptes annuels |
| 2 | Définition normative exacte des classes PCMN 8 et 9 | **RÉSOLU (2e vérif 2026-05-29)** — usage libre/optionnel (note 29 PCMN) |
| 3 | Référence d'article CSA imposant chaque schéma (complet/abrégé/micro) | À VÉRIFIER |
| 4 | Montants 2026 de la surcharge dépôt tardif (art. 3:13 CSA) | **RÉSOLU (2e vérif 2026-05-29)** — 151/227/453 € (petites) ; 504/755/1.510 € (autres) |
| 5 | Composition détaillée des comptes annuels par schéma | À VÉRIFIER |
| 6 | Frais BNB 2026 : mention « TVAC » verbatim | **RÉSOLU (2e vérif 2026-05-29)** — pas de « TVAC » ; TVA part BNB supprimée depuis 01/01/2017 |
| 7 | Taux de majoration VA ISoc ex. d'imp. 2026 (revenus 2025) | **RÉSOLU (2e vérif 2026-05-29)** — 6,75 % (réserve : avis MB daté ex. imp. 2026 à confirmer) |
| 8 | Rémunération dirigeant 45.000 € vs 50.000 € pour 2026 | **RÉSOLU (2e vérif 2026-05-29)** — 50.000 € dès ex. imp. 2026 (loi-programme 18/07/2025) |
| 9 | Seuils chiffrés art. 1:24 CSA repris dans le texte CSA (cohérents avec BNB) | **RÉSOLU (2e vérif 2026-05-29)** — 50 / 11.250.000 € / 6.000.000 € |
| 10 | Taux exact cotisation distincte (5,10 %) rémunération dirigeant | **RÉSOLU (2e vérif 2026-05-29)** — abrogée/inexistante ; seule conséquence = perte du taux réduit |
| 11 | Exemples de biens/services par taux TVA (AR n° 20) | **RÉSOLU (2e vérif 2026-05-29)** — exemples 6/12/21 % confirmés |
| 12 | Composition « BE + numéro d'entreprise » du numéro de TVA | **RÉSOLU (2e vérif 2026-05-29)** — BE + 10 chiffres |
| 13 | Dates exactes décalées du calendrier TVA (variables chaque année) | À VÉRIFIER (calendrier officiel annuel) |
| 14 | Bruxelles : abattement/taux confirmés sur be.brussels | **RÉSOLU (2e vérif 2026-05-29)** — 12,5 % / abattement 200.000 € / bonus PEB +25.000 €/classe (max +100.000 €) / plafond 600.000 € |
| 15 | Flandre : monument 1 %, sort du taux rénovation énergétique 2025 | **RÉSOLU (2e vérif 2026-05-29)** — monument 1 % aboli depuis 01/01/2025 ; 1 % IER subsiste |
| 16 | Flandre : barème erfbelasting détaillé + réforme 2026 | **RÉSOLU (2e vérif 2026-05-29)** — 3/9/27 % ; réforme 2026 (abattement partenaire mobilier 75.000 €, singlevermindering) |
| 17 | Barèmes de donation **immobilière** Bruxelles & Wallonie (mobilier 3 régions + immobilier Flandre = résolus) | À VÉRIFIER (portails régionaux) |
| 18 | Honoraires notariaux : bornes € de l'annexe AR fédéral + coût constitution SRL | À VÉRIFIER (barème de taux résolu ; bornes € à confirmer) |
| 19 | Références MB précises nouvelle taxe plus-values 2026 (modalités opt-in/opt-out résolues) | À VÉRIFIER (réf. MB précises) |
| 20 | Langue de dépôt comptes/déclarations/actes à Bruxelles (choix FR/NL) | **RÉSOLU (2e vérif 2026-05-29)** — FR ou NL, mais toutes les pièces dans UNE seule langue (art. 2:33 CSA + art. 3:67 §3 AR exéc. CSA) |
| 21 | Sigle/intitulé NL exact du MAR | **RÉSOLU (2e vérif 2026-05-29)** — « Minimumindeling van het algemeen rekeningenstelsel (MAR) » (rekening**en**stelsel) |
| 22 | Appariement régional FR/NL : `successierechten` (féd.) vs `erfbelasting` (Flandre) | **RÉSOLU (2e vérif 2026-05-29)** — féd.+Wallonie : successie-/registratie-/schenkingsrechten ; Flandre : erf-/registratie-/schenkbelasting |

---

## 9. Bilinguisme FR/NL — règles par région

- **Règle pivot** : art. 52 des lois coordonnées sur l'emploi des langues → l'entreprise emploie la langue de la région de son **siège d'exploitation**.
- **Région flamande** : **NL** (décret du 19/07/1973).
- **Région wallonne** : **FR** (décret du 30/06/1982). Communes germanophones = **DE**, hors périmètre v1.
- **Bruxelles-Capitale** : **bilingue FR/NL** — pour un **dépôt** (comptes, déclarations, actes), on choisit **une** des langues officielles (FR ou NL), mais **toutes les pièces doivent être dans UNE SEULE ET MÊME langue** (art. **2:33 CSA** + art. **3:67 §3** de l'AR d'exécution du CSA). **Pas de mélange.** — `confirmé` (2e vérif 2026-05-29)
- **Documents officiels générés** (PV, dépôt BNB, checklists) : produits dans la **langue de la région**, ou, pour Bruxelles, **dans une langue homogène** (FR ou NL, sans panachage).
**Source :** Adjoint du Gouverneur — législation linguistique entreprises, https://www.adjunctvandegouverneur.be/fr/information/la-legislation-linguistique-et-les-entreprises/exigences-linguistiques-les-entreprises ; CNC/CBN + BNB « Filing language » — `confirmé` (2e vérif 2026-05-29)

**Mapping pour `company.json` :**
| `region` | `langue` |
|----------|----------|
| `bruxelles` | `fr-nl` (bilingue) |
| `flandre` | `nl` |
| `wallonie` | `fr` |

---

## 10. Glossaire bilingue FR/NL (extrait — source de vérité = `glossaire-fr-nl.json`)

| FR | NL | Statut |
|----|----|--------|
| Impôt des sociétés (ISoc) | Vennootschapsbelasting (Ven.B) | confirmé |
| TVA | Btw | confirmé |
| Précompte mobilier | Roerende voorheffing | confirmé |
| Précompte professionnel | Bedrijfsvoorheffing | confirmé |
| Versements anticipés | Voorafbetalingen | confirmé |
| SPF Finances | FOD Financiën | confirmé |
| Banque-Carrefour des Entreprises (BCE) | Kruispuntbank van Ondernemingen (KBO) | confirmé |
| Numéro d'entreprise | Ondernemingsnummer | confirmé |
| Société à responsabilité limitée (SRL) | Besloten Vennootschap (BV) | confirmé |
| Société anonyme (SA) | Naamloze Vennootschap (NV) | confirmé |
| Code des sociétés et des associations (CSA) | Wetboek van vennootschappen en verenigingen (WVV) | confirmé |
| Moniteur belge | Belgisch Staatsblad | confirmé |
| Banque Nationale de Belgique (BNB) | Nationale Bank van België (NBB) | confirmé |
| Centrale des bilans | Balanscentrale | confirmé |
| Comptes annuels | Jaarrekening | confirmé |
| Bilan | Balans | confirmé |
| Compte de résultats | Resultatenrekening | confirmé |
| Assemblée générale | Algemene vergadering | confirmé |
| Procès-verbal (PV) | Notulen | confirmé |
| Plan comptable minimum normalisé (PCMN) | Minimumindeling van het algemeen rekeningenstelsel (MAR) | confirmé (2e vérif 2026-05-29 ; rekening**en**stelsel) |
| Exercice comptable | Boekjaar | confirmé |
| Notaire | Notaris | confirmé |
| Acte authentique | Authentieke akte | confirmé |
| Droits d'enregistrement | Registratierechten / Registratiebelasting (Flandre) | confirmé (nuance régionale) |
| Droits de succession | Erfbelasting (Flandre) / successierechten (féd.) | confirmé (nuance régionale) |
| Droits de donation | Schenkbelasting (Flandre) / schenkingsrechten (féd.) | confirmé (nuance régionale) |
| Siège d'exploitation | Exploitatiezetel | confirmé |

> **Nuance critique** : pour enregistrement/succession/donation, le terme NL dépend de la région compétente (Flandre/VLABEL = `-belasting` ; fédéral = `-rechten`). À apparier au cas par cas.

---

## 11. Sources officielles (récapitulatif)

- **SPF Finances / FOD Financiën** — finances.belgium.be / financien.belgium.be
- **BNB / NBB — Centrale des bilans / Balanscentrale** — nbb.be
- **CNC / CBN (Commission des Normes Comptables)** — cnc-cbn.be
- **SPF Économie — BCE/KBO** — economie.fgov.be
- **Notariat (Fednot)** — notaire.be / notaris.be
- **Portails régionaux** — be.brussels (fiscalite.brussels), vlaanderen.be / belastingen.vlaanderen.be (VLABEL), wallonie.be
- **Moniteur belge / Belgisch Staatsblad** — ejustice.just.fgov.be
- **Législation linguistique** — adjunctvandegouverneur.be

---

*Document de cadrage Phase 0. À valider avant Phase 1. Les 22 points de la section 8 « À VÉRIFIER » devront être soit confirmés par recherche complémentaire, soit affichés avec la mention « À VÉRIFIER — source non confirmée » et exclus de tout calcul.*
