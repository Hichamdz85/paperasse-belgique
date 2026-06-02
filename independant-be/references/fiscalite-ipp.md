# Fiscalité IPP — indépendant personne physique (FR/NL)

> Impôt des personnes physiques (IPP) / Personenbelasting (PB).
> Toutes les valeurs proviennent de `references/sources.json`. Année de
> référence : exercice d'imposition 2026 (revenus 2025).
> Aucune valeur en dur sans renvoi à une source confirmée.

---

## 1. Barème progressif IPP — ex. imp. 2026 (revenus 2025)

Source : `ipp-bareme` (confirmé, SPF Finances, 2026-06-02).

| Tranche de revenu imposable | Taux |
|-----------------------------|------|
| 0 – 16.320 EUR | **25 %** |
| 16.320 – 28.800 EUR | 40 % |
| 28.800 – 49.840 EUR | 45 % |
| au-delà de 49.840 EUR | 50 % |

> **Additionnels communaux** en sus (taxe communale additionnelle à l'IPP,
> variable selon la commune). Le barème ci-dessus est le barème fédéral.

---

## 2. Quotité du revenu exemptée d'impôt

Source : `ipp-quotite-exemptee` (confirmé, SPF Finances, 2026-06-02).

- Montant de base (revenus 2025) : **10.910 EUR**.
- Cette quotité est exemptée d'impôt (majorations possibles selon la situation
  familiale — enfants à charge, etc., non détaillées ici).

---

## 3. Frais professionnels

Source : `ipp-frais-pro` (**confirmé partiel** — annoncer la réserve, plafond
indépendant à confirmer CIR 92 art. 51).

- **Dirigeant d'entreprise** : forfait **3 %** (plafond **3.130 EUR**).
- **Indépendant** (bénéfices/profits) : forfait **~30 %** (plafond ~5.930 EUR,
  à confirmer).
- **Option frais réels** : l'indépendant peut opter pour la déduction des frais
  professionnels réels (justificatifs requis) au lieu du forfait.

> Mention de réserve obligatoire dans la réponse : « plafond du forfait
> indépendant sous réserve de confirmation (CIR 92 art. 51) ».

---

## 4. Versements anticipés IPP

Source : `ipp-versements-anticipes` (**confirmé partiel** — taux structurel à
confirmer pour l'ex. imp. 2026, la page SPF affiche déjà l'ex. imp. 2027).

- **4 échéances** dans l'année : **10/04, 10/07, 10/10, 20/12** (report au 1er
  jour ouvrable si week-end/férié).
- **Majoration** en cas d'insuffisance de versements anticipés (taux structurel
  ~9 % pour l'ex. imp. 2026, à confirmer).
- **Primostarters** : exonérés de la majoration pendant les **3 premières
  années** d'activité.

> Les versements anticipés évitent la majoration d'impôt ; ils ne sont pas une
> taxe distincte mais une avance sur l'IPP dû.

---

## 5. Disclaimer

Ces données ne remplacent pas le SPF Finances ni un conseiller fiscal ITAA.
Vérifier les barèmes et plafonds avant toute déclaration. Les valeurs
`confirme_partiel` portent leur réserve et ne sont pas présentées comme
certaines.
