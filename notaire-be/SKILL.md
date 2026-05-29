---
name: notaire-be
description: >-
  Skill notarial belge (FR/NL bilingue) couvrant les frais de notaire, les
  droits d'enregistrement régionaux (Bruxelles / Flandre / Wallonie), les droits
  de succession, les droits de donation, la plus-value immobilière fédérale et
  la constitution de SRL/BV. Affiche TOUJOURS la région, la langue et la source
  officielle datée avant tout taux. Termes officiels néerlandais en regard du
  français. Aucun taux régional sans région + source. Ce skill ne remplace pas
  un notaire belge.
last_updated: 2026-05-29
langues: [fr, nl]
---

# notaire-be — Notariat belge (FR/NL)

Skill de référence pour les opérations notariales belges : frais d'acquisition,
droits d'enregistrement régionaux, succession, donation, plus-value immobilière
et constitution de société. Tout est rédigé en français avec les termes
officiels néerlandais (NL) en regard, conformément au bilinguisme belge.

> **Source de vérité.** Ce skill ne contient aucun chiffre inventé. Toutes les
> données proviennent de `RESEARCH.md` (§7 notariat, §8 « À VÉRIFIER »), de
> `references/sources.json` (entrées domaine `notariat`) et du glossaire
> `glossaire-fr-nl.json`. En cas de doute : ne pas chiffrer.

---

## Procédure obligatoire (à suivre à chaque demande)

1. **Lire `company.json`** (ou `company.example.json` à défaut). Identifier en
   priorité le champ `region` (`bruxelles` / `flandre` / `wallonie`), puis
   `langue`, `forme_juridique` et `regime_tva` si pertinents.
   - Mapping région → langue (RESEARCH §9) : `bruxelles` → `fr-nl` (bilingue) ;
     `flandre` → `nl` ; `wallonie` → `fr`.
2. **Toujours afficher, AVANT tout taux** : la **région** concernée, la
   **langue** applicable, la **source** officielle et sa **date de
   consultation** (2026-05-29). Format recommandé :
   `Région : Wallonie — Source : wallonie.be, consulté le 2026-05-29 — statut : confirmé`.
3. **Ne jamais donner un taux régional sans préciser explicitement la région.**
   Un taux « 3 % » sans région est interdit : il faut dire « 3 % en Wallonie »
   ou « 3 % à Bruxelles (succession ligne directe, 1re tranche) », etc.
4. **Données « à vérifier »** (RESEARCH §8) : afficher la mention
   « À VÉRIFIER — source non confirmée » et **ne pas les utiliser dans un
   calcul**. Concerne notamment : tous les barèmes de donation (#17), le barème
   erfbelasting détaillé de Flandre (#16), les honoraires notariaux ligne par
   ligne (#18).
5. **Bilinguisme** : libellés FR/NL repris **uniquement** de
   `glossaire-fr-nl.json`. Respecter la nuance régionale (voir ci-dessous).

### Nuance terminologique critique FR/NL (enregistrement / succession / donation)

Le terme néerlandais dépend de la **région compétente** :

| Notion (FR) | Flandre / VLABEL (NL) | Fédéral / Wallonie (NL) |
|-------------|-----------------------|--------------------------|
| Droits d'enregistrement | `registratiebelasting` | `registratierechten` |
| Droits de succession | `erfbelasting` | `successierechten` |
| Droits de donation | `schenkbelasting` | `schenkingsrechten` |

Ne jamais employer `erfbelasting` pour Bruxelles ou la Wallonie, ni
`successierechten` pour la Flandre.

---

## Domaines couverts

### 1. Frais de notaire (3 blocs) — `notaris`

Les frais d'acquisition se décomposent en **trois blocs** (RESEARCH §7.4) :

1. **Droits d'enregistrement** — montant **régional** (voir bloc 2 ci-dessous),
   c'est la composante la plus lourde et la seule qui varie selon la région.
2. **Honoraires du notaire** — **tarifés par arrêté royal fédéral**, dégressifs
   et **identiques chez tous les notaires**. Le tarif ligne par ligne n'est pas
   confirmé (RESEARCH §8 #18) : « À VÉRIFIER — source non confirmée ».
3. **Frais administratifs et débours** (recherches, transcription
   hypothécaire, etc.).

Détail dans `references/frais-notaire.md`.

### 2. Droits d'enregistrement par région — habitation propre et unique

Toujours préciser la région. Détail et sources dans
`references/droits-enregistrement.md`.

- **Bruxelles-Capitale** : taux de base **12,5 %** ; **abattement** sur la 1re
  tranche de **200.000 €** (depuis 2025 ; 250.000 € si engagement PEB) ; plafond
  de prix 600.000 €. Source : notaire.be, 2026-05-29 — confirmé.
- **Région flamande** : `verkooprecht` standard **12 %** ; habitation **propre
  et unique 2 %** (depuis 01/01/2025). Source : vlaanderen.be, 2026-05-29 —
  confirmé. (Monument classé 1 % : à vérifier, RESEARCH §8 #15.)
- **Région wallonne** : taux ordinaire **12,5 %** ; habitation **propre et
  unique 3 %** (depuis 01/01/2025) ; **abattement supprimé** depuis 2025.
  Source : wallonie.be, 2026-05-29 — confirmé.

### 3. Droits de succession (régional, progressif, par héritier)

Barèmes **par région**. Structure confirmée pour Bruxelles et Wallonie ; barème
détaillé de Flandre « à vérifier ». Détail dans
`references/succession-donation.md`.

### 4. Droits de donation

**À VÉRIFIER — barèmes non confirmés (RESEARCH §8 #17).** Aucun chiffre de
donation (mobilière ou immobilière, quelle que soit la région) ne doit être
donné ni utilisé dans un calcul. Détail dans `references/succession-donation.md`.

### 5. Plus-value immobilière (impôt FÉDÉRAL)

Bien bâti revendu **dans les 5 ans** : plus-value taxée à **16,5 %**.
Exonération totale pour la résidence principale. Impôt fédéral identique dans
les 3 régions. Source : notaire.be / SPF Finances, 2026-05-29 — confirmé.
(Nouvelle taxe 2026 de 10 % sur actifs financiers : ne concerne PAS l'immobilier
résidentiel ; modalités à vérifier.)

### 6. Constitution SRL/BV — `acte authentique` / `authentieke akte`

**Acte authentique notarié obligatoire** (condition de validité, CSA/WVV). Plan
financier obligatoire ; e-filing (BCE/KBO + Moniteur belge / Belgisch
Staatsblad). Honoraires de constitution non tarifés : « À VÉRIFIER — source non
confirmée ». Source : notaire.be, 2026-05-29 — confirmé (principe).

---

## Garde-fou (rappel)

- Aucun taux affiché sans **région + source + date**.
- Aucun taux régional sans nommer la région.
- Toute donnée « à vérifier » est signalée « À VÉRIFIER — source non
  confirmée » et exclue des calculs (donations, erfbelasting détaillé Flandre,
  honoraires AR ligne par ligne).
- Libellés FR/NL exclusivement depuis `glossaire-fr-nl.json`.

---

## Avertissement légal / Juridische disclaimer

**FR.** Ce skill fournit une information générale de cadrage et ne remplace en
aucun cas la consultation d'un notaire belge ou d'un conseil fiscal. Les
barèmes régionaux (enregistrement, succession, donation) changent fréquemment
et font l'objet de réformes (Bruxelles, Flandre et Wallonie ont toutes réformé
en 2025-2026). Avant toute décision ou tout acte, vérifiez les portails
officiels (notaire.be / notaris.be, fiscalite.brussels, belastingen.vlaanderen.be
pour VLABEL, wallonie.be, SPF Finances / FOD Financiën) et la date de
validité des taux.

**NL.** Deze skill biedt algemene oriënterende informatie en vervangt geenszins
het advies van een Belgische notaris of fiscaal raadgever. De gewestelijke
tarieven (registratie, erfenis, schenking) wijzigen vaak en zijn het voorwerp
van hervormingen. Controleer vóór elke beslissing of akte de officiële portalen
(notaris.be, belastingen.vlaanderen.be, enz.) en de geldigheidsdatum van de
tarieven.
