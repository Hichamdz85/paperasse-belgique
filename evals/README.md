# Évaluations / Evaluaties — Paperasse Belgique

Banc d'évaluation des skills. Deux modes, une exigence : **aucun chiffre non mesuré**.

## FR

### Mode `grounding` (par défaut, sans clé API, exécuté en CI)

```bash
npm run evals
```

Pour chaque scénario de `<skill>/evals/evals.json`, le banc vérifie que **chaque assertion
est adossée à une source confirmée** : le `source_id` existe (dans `data/sources.json` ou
`<skill>/references/sources.json`), son `statut` est confirmé, et sa `valeur` contient les
jetons `must_match`.

C'est une mesure de **couverture sourcée** : le skill dispose-t-il, de façon sourcée et
datée, de l'information nécessaire pour répondre correctement ? C'est aussi un **garde-fou
de non-régression** : si une donnée passe en « à vérifier » ou si un identifiant de source
disparaît, l'éval échoue (et le CI devient rouge).

> Le badge « évals » du README reflète **cette** mesure (couverture sourcée), réellement
> calculée par le CI. Ce n'est pas un score de qualité d'agent.

### Mode `--llm` (A/B « avec skill vs sans skill », expérimental, hors CI)

```bash
export ANTHROPIC_API_KEY=...   # votre clé
npm run evals:llm
```

Interroge le modèle deux fois par scénario (contexte = `SKILL.md` vs aucun contexte), fait
juger chaque assertion, et affiche les scores avec/sans + le delta — à la manière du projet
français [paperasse](https://github.com/romainsimon/paperasse).

**Honnêteté méthodologique :** aucun chiffre de delta (« +X % avec skill ») n'est publié
dans le dépôt tant qu'il n'a pas été réellement mesuré sur un échantillon suffisant. Le mode
`--llm` est fourni pour permettre cette mesure ; les résultats dépendent du modèle, de la
température et de la taille de l'échantillon.

### Ajouter un scénario

Éditez `<skill>/evals/evals.json` :

```json
{
  "id": 8,
  "name": "slug-court",
  "langue": "fr",
  "company": { "region": "bruxelles", "regime_tva": "normal" },
  "prompt": "Question réaliste de l'utilisateur.",
  "expected_output": "Ce que le skill doit répondre.",
  "assertions": [
    { "text": "Assertion vérifiable", "source_id": "fisc-isoc-taux-normal", "must_match": ["25"] }
  ]
}
```

Règle d'or : `source_id` doit être **confirmé**, et chaque `must_match` doit figurer
littéralement dans la `valeur` de la source. Lancez `npm run evals` pour valider.

## NL

### Modus `grounding` (standaard, zonder API-sleutel, in CI)

```bash
npm run evals
```

Voor elk scenario controleert het banc of **elke bewering gedekt is door een bevestigde
bron** (`source_id` bestaat, status bevestigd, `valeur` bevat de `must_match`-tokens). Het is
een maat voor **brondekking** en een **non-regressiebewaking**: wordt een gegeven « te
verifiëren » of verdwijnt een bron-id, dan faalt de eval (CI wordt rood).

### Modus `--llm` (A/B « met vs zonder skill », experimenteel, buiten CI)

```bash
export ANTHROPIC_API_KEY=...
npm run evals:llm
```

Bevraagt het model tweemaal per scenario en beoordeelt elke bewering. **Methodologische
eerlijkheid:** er wordt geen delta-cijfer (« +X % ») gepubliceerd zolang het niet echt
gemeten is.
