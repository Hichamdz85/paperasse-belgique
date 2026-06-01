# Changelog

Toutes les modifications notables de ce projet sont documentées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
versionnage [SemVer](https://semver.org/lang/fr/).

Alle noemenswaardige wijzigingen worden hier gedocumenteerd
(formaat: Keep a Changelog ; versiebeheer: SemVer).

---

## [2.3.0] — 2026-06-02

### Ajouté / Toegevoegd
- Skill `classeur-be` : organisation et archivage administratif (arborescence de classement, conventions de nommage), conservation légale (7/10/15 ans), échéancier fiscal, tableau de bord et coaching de bonnes habitudes de tenue de documents (FR/NL).
- 3 scripts : `echeancier.mjs` (échéances fiscales légales + export iCalendar `.ics`), `dashboard.mjs` (tableau de bord HTML : KPIs + prochaines échéances), `classeur.mjs` (arborescence d'archivage + assistant de classement). Scripts npm `echeancier` / `dashboard` / `classeur`.
- Données sourcées ajoutées : conservation comptable **7 ans** (CDE III.86), conservation fiscale/TVA **10 ans** (CIR 315 / Code TVA 60), biens d'investissement immobiliers **15 ans**, mentions et numérotation de facture, facturation électronique B2B obligatoire au **01/01/2026** (norme EN 16931, Peppol).
- Évals : couverture sourcée **32/32**. `check-sources` couvre désormais `classeur-be`.

## [2.2.0] — 2026-06-01

### Ajouté / Toegevoegd
- **Banc d'évaluation des skills** (`evals/run-evals.mjs`, Node, sans dépendance) avec scénarios `<skill>/evals/evals.json` — 20 scénarios, 26 assertions (≥ 1 scénario NL par skill).
- Mode `grounding` (par défaut, en CI) : vérifie que **chaque assertion est adossée à une source confirmée** (id existant + statut confirmé + jetons présents dans la valeur). Couverture sourcée mesurée : **26/26 (100 %)**. Garde-fou de non-régression.
- Mode `--llm` (expérimental, hors CI) : A/B « avec skill vs sans skill » via `ANTHROPIC_API_KEY` ; aucun delta n'est publié tant qu'il n'est pas réellement mesuré (cf. `evals/README.md`).
- Scripts npm `evals` / `evals:llm` ; `npm run validate` inclut désormais les évals.
- Badge « évals : couverture sourcée 26/26 » + section dans `README.md`.

### Modifié / Gewijzigd
- CI `quality.yml` : déclenchement étendu (`evals/**`, `asbl-be/**`) ; `npm run validate` exécute aussi les évals.
- `package.json` aligné sur 2.2.0.

## [2.1.1] — 2026-06-01

### Modifié / Gewijzigd
- **Donation immobilière Wallonie 2028 confirmée** : réforme du **décret wallon du 05/12/2024** (art. 21 remplaçant l'art. 131 du Code des droits d'enregistrement), **MB 13/12/2024, NUMAC 2024011274** (erratum 2024011635), applicable aux actes authentiques dès le 01/01/2028 — barème complet (ligne directe 3/6/10/14 % ; autres 9/12/16/20 %). Entrée de source `notaire-donation-immo-wal-2028` ajoutée (statut confirmé).
- **Calendrier TVA 2026 confirmé** (SPF Finances) : échéances mensuelles/trimestrielles 2026 datées, listing clients + relevé IC annuels au 31/03/2026 ; note « les dates varient chaque année » conservée. Entrée de source `fisc-tva-calendrier-2026` ajoutée (statut confirmé).
- **Versements anticipés ISoc** — précision : le taux de majoration **n'est pas fixé par un avis MB autonome** ; il dérive de l'**art. 218 CIR 92** (renvoi art. 161, taux directeur BCE au 1er janvier avec plancher). 6,75 % confirmé pour l'EI 2027 ; page SPF EI 2026 écrasée → entrée `av-isoc-majoration-2026` maintenue en `a_verifier`.

## [2.1.0] — 2026-06-01

### Ajouté / Toegevoegd
- Skill `asbl-be` (ASBL / VZW) : régime CSA Livre 9, comptabilité simplifiée ou en partie double (seuils 2 des 4 critères), dépôt des comptes (greffe / BNB), impôt des personnes morales (IPM), taxe annuelle compensatoire des droits de succession (patrimoniumtaks), TVA et registre UBO. Sources officielles datées (2026-06-01).
- `data/sources.json` : 10 entrées du domaine `asbl` (8 confirmées / confirmées partiellement, 2 « à vérifier »).
- `glossaire-fr-nl.json` : termes ASBL/VZW (asbl, aisbl, organe d'administration, but désintéressé, comptabilité simplifiée, IPM, taxe patrimoniale, greffe, registre UBO, membre).
- Landing page : 3e carte « asbl-be » (FR/NL) ; carte « Bientôt » mise à jour (indépendant / IPP).

### Modifié / Gewijzigd
- Validateur de skills (`scripts/validate-skills.js`) assoupli : version semver (X.Y.Z) + `last-updated` au format date valide (AAAA-MM-JJ) ; statuts confirmés étendus (`confirme`, `confirme_partiel`, `confirme_avec_reserve`).
- `package.json` aligné sur 2.1.0.

### Restant à vérifier / Nog te verifiëren
- Seuils des catégories micro/petite/grande des ASBL (art. 1:28-1:29 CSA) — divergence de sources.
- Réforme annoncée du dépôt obligatoire de toutes les ASBL à la BNB dès 2026 — non confirmée en droit en vigueur.
- Catégories et délais précis du registre UBO pour les ASBL (confirmé partiel).

## [2.0.0] — 2026-05-29

### Ajouté / Toegevoegd
- Conformité au standard Agent Skills : `description` au format « Use when… » + bloc `metadata` (FR/NL).
- Manifestes multiplateformes `comptable-be/agents/openai.yaml` et `notaire-be/agents/openai.yaml`.
- Validation automatisée `scripts/validate-skills.js` + script npm `validate` (= `check-sources` + `validate-skills`).
- Intégration continue : workflow `.github/workflows/quality.yml` (Quality gates).
- Déploiement de la landing page sur GitHub Pages (`.github/workflows/pages.yml`).
- Gouvernance open-source : `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, modèles d'issues (dont « donnée périmée ») et de pull request (FR/NL).
- `README.md` : badges (Quality gates, démo, MIT, FR/NL, sources, Claude Code) et capture de la landing page.

### Modifié / Gewijzigd
- 3e vérification des sources : donation immobilière (barème commun aux 3 régions 3/9/18/27 %), honoraires notariaux (AR 16/12/1950, 7 bornes), schéma des comptes (AR 29/04/2019 art. 3:58 + modèles BNB C/A/M).
- ISoc : rémunération minimale du dirigeant portée à **50.000 EUR** dès l'exercice d'imposition 2026 (loi-programme du 18/07/2025, MB 29/07/2025).
- Cohérence du numéro de version du projet (`package.json` aligné sur 2.0.0).

### Restant à vérifier / Nog te verifiëren
- Dates exactes du calendrier TVA (variables chaque année).
- Bornes intermédiaires de la donation immobilière en Wallonie (réforme 2028).
- Avis du Moniteur belge daté pour les versements anticipés (taux 6,75 % confirmé via SPF Finances).

## [1.0.0] — 2026-05-29

### Ajouté / Toegevoegd
- Skill `comptable-be` : écritures PCMN/MAR, TVA/BTW, calcul ISoc/Ven.B, clôture annuelle, dépôt BNB.
- Skill `notaire-be` : frais de notaire, droits d'enregistrement régionaux, succession, donation, SRL/BV.
- `data/sources.json` : registre central des sources officielles belges (url + date + statut), vérifié par `scripts/check-sources.js`.
- `glossaire-fr-nl.json` : terminologie officielle bilingue (source de vérité unique).
- Scripts : `generate-statements.js`, `generate-pdfs.js`, `check-sources.js`.
- Modèles bilingues : PV d'approbation des comptes, checklist de dépôt BNB.
- Landing page statique bilingue FR/NL (`site/`).
- `RESEARCH.md` : cadrage juridique sourcé + liste des points à vérifier. Licence MIT.

[2.3.0]: https://github.com/Hichamdz85/paperasse-belgique/releases/tag/v2.3.0
[2.2.0]: https://github.com/Hichamdz85/paperasse-belgique/releases/tag/v2.2.0
[2.1.1]: https://github.com/Hichamdz85/paperasse-belgique/releases/tag/v2.1.1
[2.1.0]: https://github.com/Hichamdz85/paperasse-belgique/releases/tag/v2.1.0
[2.0.0]: https://github.com/Hichamdz85/paperasse-belgique/releases/tag/v2.0.0
[1.0.0]: https://github.com/Hichamdz85/paperasse-belgique/releases/tag/v1.0.0
