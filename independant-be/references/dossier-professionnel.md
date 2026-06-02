# Dossier professionnel — niveau cabinet (FR/NL)

> Méthode d'organisation d'un **dossier professionnel structuré** pour
> l'indépendant personne physique, au niveau d'un cabinet comptable/fiscal.
> **Organisation et méthode uniquement** — ce document ne contient **aucun
> chiffre non sourcé** (taux, montants et seuils restent dans
> `fiscalite-ipp.md`, `cotisations-sociales.md`, `comptabilite-independant.md`).

---

## 1. Principe

Un dossier « niveau cabinet » se structure en **deux dossiers** complémentaires
(permanent + annuel), prolongés par une **note de synthèse** et un **reporting
trimestriel**. L'objectif : qu'un tiers (comptable, contrôleur, banque) puisse
reconstituer la situation de l'indépendant **sans explication orale**.

---

## 2. Dossier permanent

Documents stables, mis à jour seulement en cas de changement.

- **Identité** : nom, prénom, numéro national, **numéro d'entreprise (BCE/KBO)**,
  **numéro de TVA**, régime TVA (normal / franchise), adresse du siège
  d'exploitation, région (détermine la langue de travail).
- **Affiliations** : **caisse d'assurances sociales** (n° d'affiliation),
  mutuelle, **guichet d'entreprises** agréé, éventuelle assurance PLCI/INAMI.
- **Contrats structurants** : bail commercial, contrats de leasing, contrats de
  collaboration, conditions générales, mandats.
- **Autorisations / agréments** : licences, accès à la profession, inscriptions
  professionnelles éventuelles.

---

## 3. Dossier annuel

Un sous-dossier par exercice comptable.

- **Recettes / dépenses** : journal des recettes, facturier d'entrée, journal
  financier (cf. `comptabilite-independant.md`).
- **Justificatifs** classés par catégorie (achats, ventes, banque, frais
  professionnels) et par trimestre.
- **Déclarations** : déclarations **TVA** (Intervat), déclaration **IPP**
  (Tax-on-web), décomptes **INASTI** de la caisse d'assurances sociales.
- **Preuves de versements anticipés** IPP et de paiements de cotisations
  trimestrielles INASTI.

---

## 4. Note de synthèse (par exercice)

Une page de synthèse, mise à jour à chaque clôture :

- Situation **IPP** (revenu net professionnel estimé, régime de frais retenu).
- Situation **INASTI** (titre principal / complémentaire / primostarter,
  cotisations provisoires vs régularisation attendue).
- Situation **TVA** (régime, périodicité, solde).
- **Points ouverts** (questions au comptable, documents manquants).
- **Échéances à venir** (cf. §6).

---

## 5. Reporting trimestriel

- Suivi des **cotisations INASTI** payées vs dues (dernier jour du trimestre).
- Suivi de la **TVA** déposée et payée.
- **Rapprochement** systématique avec les **relevés bancaires**.
- Mise à jour de la note de synthèse.

---

## 6. Outils du dépôt

L'organisation s'appuie sur les scripts du dépôt (lisent `company.json`,
n'utilisent que des données sourcées) :

| Commande | Rôle |
|----------|------|
| `npm run classeur` | Crée l'arborescence d'archivage et propose le nom canonique d'une pièce. |
| `npm run echeancier` | Calcule les échéances fiscales sur un horizon donné (option `--ics`). |
| `npm run dashboard` | Génère un tableau de bord HTML (KPIs + prochaines échéances). |

---

## 7. Disclaimer

Cette méthode d'organisation ne remplace pas un expert-comptable ITAA, votre
caisse d'assurances sociales, l'INASTI ni le SPF Finances. Elle vise la clarté
et la traçabilité du dossier, pas le conseil fiscal ou social individualisé.
