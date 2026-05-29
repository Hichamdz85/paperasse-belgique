# Checklist — Neerlegging van de jaarrekening bij de NBB (Balanscentrale)

> Sjabloon paperasse-be. Gewest: Vlaanderen, of NL-luik voor Brussel. Franstalige versie: `depot-bnb-checklist.fr.md`.
> Vennootschap: **{denomination}** ({forme_juridique}) — KBO {bce} — boekjaar afgesloten op {exercice_cloture}.

---

## 1. Het toepasselijke schema bepalen (volgens de grootte van de vennootschap)

Het schema van de jaarrekening hangt af van de grootte van de vennootschap (criteria van art. 1:24 en 1:25 WVV).

- [ ] **Microvennootschap** → **microschema** (overschrijdt niet meer dan één van de drempels: 10 werknemers / 900.000 EUR omzet excl. btw / 450.000 EUR balanstotaal, en is moeder noch dochter). Bron: data/sources.json id `compta-seuil-micro`.
- [ ] **Kleine vennootschap** → **verkort schema** (overschrijdt niet meer dan één van de drempels: 50 werknemers / 11.250.000 EUR netto-omzet excl. btw / 6.000.000 EUR balanstotaal). Bron: data/sources.json id `compta-seuil-petite`.
- [ ] **Grote vennootschap** → **volledig schema** (overschrijdt meer dan één van de criteria van art. 1:24 WVV, of beursgenoteerde vennootschap).
- [ ] Gekozen schema voor dit boekjaar: **{schema_comptes}**.

> Opmerking: de (niet-)overschrijding van meer dan één criterium heeft pas gevolg wanneer zij twee opeenvolgende boekjaren aanhoudt. Een kleine vennootschap of een microvennootschap mag vrijwillig een gedetailleerder schema neerleggen.

## 2. Voorafgaande goedkeuring door de algemene vergadering

- [ ] De jaarrekening werd goedgekeurd door de algemene vergadering (zie `templates/pv-approbation-comptes.nl.md`).
- [ ] De notulen van de goedkeuring zijn bewaard en gedateerd (datum van de algemene vergadering: {date_ag}).

## 3. Het neerleggingsformaat kiezen

De neerlegging gebeurt via de Filing-toepassing van de Balanscentrale, in een van de twee formaten:

- [ ] **XBRL** (gestructureerd formaat, aanbevolen standaard).
- [ ] **PDF** (alternatief formaat).

## 4. De wettelijke termijnen naleven

- [ ] **Algemene vergadering**: gehouden binnen **zes maanden** na de afsluiting van het boekjaar.
- [ ] **Neerlegging bij de NBB**: binnen **dertig dagen** na de goedkeuring door de algemene vergadering.
- [ ] **Absolute uiterste termijn**: **zeven maanden** na de afsluiting van het boekjaar.
- Grondslag: art. 3:1, 3:10 en 3:12 WVV. Bron: data/sources.json id `compta-bnb-delais`.

## 5. De neerleggingskosten 2026 nagaan

Neerleggingskosten 2026 (vennootschappen) volgens schema en formaat. Bron: data/sources.json id `compta-bnb-frais-2026`.

| Model | XBRL | PDF |
|---|---|---|
| Volledig | 379,50 EUR | 449,70 EUR |
| Verkort | 89,40 EUR | 159,50 EUR |
| Micro | 67,00 EUR | 137,30 EUR |

- Verbeterde neerlegging (volledig / verkort): 86,00 EUR — micro: 54,70 EUR.
- [ ] Te betalen bedrag bepaald voor het schema **{schema_comptes}** in het gekozen formaat.

## 6. De betaling binnen de termijn uitvoeren

- [ ] Betaling ontvangen door de NBB binnen **zes werkdagen** na de markering « klaar voor betaling », anders wordt de neerlegging automatisch verworpen. Bron: data/sources.json id `compta-bnb-frais-2026`.

## 7. Bevestiging

- [ ] Ontvangstbewijs / bevestiging van neerlegging ontvangen van de Balanscentrale.
- [ ] Jaarrekening raadpleegbaar via de NBB.

---

> Herinnering: elk bedrag moet op het ogenblik van de neerlegging worden geverifieerd op de officiële bron (NBB / BNB). De kosten 2026 hierboven verwijzen naar data/sources.json id `compta-bnb-frais-2026` (status bevestigd, raadpleging 2026-05-29).
>
> Toeslag voor laattijdige neerlegging (art. 3:13 WVV), bevestigd tarief van toepassing vanaf 01/01/2026 (volgens de vertraging: ≤ 3 maanden / 4-6 maanden / > 6 maanden na de wettelijke termijn):
> - **Kleine vennootschappen**: **151 EUR** / **227 EUR** / **453 EUR**.
> - **Andere vennootschappen**: **504 EUR** / **755 EUR** / **1.510 EUR**.
>
> Bron: data/sources.json id `compta-bnb-frais-2026` (raadpleging 2026-05-29) — te herbevestigen bij de NBB / BNB op het ogenblik van de neerlegging.
