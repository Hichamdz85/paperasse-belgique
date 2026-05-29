# Contribuer / Bijdragen

> Merci de votre intérêt pour `paperasse-be`. Ce projet vit grâce à la précision de ses données. Toute contribution doit respecter la **règle d'or** : aucune donnée chiffrée sans source officielle belge, datée et au statut explicite.
> Dank voor uw interesse in `paperasse-be`. Dit project leeft van de nauwkeurigheid van zijn gegevens. Elke bijdrage moet de **gouden regel** respecteren: geen enkel cijfer zonder gedateerde, officiële Belgische bron met expliciete status.

Voir aussi le [Code de conduite](CODE_OF_CONDUCT.md) / Zie ook de [Gedragscode](CODE_OF_CONDUCT.md).

---

## FR — Français

### 1. Structure d'un skill

Chaque skill suit la même structure :

```
<skill>-be/
  SKILL.md            # instructions du skill (FR + NL)
  references/         # documentation de référence, dont references/sources.json
  data/               # données structurées propres au skill (le cas échéant)
```

- `comptable-be` couvre PCMN, TVA/BTW, ISoc/Ven.B, clôture, dépôt BNB.
- `notaire-be` couvre frais de notaire, droits d'enregistrement régionaux, succession, donation, SRL/BV.

Le registre central des sources est `data/sources.json`. Chaque skill peut avoir son propre `references/sources.json` ; les deux sont contrôlés par `scripts/check-sources.js`.

### 2. Règle ABSOLUE d'ajout d'une donnée

Aucun taux, seuil, échéance ou barème n'est inventé. **Avant** d'afficher ou d'utiliser une donnée chiffrée, ajoutez une entrée dans `data/sources.json` (ou le `references/sources.json` du skill) avec **obligatoirement** :

```json
{
  "id": "domaine-sujet-court",
  "domaine": "fiscalite | comptabilite | notariat | institution | droit",
  "sujet": "Libellé clair de la donnée",
  "valeur": "Le chiffre/texte exact",
  "url": "https://finances.belgium.be/...",
  "date_consultation": "AAAA-MM-JJ",
  "statut": "confirme"
}
```

- `url` : une **source officielle belge** (finances.belgium.be, nbb.be, notaire.be, cnc-cbn.be, economie.fgov.be, vlaanderen.be, wallonie.be, be.brussels, Moniteur belge…). Jamais un blog ou un forum.
- `date_consultation` : la date réelle de consultation, au format `AAAA-MM-JJ`.
- `statut` :
  - `confirme` : donnée vérifiée sur la source officielle. Seules ces entrées peuvent entrer dans un calcul.
  - `a_verifier` : donnée non confirmée. La `valeur` doit alors porter la mention littérale **« À VÉRIFIER — source non confirmée »**. Ces entrées ne sont **jamais** utilisées dans un calcul ni affichées comme un fait.

### 3. Avant tout PR : lancer le contrôle

```
node scripts/check-sources.js
```

Le script échoue (code de sortie 1) si une entrée `confirme` n'a pas d'`url` ou de `date_consultation` valide. **Votre PR ne sera pas acceptée si le contrôle échoue.**

### 4. Bilinguisme : FR ET NL via le glossaire

Le projet est bilingue (FR/NL, les deux langues officielles belges concernées).

- Toute terminologie officielle provient **exclusivement** de [`glossaire-fr-nl.json`](glossaire-fr-nl.json), source de vérité unique.
- **Jamais de traduction ad hoc** dans un skill, un script ou le site. Si un terme manque, ajoutez-le d'abord au glossaire (avec son `statut`), puis réutilisez-le.
- Tout contenu visible (SKILL.md, README, documentation) doit être fourni en FR **et** en NL, en sections claires `## FR` / `## NL`.

### 5. Exécuter les scripts

- `node scripts/check-sources.js` — contrôle d'intégrité des sources (obligatoire avant PR).
- `node scripts/generate-statements.js` — génération des relevés (exemple).
- `node scripts/generate-pdfs.js` — génération des PDF (exemple).

Node >= 18 requis (ESM natif, aucune dépendance externe).

### 6. Process de pull request

1. **Fork** du dépôt.
2. Créez une **branche** depuis `main` (ex. `fix/tva-franchise-2026`).
3. Ajoutez vos sources dans `sources.json`, mettez à jour FR **et** NL via le glossaire.
4. Lancez `node scripts/check-sources.js` (doit passer).
5. Ouvrez une **PR vers `main`** en suivant le `PULL_REQUEST_TEMPLATE`.

### 7. Rappel

Ces skills ne remplacent pas un expert-comptable (ITAA), un réviseur d'entreprises (IRE) ni un notaire belge. Voir [`DISCLAIMER.md`](DISCLAIMER.md).

---

## NL — Nederlands

### 1. Structuur van een skill

Elke skill volgt dezelfde structuur:

```
<skill>-be/
  SKILL.md            # instructies van de skill (FR + NL)
  references/         # referentiedocumentatie, waaronder references/sources.json
  data/               # gestructureerde gegevens eigen aan de skill (indien van toepassing)
```

- `comptable-be` dekt MAR/PCMN, btw/TVA, Ven.B/ISoc, afsluiting, NBB-neerlegging.
- `notaire-be` dekt notariskosten, gewestelijke registratierechten, erfenis, schenking, BV/SRL.

Het centrale bronnenregister is `data/sources.json`. Elke skill kan een eigen `references/sources.json` hebben; beide worden gecontroleerd door `scripts/check-sources.js`.

### 2. ABSOLUTE regel bij het toevoegen van gegevens

Geen enkel tarief, drempel, vervaldatum of barema wordt verzonnen. **Voordat** u een cijfer toont of gebruikt, voegt u een vermelding toe aan `data/sources.json` (of de `references/sources.json` van de skill) met **verplicht**:

```json
{
  "id": "domein-kort-onderwerp",
  "domaine": "fiscalite | comptabilite | notariat | institution | droit",
  "sujet": "Duidelijke omschrijving van het gegeven",
  "valeur": "Het exacte cijfer/de exacte tekst",
  "url": "https://financien.belgium.be/...",
  "date_consultation": "JJJJ-MM-DD",
  "statut": "confirme"
}
```

- `url`: een **officiële Belgische bron** (financien.belgium.be, nbb.be, notaris.be, cnc-cbn.be, economie.fgov.be, vlaanderen.be, wallonie.be, be.brussels, Belgisch Staatsblad…). Nooit een blog of forum.
- `date_consultation`: de werkelijke raadplegingsdatum, formaat `JJJJ-MM-DD`.
- `statut`:
  - `confirme`: gegeven geverifieerd op de officiële bron. Alleen deze vermeldingen mogen in een berekening.
  - `a_verifier`: niet-bevestigd gegeven. De `valeur` draagt dan de letterlijke vermelding **« À VÉRIFIER — source non confirmée »**. Deze vermeldingen worden **nooit** in een berekening gebruikt of als feit getoond.

### 3. Vóór elke PR: de controle uitvoeren

```
node scripts/check-sources.js
```

Het script faalt (exitcode 1) als een `confirme`-vermelding geen geldige `url` of `date_consultation` heeft. **Uw PR wordt niet aanvaard als de controle faalt.**

### 4. Tweetaligheid: FR ÉN NL via de woordenlijst

Het project is tweetalig (FR/NL, de twee betrokken officiële Belgische talen).

- Alle officiële terminologie komt **uitsluitend** uit [`glossaire-fr-nl.json`](glossaire-fr-nl.json), de enige bron van waarheid.
- **Nooit ad-hocvertalingen** in een skill, script of site. Ontbreekt een term, voeg die dan eerst toe aan de woordenlijst (met zijn `statut`) en hergebruik die.
- Alle zichtbare inhoud (SKILL.md, README, documentatie) moet in FR **én** NL worden geleverd, in duidelijke secties `## FR` / `## NL`.

### 5. De scripts uitvoeren

- `node scripts/check-sources.js` — integriteitscontrole van de bronnen (verplicht vóór PR).
- `node scripts/generate-statements.js` — generatie van overzichten (voorbeeld).
- `node scripts/generate-pdfs.js` — generatie van pdf's (voorbeeld).

Node >= 18 vereist (native ESM, geen externe afhankelijkheden).

### 6. Pull request-proces

1. **Fork** de repository.
2. Maak een **branch** vanaf `main` (bv. `fix/tva-franchise-2026`).
3. Voeg uw bronnen toe in `sources.json`, werk FR **én** NL bij via de woordenlijst.
4. Voer `node scripts/check-sources.js` uit (moet slagen).
5. Open een **PR naar `main`** volgens de `PULL_REQUEST_TEMPLATE`.

### 7. Herinnering

Deze skills vervangen geen accountant (ITAA), geen bedrijfsrevisor (IBR-IRE) en geen Belgische notaris. Zie [`DISCLAIMER.md`](DISCLAIMER.md).
