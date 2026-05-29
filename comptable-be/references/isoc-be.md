# ISoc / Ven.B — Impôt des sociétés

> Référence du skill `comptable-be`. Données sourcées et datées (consultation : 2026-05-29).
> **FR** — Impôt des sociétés (ISoc). **NL** — Vennootschapsbelasting (Ven.B).
> *(glossaire `isoc` — confirmé)*. Année de référence : exercice d'imposition 2026 (revenus 2025).

---

## 1. Taux normal

**25 %** (depuis l'exercice d'imposition 2021). Inchangé pour 2025 et 2026.

- **Source :** SPF Finances — Déclaration ISoc, https://finances.belgium.be/fr/entreprises/impot_des_societes/declaration
- **id source :** `fisc-isoc-taux-normal` — **statut : confirmé** — consultation 2026-05-29

---

## 2. Taux réduit PME

**20 %** sur la **première tranche de 100.000 EUR** de bénéfice imposable (art. 215, al. 2, CIR 92).

- **Source :** SPF Finances — Explications ISoc 2025 (PDF), https://finances.belgium.be/sites/default/files/121-declaration-isoc-explications-2025.pdf
- **id source :** `fisc-isoc-taux-reduit` — **statut : confirmé** — consultation 2026-05-29

### Conditions cumulatives (les 3 doivent être remplies)

1. **Petite société** au sens de l'art. 1:24 CSA / WVV.
   *(glossaire `petite_societe` — confirmé ; seuils : `compta-seuil-petite`, confirmé)*

2. **Rémunération minimale dirigeant** (art. 215, al. 3, c, CIR 92), allouée à au moins un
   dirigeant personne physique, à partir de la **5e période imposable** depuis la constitution,
   ou égale au revenu imposable de la société s'il est inférieur :
   - **À partir de l'exercice d'imposition 2026 : 50.000 EUR** (loi-programme du 18/07/2025 ;
     montant **indexé**). Les **avantages de toute nature** sont admis dans cette rémunération
     à concurrence de **maximum 20 %**, soit **10.000 EUR** au maximum.
   - **Jusqu'à l'exercice d'imposition 2025 : 45.000 EUR**.
   - **id source :** `fisc-isoc-remuneration` — **statut : confirmé** (2e vérif 2026-05-29).
     **Utiliser 50.000 EUR pour l'ex. imp. 2026 (revenus 2025) ; 45.000 EUR pour les exercices ≤ 2025.**

3. **Exclusions de détention** :
   - (a) participations > 50 % du capital libéré (sauf si ≥ 75 %) ;
   - (b) ≥ 50 % des parts détenues par une/des autres sociétés ;
   - (c) non-respect de la rémunération dirigeant ;
   - (d) certaines sociétés d'investissement / SIR / SICAF (art. 185bis CIR 92).
   - Coopératives agréées (art. 8:4 CSA) échappent à (a) et (b).
   - **id source :** `fisc-isoc-taux-reduit` — **statut : confirmé**.

### Exonération start-up
Pas de condition de **rémunération minimale** durant les **4 premières périodes imposables**.
- **Source :** SPF Finances — Explications ISoc 2025 (PDF) — **confirmé**.

---

## 3. Versements anticipés (VA)

**FR** — Versements anticipés. **NL** — Voorafbetalingen. *(glossaire `versements_anticipes` — confirmé)*

- Principe : **4 échéances trimestrielles** pour éviter une **majoration** (pas de bonification
  pour les sociétés).
- Exonération pour la « petite société » sur les **3 premiers exercices** depuis la constitution.
- **Source :** SPF Finances — Versements anticipés, https://finances.belgium.be/fr/entreprises/impot_des_societes/versements_anticipes — **confirmé** (principe).

### Taux de majoration — exercice d'imposition 2026 (revenus 2025)

- **Taux global de majoration : 6,75 %.**
- Avantages (coefficients selon le trimestre de versement) — **VA1 : 9,00 % · VA2 : 7,50 % ·
  VA3 : 6,00 % · VA4 : 4,50 %**.
- **id source :** `fisc-isoc-majoration-2026` — **statut : confirmé avec réserve** (2e vérif
  2026-05-29). *Réserve : avis du Moniteur belge daté pour l'ex. imp. 2026 à confirmer.*

---

## 4. Précompte mobilier (dividendes)

Taux de base : **30 %**.
**FR** — Précompte mobilier. **NL** — Roerende voorheffing. *(glossaire `precompte_mobilier` — confirmé)*

- (Taux réduits VVPRbis 15/20 % sous conditions — hors périmètre « standard ».)
- **Source :** SPF Finances — Précompte mobilier, https://finances.belgium.be/fr/entreprises/impot_des_societes/Precomptes/precompte-mobilier
- **id source :** `fisc-precompte-mobilier` — **statut : confirmé** — consultation 2026-05-29

---

## 5. Rémunération dirigeant insuffisante — conséquence

> **Pas de cotisation distincte.** La cotisation distincte de **5,10 %** autrefois citée est
> **abrogée / inexistante** : ne pas l'appliquer dans un calcul.

La **seule conséquence** du non-respect de la rémunération minimale du dirigeant (cf. §2) est
la **perte du bénéfice du taux réduit** : la société est alors imposée au **taux normal de 25 %**.

- L'**article 219quinquies CIR 92** vise désormais une cotisation de **10 %** (exit tax FIIS,
  depuis le **01/01/2024**) — sans rapport avec la rémunération dirigeant.
- **id source :** `fisc-isoc-cotisation-distincte` — **statut : confirmé** (2e vérif 2026-05-29).

---

## 6. Déclaration via Biztax

- Délai légal général : **dernier jour du 7e mois** suivant la clôture de l'exercice.
- Exercice d'imposition 2026 (bilan 31/12/2025) : **30 septembre 2026** (report au 1er jour
  ouvrable suivant si week-end / jour férié).
- **Source :** SPF Finances — Biztax / Délais, https://finances.belgium.be/fr/E-services/biztax/delais-de-rentree-des-declarations
- **id source :** `fisc-isoc-biztax-delai` — **statut : confirmé** — consultation 2026-05-29

---

## 7. TVA — taux et exemples (AR n°20)

Les taux de TVA et leur ventilation par bien/service relèvent de l'**AR n°20**.

| Taux | Exemples (AR n°20) |
|------|--------------------|
| **6 %** | Eau ; livres ; médicaments ; alimentation de base ; transport de personnes ; rénovation d'habitations privées de **≥ 10 ans** |
| **12 %** | Restauration (hors boissons) ; logement social ; margarine |
| **21 %** | Taux normal — tout le reste |

- **id source :** `fisc-tva-ar20-exemples` — **statut : confirmé** (2e vérif 2026-05-29).
- **Source :** SPF Finances — Taux de TVA, https://finances.belgium.be/fr/faq/les-taux-de-tva ; AR n°20.

---

## 8. Numéro de TVA

Le **numéro de TVA belge** = préfixe **« BE »** + le **numéro d'entreprise** (10 chiffres).

- **id source :** `fisc-tva-numero-be` — **statut : confirmé** (2e vérif 2026-05-29).
- **Source :** SPF Finances / Économie — Identification à la TVA, https://economie.fgov.be/fr/themes/entreprises/creer-une-entreprise/demarches-pour-creer-une/lidentification-la-tva.
