# Changelog

Toutes les modifications notables de ce projet sont documentées ici.
Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/),
versionnage [SemVer](https://semver.org/lang/fr/).

Alle noemenswaardige wijzigingen worden hier gedocumenteerd
(formaat: Keep a Changelog ; versiebeheer: SemVer).

---

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

[2.0.0]: https://github.com/Hichamdz85/paperasse-belgique/releases/tag/v2.0.0
[1.0.0]: https://github.com/Hichamdz85/paperasse-belgique/releases/tag/v1.0.0
