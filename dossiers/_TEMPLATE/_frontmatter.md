# Gabarit de frontmatter YAML / YAML-frontmatter-sjabloon

> **FR** — Tout livrable écrit dans `dossiers/{client}/` DOIT commencer par ce
> bloc de frontmatter YAML. C'est ce qui rend la mémoire de l'équipe
> **auditable** (qui a produit quoi, quand, dans quelle version, à quel stade
> de validation).
>
> **NL** — Elk document in `dossiers/{client}/` MOET met dit YAML-frontmatterblok
> beginnen. Dat maakt het geheugen van het team **auditeerbaar**.

## Champs obligatoires / Verplichte velden

| Champ / Veld | Type | Description (FR) | Beschrijving (NL) |
|---|---|---|---|
| `client`  | texte    | Identifiant du dossier client (= nom du sous-dossier de `dossiers/`). | Klantdossier-ID (= naam van de submap). |
| `agent`   | texte    | Agent qui a produit le livrable (`comptable`, `fiscaliste`, `notaire-conseil`, `gestionnaire-asbl`, `conseiller-independant`, `analyste-archiviste`, `directeur-financier`). | Agent die het document heeft gemaakt. |
| `date`    | date     | Date de production, format `YYYY-MM-DD`. | Productiedatum, formaat `YYYY-MM-DD`. |
| `version` | entier   | Numéro de version, incrémenté à chaque révision (1, 2, 3…). | Versienummer, opgehoogd bij elke herziening. |
| `statut`  | énum     | `brouillon` \| `a_valider` \| `valide`. | `brouillon` \| `a_valider` \| `valide`. |

## Cycle de vie du statut / Levenscyclus van de status

```
brouillon  ──▶  a_valider  ──▶  valide
(agent)         (prêt pour      (validé par un
                 revue humaine)  professionnel agréé)
```

> Un livrable n'est `valide` qu'après **validation humaine** par un
> professionnel agréé (expert-comptable ITAA, réviseur IRE, notaire, INASTI).

## Gabarit (à copier en tête de fichier) / Sjabloon

```yaml
---
client: nom-du-client
agent: comptable
date: 2026-06-12
version: 1
statut: brouillon
---
```

## Exemple rempli / Ingevuld voorbeeld

```yaml
---
client: demo-srl
agent: fiscaliste
date: 2026-06-12
version: 2
statut: a_valider
---
```
