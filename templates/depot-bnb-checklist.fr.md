# Checklist — Dépôt des comptes annuels à la BNB (Centrale des bilans)

> Modèle paperasse-be. Région : Wallonie, ou volet FR pour Bruxelles. Version néerlandaise : `depot-bnb-checklist.nl.md`.
> Société : **{denomination}** ({forme_juridique}) — BCE {bce} — exercice clôturé le {exercice_cloture}.

---

## 1. Déterminer le schéma applicable (selon la taille de la société)

Le schéma de comptes annuels dépend de la taille de la société (critères des art. 1:24 et 1:25 CSA).

- [ ] **Microsociété** → **micro-schéma** (ne dépasse pas plus d'un des seuils : 10 travailleurs / 900.000 EUR de chiffre d'affaires HT / 450.000 EUR de total du bilan, et n'est ni mère ni filiale). Source : data/sources.json id `compta-seuil-micro`.
- [ ] **Petite société** → **schéma abrégé** (ne dépasse pas plus d'un des seuils : 50 travailleurs / 11.250.000 EUR de chiffre d'affaires net HT / 6.000.000 EUR de total du bilan). Source : data/sources.json id `compta-seuil-petite`.
- [ ] **Grande société** → **schéma complet** (dépasse plus d'un des critères de l'art. 1:24 CSA, ou société cotée).
- [ ] Schéma retenu pour cet exercice : **{schema_comptes}**.

> Note : le (non-)dépassement de plus d'un critère ne produit effet que s'il dure deux exercices consécutifs. Une petite société ou une microsociété peut volontairement déposer un schéma plus détaillé.

## 2. Approbation préalable par l'assemblée générale

- [ ] Les comptes annuels ont été approuvés par l'assemblée générale (voir `templates/pv-approbation-comptes.fr.md`).
- [ ] Le procès-verbal d'approbation est conservé et daté (date d'AG : {date_ag}).

## 3. Choisir le format de dépôt

Le dépôt s'effectue via l'application Filing de la Centrale des bilans, en l'un des deux formats :

- [ ] **XBRL** (format structuré, standard recommandé).
- [ ] **PDF** (format alternatif).

## 4. Respecter les délais légaux

- [ ] **Assemblée générale** : tenue dans les **six mois** suivant la clôture de l'exercice.
- [ ] **Dépôt à la BNB** : dans les **trente jours** suivant l'approbation par l'assemblée générale.
- [ ] **Délai limite absolu** : **sept mois** après la clôture de l'exercice.
- Base : art. 3:1, 3:10 et 3:12 CSA. Source : data/sources.json id `compta-bnb-delais`.

## 5. Vérifier les frais de dépôt 2026

Frais de dépôt 2026 (sociétés) selon le schéma et le format. Source : data/sources.json id `compta-bnb-frais-2026`.

| Modèle | XBRL | PDF |
|---|---|---|
| Complet | 379,50 EUR | 449,70 EUR |
| Abrégé | 89,40 EUR | 159,50 EUR |
| Micro | 67,00 EUR | 137,30 EUR |

- Dépôt corrigé (complet / abrégé) : 86,00 EUR — micro : 54,70 EUR.
- [ ] Montant à payer identifié pour le schéma **{schema_comptes}** au format choisi.

## 6. Effectuer le paiement dans le délai

- [ ] Paiement reçu par la BNB dans les **six jours ouvrables** après le marquage « prêt au paiement », faute de quoi le dépôt est rejeté automatiquement. Source : data/sources.json id `compta-bnb-frais-2026`.

## 7. Confirmation

- [ ] Accusé de réception / confirmation de dépôt reçu de la Centrale des bilans.
- [ ] Comptes annuels consultables via la BNB.

---

> Rappel : tout montant doit être vérifié sur la source officielle (BNB / NBB) au moment du dépôt. Les frais 2026 ci-dessus renvoient à data/sources.json id `compta-bnb-frais-2026` (statut confirmé, consultation 2026-05-29).
>
> Surcharge pour dépôt tardif (art. 3:13 CSA), barème confirmé applicable dès le 01/01/2026 (selon le retard : ≤ 3 mois / 4-6 mois / > 6 mois après le délai légal) :
> - **Petites sociétés** : **151 €** / **227 €** / **453 €**.
> - **Autres sociétés** : **504 €** / **755 €** / **1.510 €**.
>
> Source : data/sources.json id `compta-bnb-frais-2026` (consultation 2026-05-29) — à reconfirmer sur la BNB / NBB au moment du dépôt.
