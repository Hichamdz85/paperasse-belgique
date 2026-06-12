# AGENTS.md — Équipe d'agents paperasse-be (FR/NL)

> Guide plateforme de l'équipe d'agents Claude Code construite par-dessus
> paperasse-be. Une couche d'**orchestration** qui prépare et organise le travail
> comptable, fiscal, notarial et administratif belge — au-dessus des 5 skills
> (`comptable-be`, `notaire-be`, `asbl-be`, `classeur-be`, `independant-be`) et du
> registre central de sources `data/sources.json`.
>
> Platformgids voor het Claude Code-agententeam bovenop paperasse-be. Een
> **orchestratielaag** die het Belgische boekhoudkundige, fiscale, notariële en
> administratieve werk voorbereidt en organiseert — bovenop de 5 skills en het
> centrale bronnenregister `data/sources.json`.

---

## 1. Architecture / Architectuur

Un **orchestrateur** (CFO virtuel) au centre route les demandes vers 6
spécialistes et consolide leurs livrables. La **mémoire** de l'équipe = les
fichiers Markdown versionnés produits dans `dossiers/{client}/` (frontmatter
YAML). L'orchestrateur ne produit jamais le livrable lui-même.

```
                          ┌───────────────────────────────┐
            Dirigeant ───▶│   directeur-financier (opus)  │
            Bedrijfs-     │   ORCHESTRATEUR / CFO virtuel │
            leider        │   route + consolide, ne        │
                          │   calcule jamais lui-même      │
                          └───────────────┬───────────────┘
                                          │ route
        ┌───────────────┬─────────────────┼─────────────────┬───────────────┐
        ▼               ▼                 ▼                 ▼               ▼
 ┌────────────┐  ┌────────────┐   ┌───────────────┐ ┌──────────────┐ ┌────────────────────┐
 │ comptable  │  │ fiscaliste │   │ notaire-      │ │ gestionnaire-│ │ conseiller-        │
 │ (sonnet)   │  │ (opus)     │   │ conseil       │ │ asbl         │ │ independant        │
 │ comptable- │  │ ISoc/IPP/  │   │ (sonnet)      │ │ (sonnet)     │ │ (sonnet)           │
 │ be         │  │ TVA/VA     │   │ notaire-be    │ │ asbl-be      │ │ independant-be     │
 └─────┬──────┘  └─────┬──────┘   └──────┬────────┘ └──────┬───────┘ └─────────┬──────────┘
       │               │                 │                │                   │
       └───────────────┴────────┬────────┴────────────────┴───────────────────┘
                                 ▼
                        ┌────────────────────┐
                        │ analyste-archiviste│   états financiers · ratios ·
                        │ (opus)             │   dashboard · échéancier ·
                        │ classeur-be +      │   archivage
                        │ scripts/*          │
                        └─────────┬──────────┘
                                  ▼
                ┌──────────────────────────────────────────────┐
                │  MÉMOIRE = dossiers/{client}/ (Markdown +     │
                │  frontmatter YAML, versionnés)               │
                └──────────────────────────────────────────────┘
```

---

## 2. Roster / Bezetting

| Agent | Rôle | Modèle | Skill utilisé | Dossier de sortie |
|---|---|---|---|---|
| `directeur-financier` | Orchestrateur / CFO virtuel — route & consolide | opus | (tous, via délégation) | synthèse (pas de fichier propre) |
| `comptable` | Écritures, TVA, ISoc, clôture, dépôt BNB | sonnet | `comptable-be` | `ecritures/`, `declarations/` |
| `fiscaliste` | Fiscalité transversale (ISoc, IPP, TVA, précompte, VA) | opus | `comptable-be` + `independant-be` | `declarations/` |
| `notaire-conseil` | Frais notaire, droits d'enregistrement par région, succession, donation, SRL/BV | sonnet | `notaire-be` | `notes/` |
| `gestionnaire-asbl` | ASBL/VZW : CSA Livre 9, IPM, taxe patrimoniale, UBO | sonnet | `asbl-be` | `dossiers/{client}/` |
| `conseiller-independant` | Indépendant : IPP, INASTI/RSVZ, franchise TVA, compta simplifiée | sonnet | `independant-be` | `dossiers/{client}/` |
| `analyste-archiviste` | États financiers, ratios, dashboard, échéancier, archivage | opus | `classeur-be` + `scripts/*` | `rapports/`, `echeances/`, `classeur/` |

---

## 3. Conventions / Conventies

### Arborescence du dossier client

```
dossiers/{client}/
├── ecritures/      # écritures PCMN/MAR (comptable)
├── declarations/   # TVA, ISoc, IPP, comptes annuels (comptable, fiscaliste)
├── rapports/       # états financiers, ratios, dashboard (analyste-archiviste)
├── echeances/      # échéancier fiscal/légal (analyste-archiviste)
├── classeur/       # plan d'archivage et de classement (analyste-archiviste)
└── notes/          # notes notariales (notaire-conseil)
```

### Frontmatter YAML obligatoire (tout livrable)

```yaml
---
client: nom-du-client
agent: comptable
date: 2026-06-12
version: 1
statut: brouillon   # brouillon | a_valider | valide
---
```

---

## 4. Règles transverses / Transversale regels (garde-fous)

Inscrites, à l'identique, dans **chaque** agent :

1. **Portée.** Chaque agent PRÉPARE et ORGANISE ; il ne remplace **NI** un
   expert-comptable (ITAA/IEC-IRE), **NI** un réviseur (IRE), **NI** un notaire,
   **NI** l'INASTI. **Validation humaine obligatoire** avant tout dépôt,
   déclaration ou acte.
2. **Sources.** Toute valeur chiffrée provient de `data/sources.json` (ou du
   `references/sources.json` du skill), statut **« confirme » UNIQUEMENT**, en
   citant l'`id`. Une donnée **« a_verifier »** n'entre JAMAIS dans un calcul et
   n'est jamais présentée comme certaine.
3. **company.json d'abord.** Lire `company.json` (`forme_juridique`, `region`,
   `langue`, `regime_tva`, `exercice`) AVANT de produire. Langue de travail selon
   la région : `bruxelles` = **fr-nl**, `flandre` = **nl**, `wallonie` = **fr**.
4. **Traçabilité.** Tout livrable dans `dossiers/{client}/` porte le frontmatter
   YAML (`client`, `agent`, `date`, `version`, `statut`).

---

## 5. Slash commands / Slash-commando's

> Les commandes vivent dans `.claude/commands/` (créées séparément). Elles
> servent de raccourcis vers l'orchestrateur ou un spécialiste.

| Commande | Effet |
|---|---|
| `/pilotage` | Lance `directeur-financier` : synthèse de pilotage (échéances, état du dossier, points d'attention, recommandations). |
| `/cloture` | Clôture annuelle : route vers `comptable` + `fiscaliste` + `analyste-archiviste`. |
| `/tva` | Déclaration TVA/BTW : route vers `comptable` (et `fiscaliste` si arbitrage). |
| `/echeances` | Échéancier fiscal/légal via `analyste-archiviste` (`echeancier.mjs`). |
| `/classer` | Archivage et plan de classement via `analyste-archiviste` (`classeur.mjs` + `classeur-be`). |
| `/rapport` | États financiers, ratios et tableau de bord via `analyste-archiviste`. |

---

## 6. Installation / Installatie

Deux options :

1. **Ouvrir `paperasse-be` comme projet Claude Code.** Les agents de
   `.claude/agents/` et les commandes de `.claude/commands/` sont chargés
   automatiquement.
2. **Installation globale.** Copier `.claude/agents/*` et `.claude/commands/*`
   vers `~/.claude/agents/` et `~/.claude/commands/` pour les rendre disponibles
   dans tous les projets (les agents lisent alors `company.json`,
   `data/sources.json` et les scripts depuis le dépôt paperasse-be courant).

---

## 7. Portée et honnêteté / Reikwijdte en eerlijkheid

- C'est une **couche d'orchestration dans Claude Code** — **pas** un SaaS, **pas**
  un logiciel comptable, **pas** un remplaçant d'un professionnel agréé.
- **Chaîne auditable** : chaque livrable cite ses sources `confirme` (`id` +
  date), porte un frontmatter YAML et reste un fichier Markdown versionnable.
- **Données sourcées** : aucune valeur chiffrée n'est inventée ; les données
  `a_verifier` sont signalées et exclues des calculs.
- **Validation humaine** : tout dépôt, déclaration ou acte doit être validé par
  un professionnel agréé (expert-comptable ITAA, réviseur IRE, notaire, INASTI)
  avant exécution.
