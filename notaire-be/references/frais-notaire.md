# Frais de notaire & constitution de société

> Date de consultation : **2026-05-29**. Source primaire : `RESEARCH.md` §7.4 et
> §7.6 ; `references/sources.json` (domaine `notariat`).
>
> **Règle absolue** : le bloc des droits d'enregistrement varie par région —
> toujours nommer la région + source datée. Les honoraires tarifés par AR
> fédéral ont des bornes et barèmes confirmés en v2 ; pour un acte précis,
> renvoyer aussi vers le simulateur officiel notaire.be / notaris.be.

Terminologie FR/NL (`glossaire-fr-nl.json`) :
- FR : **Notaire** / **Acte authentique** ; NL : **Notaris** / **Authentieke
  akte**.

---

## Composition des frais d'acquisition — 3 blocs

Les « frais de notaire » regroupent trois composantes distinctes
(RESEARCH §7.4) :

### Bloc 1 — Droits d'enregistrement (régional)

- Composante **la plus lourde** et **la seule qui varie selon la région**.
- NL : `registratiebelasting` (Flandre) / `registratierechten` (fédéral,
  Wallonie).
- Taux et abattements détaillés dans `droits-enregistrement.md` (Bruxelles
  12,5 % + abattement 200.000 € ; Flandre 2 % habitation propre / 12 % standard ;
  Wallonie 3 % habitation propre / 12,5 % ordinaire).
- **Statut : confirmé** (par région ; voir `droits-enregistrement.md` pour les
  sources datées).

### Bloc 2 — Honoraires du notaire (tarifés par AR fédéral)

- **Tarifés par arrêté royal fédéral (AR du 16/12/1950**, version consolidée en
  vigueur depuis le **01/01/2023**, AR modificatif du **22/11/2022**),
  **dégressifs** (taux décroissant par tranches de prix), **identiques chez tous
  les notaires** de Belgique (le notaire ne fixe pas librement ses honoraires sur
  ce poste), et soumis à la **TVA de 21 %**.
- **7 bornes communes** (en €) : 0 – 7.500 / 7.500 – 10.000 / 10.000 – 12.500 /
  12.500 – 15.495 / 15.495 – 18.600 / 18.600 – 186.000 / surplus (> 186.000).
- **Barème J — vente immobilière de gré à gré** (pourcentage appliqué par
  tranche de prix, + TVA 21 %) :

  | Tranche de prix (€) | Taux honoraires (barème J) |
  |---------------------|----------------------------|
  | 0 – 7.500 | **4,56 %** |
  | 7.500 – 10.000 | **2,85 %** |
  | 10.000 – 12.500 | **2,28 %** |
  | 12.500 – 15.495 | **1,71 %** |
  | 15.495 – 18.600 | **1,14 %** |
  | 18.600 – 186.000 | **0,57 %** |
  | > 186.000 (surplus) | **0,057 %** |

- **Actes immobiliers post-2023** : barèmes dédiés avec **partie fixe** (ex.
  **250 €** pour une vente ; **225 €** pour habitation propre et unique) et
  **bornes finales adaptées** (… 15.495 – 18.595 / 18.595 – 186.005 /
  186.005 – 249.905 / surplus). **Forfait frais administratifs / débours :
  750 € HT par acte** (**550 € HT** par acte lié dès le 2e).
- **Donation d'immeuble** : appliquer le **barème H** (taux **2,85 / 1,71 /
  1,425 / 1,14 / 0,855 / 0,57 / 0,057 %**, mêmes 7 bornes) ou le **barème F**
  (avancement d'hoirie).
- **Indexation** : les **montants fixes / forfaits** sont indexés de plein droit
  **tous les 2 ans au 1er janvier** (1re indexation 01/01/2024 ; prochaine
  01/01/2026). Les **taux proportionnels** et les **bornes** ne sont **pas**
  indexés.
- **Statut : confirmé** — structure dégressive, pourcentages **et bornes**
  désormais connus (AR du 16/12/1950, version consolidée 01/01/2023). Honoraires
  soumis à **TVA 21 %**.
- **Source** : AR du 16/12/1950 (ejustice numac 1950121603) + notaire.be —
  frais liés à l'achat
  (https://www.notaire.be/immobilier/acheter-et-vendre-un-bien-immobilier/les-frais-lies-lachat),
  consulté le 2026-05-29.
- **Recommandation** : pour tout chiffrage d'acte précis, utiliser le **module
  de calcul officiel notaire.be**.

### Bloc 3 — Frais administratifs et débours

- Frais de recherches, transcription hypothécaire, attestations, frais
  divers que le notaire avance pour le compte du client.
- **Statut : confirmé** (existence du bloc ; montants variables non chiffrés).

> Pour une estimation chiffrée des frais totaux, renvoyer vers le simulateur
> officiel de notaire.be / notaris.be : seul le bloc 1 (droits d'enregistrement)
> est ici confirmé par région.

---

## Plus-value immobilière (rappel — impôt FÉDÉRAL)

- Bien bâti revendu **dans les 5 ans** : plus-value taxée à **16,5 %**.
- **Exonération totale** pour la résidence principale.
- Impôt **fédéral**, identique dans les trois régions.
- **Source** : notaire.be / SPF Finances
  (https://www.notaire.be/immobilier/aspects-fiscaux-de-lachat-la-vente-dun-bien/taxes-sur-les-plus-values-immobilieres-1),
  consulté le 2026-05-29 — **statut : confirmé** (16,5 %).

---

## Nouvelle taxe sur les plus-values 2026 (impôt FÉDÉRAL — actifs financiers)

> **Distincte** de la plus-value immobilière (16,5 %). Ne concerne **PAS**
> l'immobilier résidentiel.

- **Taux** : **10 %** sur les plus-values réalisées sur des **actifs
  financiers**.
- **Exonération** : **10.000 € par an** (franchise annuelle).
- **Valeur de référence** : valeur au **31/12/2025** (point de départ du calcul
  de la plus-value).
- **Régime de perception** :
  - **opt-in** : **retenue de 10 % par la banque** (prélèvement à la source) ;
  - **opt-out** : **déclaration à l'IPP** (impôt des personnes physiques).
- **Niveau** : **fédéral**, distinct de la plus-value **immobilière** 16,5 %.
- **Statut : confirmé** (consulté le 2026-05-29).

---

## Constitution d'une SRL/BV — `acte authentique` / `authentieke akte`

- FR : **Société à responsabilité limitée (SRL)** ; NL : **Besloten
  Vennootschap (BV)** (`glossaire-fr-nl.json`, clé `srl`).
- **Acte authentique notarié obligatoire** : condition de **validité** de la
  société (CSA / WVV). Un acte sous seing privé est insuffisant.
- **Plan financier obligatoire** remis au notaire.
- **E-filing** : publication via la BCE/KBO et le Moniteur belge / Belgisch
  Staatsblad.
- **Source** : notaire.be — La SRL
  (https://www.notaire.be/entreprendre/les-differentes-formes-juridiques-de-societe/la-srl-societe-responsabilite-limitee),
  consulté le 2026-05-29 — **statut : confirmé** (obligation acte authentique +
  plan financier).
- **Honoraires de constitution** : **À VÉRIFIER — source non confirmée**
  (ordre de grandeur 750–1.200 € HTVA cité en RESEARCH §7.4 mais non vérifié,
  RESEARCH §8 #18). **Ne pas chiffrer.**

---

## Synthèse

| Bloc / poste | Niveau | Statut |
|--------------|--------|--------|
| 1. Droits d'enregistrement | Régional (Bxl / Flandre / Wallonie) | confirmé par région |
| 2. Honoraires notaire | Fédéral (AR du 16/12/1950, version consolidée 01/01/2023, dégressif, identique partout, + TVA 21 %) | confirmé (taux **et** bornes connus — barème J vente ; H/F donation ; forfait débours 750 € HT/acte ; indexation biennale des montants fixes) |
| 3. Frais administratifs / débours | Variable | existence confirmée ; montants non chiffrés |
| Plus-value immo < 5 ans | Fédéral 16,5 % | confirmé |
| Taxe plus-values actifs financiers 2026 | Fédéral 10 % (exonération 10.000 €/an, réf. 31/12/2025, opt-in/opt-out) | confirmé |
| Constitution SRL/BV | Acte authentique obligatoire | confirmé ; honoraires À VÉRIFIER |
