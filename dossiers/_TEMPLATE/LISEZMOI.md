# Dossier client — modèle `_TEMPLATE` / Klantdossier — sjabloon

> **FR** — Ce dossier est le **modèle** d'un dossier client de l'équipe
> d'agents paperasse-be. Chaque client réel possède son propre dossier sous
> `dossiers/{client}/`, copié à partir de ce modèle.
>
> **NL** — Deze map is het **sjabloon** voor een klantdossier van het
> paperasse-be-agententeam. Elke echte klant heeft een eigen map onder
> `dossiers/{client}/`, gekopieerd vanuit dit sjabloon.

---

## 1. À quoi sert un dossier client / Waarvoor dient een klantdossier

**FR** — Le dossier `dossiers/{client}/` est la **mémoire** de l'équipe pour ce
client. Tout ce que les agents préparent (écritures, déclarations, états,
échéances, plan de classement, notes notariales) y est écrit sous forme de
fichiers Markdown **versionnés**. La mémoire est ainsi **auditable** : on sait
qui a produit quoi, quand, et à quel stade de validation.

**NL** — De map `dossiers/{client}/` is het **geheugen** van het team voor die
klant. Alles wat de agenten voorbereiden (boekingen, aangiften, staten,
vervaldagen, klasseerplan, notariële nota's) wordt er als **geversioneerde**
Markdown-bestanden opgeslagen. Het geheugen is dus **auditeerbaar**.

## 2. Arborescence / Mapstructuur

```
dossiers/{client}/
├── ecritures/      # écritures PCMN/MAR — comptable / boekingen
├── declarations/   # TVA, ISoc, IPP, comptes annuels — comptable, fiscaliste
├── rapports/       # états financiers, ratios, dashboard — analyste-archiviste
├── echeances/      # échéancier fiscal/légal — analyste-archiviste
├── classeur/       # plan d'archivage et de classement — analyste-archiviste
└── notes/          # notes notariales — notaire-conseil
```

## 3. Convention de frontmatter / Frontmatter-conventie

**FR** — Tout fichier livrable commence par un bloc de **frontmatter YAML**
obligatoire (`client`, `agent`, `date`, `version`, `statut`). Le gabarit et les
détails sont dans [`_frontmatter.md`](_frontmatter.md).

**NL** — Elk document begint met een verplicht **YAML-frontmatterblok**
(`client`, `agent`, `date`, `version`, `statut`). Zie
[`_frontmatter.md`](_frontmatter.md).

## 4. Créer un nouveau client / Een nieuwe klant aanmaken

**FR** — Copiez ce modèle vers un nouveau dossier nommé d'après le client :

```bash
cp -R dossiers/_TEMPLATE dossiers/mon-client
```

Puis remplissez les sous-dossiers via les agents (`/pilotage`, `/cloture`,
`/tva`, `/echeances`, `/classer`, `/rapport`). Chaque livrable porte son
frontmatter YAML.

**NL** — Kopieer dit sjabloon naar een nieuwe map met de naam van de klant
(`cp -R dossiers/_TEMPLATE dossiers/mijn-klant`), en laat de agenten de
submappen vullen. Elk document draagt zijn YAML-frontmatter.

## 5. Garde-fous / Vrijwaringen

- **FR** — Données sourcées uniquement (statut `confirme`), validation humaine
  obligatoire avant tout dépôt, déclaration ou acte. Voir
  [`../../AGENTS.md`](../../AGENTS.md).
- **NL** — Alleen gedocumenteerde gegevens (status `confirme`), menselijke
  validatie verplicht vóór elke neerlegging, aangifte of akte. Zie
  [`../../AGENTS.md`](../../AGENTS.md).
