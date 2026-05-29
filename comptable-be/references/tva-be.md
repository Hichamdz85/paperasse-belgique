# TVA / BTW — Taxe sur la valeur ajoutée

> Référence du skill `comptable-be`. Données sourcées et datées (consultation : 2026-05-29).
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

> **À VÉRIFIER — source non confirmée** : les **dates exactes décalées** du calendrier TVA
> (variables chaque année, jours fériés/week-ends). RESEARCH §8 #13 — statut `a_verifier`.
> Annoncer la règle (le 20 / le 25), pas une date dérogatoire non confirmée.

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
