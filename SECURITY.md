# Sécurité et intégrité des données / Beveiliging en gegevensintegriteit

> Ce document couvre deux volets : (a) la sécurité technique du dépôt et (b) l'intégrité des données fiscales et juridiques, spécifique à ce projet.
> Dit document behandelt twee luiken: (a) de technische beveiliging van de repository en (b) de integriteit van de fiscale en juridische gegevens, eigen aan dit project.

---

## FR — Français

### (a) Sécurité technique

#### Ne jamais committer de secrets

- **Aucun secret** dans le dépôt : pas de `.env`, de tokens, de clés API, ni de fichiers d'identifiants.
- Ne committez **jamais** un `company.json` ou un `journal.json` réel : ces fichiers contiennent des données d'entreprise réelles (numéro BCE, montants, écritures). Seuls les modèles `company.example.json` et `scripts/journal.example.json` sont versionnés.
- Vérifiez le `.gitignore` avant tout commit. Si un secret a été poussé par erreur, considérez-le comme compromis : révoquez-le et faites-le tourner.

#### Signaler une vulnérabilité

- Signalez toute vulnérabilité technique via une **security advisory privée GitHub** (onglet « Security » du dépôt → « Report a vulnerability ») ou, à défaut, via une **issue privée**.
- Ne divulguez pas publiquement une faille avant qu'un correctif ne soit disponible (divulgation responsable).
- Décrivez : le composant touché, les étapes de reproduction, et l'impact potentiel.

### (b) Intégrité des données (spécifique à ce projet)

L'intégrité des données fiscales et juridiques est aussi critique que la sécurité technique. Une donnée périmée ou erronée peut induire un utilisateur en erreur sur un dépôt, une déclaration ou un acte.

#### Comment signaler une donnée fiscale périmée ou erronée

Ouvrez une issue avec le modèle **« Donnée périmée ou erronée »** et fournissez :

1. L'**`id` de l'entrée** concernée dans `data/sources.json` (ou le `references/sources.json` du skill).
2. La **valeur actuellement affichée**.
3. La **valeur correcte attendue**.
4. La **source officielle à jour** : une URL officielle belge (`finances.belgium.be`, `nbb.be`, `notaire.be`, `cnc-cbn.be`, `economie.fgov.be`, `vlaanderen.be`, `wallonie.be`, `be.brussels`, Moniteur belge…).
5. La **date** de cette source.

Une donnée non confirmée ne doit jamais entrer dans un calcul : tant que la nouvelle valeur n'est pas vérifiée, l'entrée passe au statut `a_verifier` et porte la mention « À VÉRIFIER — source non confirmée ».

#### Rappel

Ce projet n'est pas un service de conseil. Il ne fournit **aucun conseil juridique ni fiscal** et ne remplace ni un expert-comptable (ITAA), ni un réviseur d'entreprises (IRE), ni un notaire belge. Voir [`DISCLAIMER.md`](DISCLAIMER.md).

---

## NL — Nederlands

### (a) Technische beveiliging

#### Nooit geheimen committen

- **Geen geheimen** in de repository: geen `.env`, geen tokens, geen API-sleutels, geen bestanden met inloggegevens.
- Commit **nooit** een echte `company.json` of `journal.json`: die bestanden bevatten echte ondernemingsgegevens (KBO-nummer, bedragen, boekingen). Alleen de sjablonen `company.example.json` en `scripts/journal.example.json` worden versiebeheerd.
- Controleer de `.gitignore` vóór elke commit. Werd een geheim per ongeluk gepusht, beschouw het dan als gecompromitteerd: trek het in en vervang het.

#### Een kwetsbaarheid melden

- Meld elke technische kwetsbaarheid via een **privé GitHub security advisory** (tabblad « Security » van de repository → « Report a vulnerability ») of, bij gebrek daaraan, via een **privé issue**.
- Maak een kwetsbaarheid niet publiek bekend voordat er een oplossing beschikbaar is (verantwoorde bekendmaking).
- Beschrijf: het getroffen onderdeel, de reproductiestappen en de mogelijke impact.

### (b) Gegevensintegriteit (eigen aan dit project)

De integriteit van de fiscale en juridische gegevens is even kritiek als de technische beveiliging. Een verouderd of foutief gegeven kan een gebruiker misleiden bij een neerlegging, aangifte of akte.

#### Hoe een verouderd of foutief fiscaal gegeven melden

Open een issue met het sjabloon **« Verouderde of foutieve gegevens »** en geef:

1. De **`id` van de vermelding** in kwestie in `data/sources.json` (of de `references/sources.json` van de skill).
2. De **momenteel getoonde waarde**.
3. De **verwachte correcte waarde**.
4. De **actuele officiële bron**: een officiële Belgische URL (`financien.belgium.be`, `nbb.be`, `notaris.be`, `cnc-cbn.be`, `economie.fgov.be`, `vlaanderen.be`, `wallonie.be`, `be.brussels`, Belgisch Staatsblad…).
5. De **datum** van die bron.

Een niet-bevestigd gegeven mag nooit in een berekening: zolang de nieuwe waarde niet geverifieerd is, krijgt de vermelding de status `a_verifier` en draagt zij de vermelding « À VÉRIFIER — source non confirmée ».

#### Herinnering

Dit project is geen adviesdienst. Het verstrekt **geen juridisch of fiscaal advies** en vervangt geen accountant (ITAA), geen bedrijfsrevisor (IBR-IRE) en geen Belgische notaris. Zie [`DISCLAIMER.md`](DISCLAIMER.md).
