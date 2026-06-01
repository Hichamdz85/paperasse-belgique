/* =========================================================
   Paperasse Belgique — i18n (FR / NL)
   - Aucune dépendance, aucun framework, aucun localStorage.
   - Langue par défaut : FR. Le toggle met à jour l'attribut lang du <html>.
   - Le contenu est résolu via les attributs data-i18n du HTML.
   ========================================================= */

(function () {
  'use strict';

  // ---- Dictionnaire de traductions (clés FR/NL) ----
  var I18N = {
    fr: {
      meta_description: "Skills Claude Code pour automatiser la comptabilité et le notariat belges, en français et néerlandais, avec des données sourcées et datées.",
      doc_title: "Paperasse Belgique — Skills Claude Code pour la comptabilité et le notariat belges",

      nav_why: "Pourquoi",
      nav_skills: "Skills",
      nav_install: "Installation",
      nav_sources: "Sources",
      nav_github: "GitHub",

      hero_eyebrow: "Skills Claude Code · FR / NL",
      hero_title: "La bureaucratie belge, automatisée.",
      hero_sub: "Des skills Claude Code pour la comptabilité et le notariat belges — données sourcées et datées.",
      cta_install: "Installer",
      cta_github: "Voir sur GitHub",

      why_title: "Pourquoi Paperasse Belgique ?",
      why_body: "Je dirige trois sociétés en Belgique. Comme beaucoup d'entrepreneurs, je passe un temps considérable sur la comptabilité et les démarches administratives — un terrain aussi complexe que chronophage. Fort d'une formation en gestion d'entreprise et en comptabilité, j'ai voulu transformer cette difficulté en solution. Paperasse Belgique est né de cette expérience de terrain : un outil pensé pour épauler les entrepreneurs belges, leur faire gagner du temps et rendre la bureaucratie enfin compréhensible. Mon objectif est simple — aider celles et ceux qui entreprennent en Belgique à se concentrer sur leur activité, pas sur la paperasse.",

      skills_title: "Skills disponibles",
      skills_sub: "Chaque donnée chiffrée renvoie à une source officielle datée.",
      card_compta_desc: "Écritures PCMN, TVA/BTW, calcul ISoc/Ven.B, clôture annuelle et dépôt à la BNB.",
      card_notaire_desc: "Frais de notaire, droits d'enregistrement par région, succession, donation, SRL/BV.",
      card_asbl_desc: "ASBL/VZW : régime CSA Livre 9, comptabilité simplifiée ou en partie double, dépôt (greffe/BNB), IPM, taxe patrimoniale, TVA et registre UBO.",
      card_classeur_desc: "Organisation et archivage : arborescence de classement, conventions de nommage, conservation légale (7/10/15 ans), échéancier fiscal, tableau de bord, conseils.",
      card_soon_title: "Bientôt",
      card_soon_desc: "Indépendant / personne physique (IPP), TVA avancée — en préparation.",
      badge_quality: "Qualité",
      badge_source: "Sources vérifiées",
      badge_soon: "À venir",

      split_title: "Automatisé / Manuel",
      split_auto_title: "Automatisé",
      split_auto_1: "Calcul ISoc avec taux et conditions sourcés.",
      split_auto_2: "Échéances fiscales (BNB, Biztax, Intervat).",
      split_auto_3: "Bilan et compte de résultats (schéma BNB), FR/NL.",
      split_auto_4: "Checklists de dépôt et PV d'assemblée.",
      split_manual_title: "Manuel",
      split_manual_1: "Validation finale par un professionnel agréé.",
      split_manual_2: "Dépôt officiel et signature des actes.",
      split_manual_3: "Décisions stratégiques et fiscales.",
      split_manual_4: "Vérification des points marqués « à vérifier ».",

      install_title: "Installation",
      install_sub: "Clonez, validez, puis copiez les skills vers Claude Code.",
      copy_btn: "Copier",
      copy_done: "Copié",

      sources_title: "Sources officielles",
      sources_note: "Données vérifiées et datées (2026-05-29).",

      footer_disclaimer: "Ces skills ne remplacent pas un expert-comptable (ITAA), un réviseur (IRE) ni un notaire belge. Vérifiez toujours les sources officielles avant tout dépôt ou acte.",
      footer_license: "Licence MIT"
    },

    nl: {
      meta_description: "Claude Code-skills om de Belgische boekhouding en notariaat te automatiseren, in het Frans en Nederlands, met gedateerde en gecontroleerde bronnen.",
      doc_title: "Paperasse Belgique — Claude Code-skills voor de Belgische boekhouding en notariaat",

      nav_why: "Waarom",
      nav_skills: "Skills",
      nav_install: "Installatie",
      nav_sources: "Bronnen",
      nav_github: "GitHub",

      hero_eyebrow: "Claude Code-skills · FR / NL",
      hero_title: "De Belgische administratie, geautomatiseerd.",
      hero_sub: "Claude Code-skills voor de Belgische boekhouding en notariaat — gedateerde, gecontroleerde bronnen.",
      cta_install: "Installeren",
      cta_github: "Bekijk op GitHub",

      why_title: "Waarom Paperasse Belgique ?",
      why_body: "Ik leid drie vennootschappen in België. Zoals veel ondernemers besteed ik enorm veel tijd aan boekhouding en administratieve formaliteiten — een domein dat even complex als tijdrovend is. Met een achtergrond in bedrijfsbeheer en boekhouding wilde ik die moeilijkheid omzetten in een oplossing. Paperasse Belgique is ontstaan uit die praktijkervaring: een tool die Belgische ondernemers ondersteunt, hen tijd doet besparen en de administratie eindelijk begrijpelijk maakt. Mijn doel is eenvoudig — wie in België onderneemt, helpen zich te concentreren op hun activiteit en niet op de papierwinkel.",

      skills_title: "Beschikbare skills",
      skills_sub: "Elk cijfer verwijst naar een gedateerde officiële bron.",
      card_compta_desc: "MAR-boekingen, btw, berekening vennootschapsbelasting, jaarafsluiting en neerlegging bij de NBB.",
      card_notaire_desc: "Notariskosten, gewestelijke registratierechten, erfbelasting, schenkbelasting, BV/NV.",
      card_asbl_desc: "VZW : regeling WVV Boek 9, vereenvoudigde of dubbele boekhouding, neerlegging (griffie/NBB), rechtspersonenbelasting, patrimoniumtaks, btw en UBO-register.",
      card_classeur_desc: "Organisatie en archivering: mappenstructuur, naamgevingsconventies, wettelijke bewaartermijnen (7/10/15 jaar), fiscale vervaldagen, dashboard, advies.",
      card_soon_title: "Binnenkort",
      card_soon_desc: "Zelfstandige / natuurlijke persoon (PB), geavanceerde btw — in voorbereiding.",
      badge_quality: "Kwaliteit",
      badge_source: "Gecontroleerde bronnen",
      badge_soon: "Binnenkort",

      split_title: "Geautomatiseerd / Manueel",
      split_auto_title: "Geautomatiseerd",
      split_auto_1: "Berekening vennootschapsbelasting met gedocumenteerde tarieven en voorwaarden.",
      split_auto_2: "Fiscale vervaldagen (NBB, Biztax, Intervat).",
      split_auto_3: "Balans en resultatenrekening (NBB-schema), FR/NL.",
      split_auto_4: "Neerleggingschecklists en notulen van de vergadering.",
      split_manual_title: "Manueel",
      split_manual_1: "Eindvalidatie door een erkende beroepsbeoefenaar.",
      split_manual_2: "Officiële neerlegging en ondertekening van de akten.",
      split_manual_3: "Strategische en fiscale beslissingen.",
      split_manual_4: "Controle van de punten gemarkeerd als « te verifiëren ».",

      install_title: "Installatie",
      install_sub: "Kloon, valideer en kopieer de skills naar Claude Code.",
      copy_btn: "Kopiëren",
      copy_done: "Gekopieerd",

      sources_title: "Officiële bronnen",
      sources_note: "Geverifieerde en gedateerde gegevens (2026-05-29).",

      footer_disclaimer: "Deze skills vervangen geen accountant (ITAA), bedrijfsrevisor (IRE) of Belgische notaris. Controleer altijd de officiële bronnen vóór elke neerlegging of akte.",
      footer_license: "MIT-licentie"
    }
  };

  var LANGS = ["fr", "nl"];
  var current = "fr"; // langue par défaut

  // Applique une langue à toute la page (sans mélange : un seul choix actif).
  function applyLang(lang) {
    if (LANGS.indexOf(lang) === -1) { lang = "fr"; }
    current = lang;
    var dict = I18N[lang];

    // 1) Attribut lang du document
    document.documentElement.setAttribute("lang", lang);

    // 2) Titre du document
    if (dict.doc_title) { document.title = dict.doc_title; }

    // 3) Tous les éléments porteurs de data-i18n
    var nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = dict[key];
      if (value == null) { return; }
      if (el.tagName === "META") {
        el.setAttribute("content", value);
      } else {
        el.textContent = value;
      }
    });

    // 4) État visuel + accessibilité du toggle
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      var active = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  // Bouton « Copier » du bloc d'installation (vanilla, sans dépendance).
  function initCopy() {
    document.querySelectorAll(".copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = document.querySelector(btn.getAttribute("data-copy-target"));
        if (!target) { return; }
        var text = target.innerText;
        var done = function () {
          var original = I18N[current].copy_btn;
          btn.textContent = I18N[current].copy_done;
          btn.classList.add("is-copied");
          setTimeout(function () {
            btn.textContent = original;
            btn.classList.remove("is-copied");
          }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(done);
        } else {
          done();
        }
      });
    });
  }

  // Initialisation au chargement du DOM.
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.getAttribute("data-lang"));
      });
    });
    initCopy();
    applyLang("fr"); // langue par défaut
  });
})();
