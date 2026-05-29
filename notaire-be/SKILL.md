---
name: notaire-be
description: >-
  Belgian notarial assistant FR/NL for Belgian property and company matters. Use
  when working on notary fees, regional registration duties in Brussels/Flanders/
  Wallonia, inheritance tax, donation duties, Belgian real-estate capital gains,
  SRL/BV incorporation, regional notarial terminology, or sourced Belgian
  notarial answers. Always show region, language, dated official source, and
  confirmation status before any rate. Never give a regional rate without region
  and source. Does not replace a Belgian notary.
metadata:
  short-description: Belgian notary fees, duties and SRL/BV flows
  version: "2.0.0"
  last-updated: "2026-05-29"
  languages: ["fr", "nl"]
---

# notaire-be v2 — Notariat belge (FR/NL)

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
   calcul**. En v2, cela concerne surtout les bornes intermédiaires de la
   réforme wallonne des donations immobilières 2028 et les honoraires de
   constitution SRL/BV. Les donations mobilières 2026 et le barème immobilier
   commun 2026 sont confirmés et chiffrables.
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
   et **identiques chez tous les notaires**. En v2, les bornes et barèmes
   principaux sont confirmés dans `references/frais-notaire.md`. Pour un acte
   précis, renvoyer aussi vers le simulateur officiel notaire.be/notaris.be.
3. **Frais administratifs et débours** (recherches, transcription
   hypothécaire, etc.).

Détail dans `references/frais-notaire.md`.

### 2. Droits d'enregistrement par région — habitation propre et unique

Toujours préciser la région. Détail et sources dans
`references/droits-enregistrement.md`.

- **Bruxelles-Capitale** : taux de base **12,5 %** ; **abattement** sur la 1re
  tranche de **200.000 €** (depuis 2025) ; bonus PEB **+25.000 € par classe**
  dès 2 classes, maximum +100.000 € ; plafond de prix 600.000 €. Source :
  fiscalite.brussels / notaire.be, 2026-05-29 — confirmé.
- **Région flamande** : `verkooprecht` standard **12 %** ; habitation **propre
  et unique 2 %** (depuis 01/01/2025). Source : vlaanderen.be, 2026-05-29 —
  confirmé. Monument classé 1 % habitation propre/unique : **aboli** depuis
  01/01/2025 ; le 1 % rénovation énergétique majeure subsiste sous conditions.
- **Région wallonne** : taux ordinaire **12,5 %** ; habitation **propre et
  unique 3 %** (depuis 01/01/2025) ; **abattement supprimé** depuis 2025.
  Source : wallonie.be, 2026-05-29 — confirmé.

### 3. Droits de succession (régional, progressif, par héritier)

Barèmes **par région**. Structure confirmée pour Bruxelles et Wallonie ; ligne
directe/partenaires confirmée avec réserve en Flandre (3/9/27 %, mobilier et
immeubles taxés séparément). Détail dans `references/succession-donation.md`.

### 4. Droits de donation

Donation mobilière 2026 : taux fixes confirmés par région. Donation immobilière
2026 : barème progressif commun aux 3 régions confirmé. Seules les bornes
intermédiaires de la réforme wallonne 2028 restent « À VÉRIFIER ». Détail dans
`references/succession-donation.md`.

### 5. Plus-value immobilière (impôt FÉDÉRAL)

Bien bâti revendu **dans les 5 ans** : plus-value taxée à **16,5 %**.
Exonération totale pour la résidence principale. Impôt fédéral identique dans
les 3 régions. Source : notaire.be / SPF Finances, 2026-05-29 — confirmé.
La nouvelle taxe 2026 de 10 % sur actifs financiers est distincte et ne concerne
pas l'immobilier résidentiel.

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
