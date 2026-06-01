// run-evals.mjs
// -----------------------------------------------------------------------------
// Banc d'évaluation des skills Paperasse Belgique.
//
// DEUX MODES :
//   1) grounding (par défaut) — SANS clé API, déterministe, exécuté en CI.
//      Pour chaque assertion d'un scénario, vérifie que :
//        - le `source_id` référencé existe dans data/sources.json OU dans
//          <skill>/references/sources.json,
//        - son `statut` est confirmé (confirme / confirme_partiel / confirme_avec_reserve),
//        - sa `valeur` contient tous les jetons `must_match` (insensible à la casse/accents).
//      => mesure la COUVERTURE SOURCÉE : le skill dispose-t-il, de façon sourcée et
//         confirmée, de l'information nécessaire pour satisfaire chaque assertion ?
//      C'est un garde-fou de non-régression : si une donnée passe en « à vérifier »
//      ou si un id disparaît, l'éval échoue.
//
//   2) --llm — A/B « avec skill vs sans skill » (EXPÉRIMENTAL, hors CI).
//      Nécessite ANTHROPIC_API_KEY. Interroge le modèle deux fois par scénario
//      (contexte = SKILL.md vs aucun contexte), fait juger chaque assertion, et
//      calcule les scores avec/sans + delta. AUCUN chiffre de delta n'est publié
//      tant qu'il n'a pas été réellement mesuré (cf. evals/README.md).
//
// Node >= 18, aucune dépendance externe.
// -----------------------------------------------------------------------------

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONFIRMED = new Set(['confirme', 'confirme_partiel', 'confirme_avec_reserve']);

// --- utilitaires ---

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // retire les accents
    .replace(/\s+/g, ' ')
    .trim();
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

// Construit la table id -> { statut, valeur } à partir du registre central
// et du registre local du skill (le local prime en cas de doublon d'id).
async function buildSourceIndex(skillDir) {
  const index = new Map();
  const central = join(ROOT, 'data', 'sources.json');
  if (existsSync(central)) {
    for (const s of (await readJson(central)).sources || []) {
      index.set(s.id, { statut: s.statut, valeur: s.valeur });
    }
  }
  const local = join(ROOT, skillDir, 'references', 'sources.json');
  if (existsSync(local)) {
    for (const s of (await readJson(local)).sources || []) {
      index.set(s.id, { statut: s.statut, valeur: s.valeur });
    }
  }
  return index;
}

async function discoverEvalSkills() {
  const out = [];
  for (const entry of await readdir(ROOT, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (existsSync(join(ROOT, entry.name, 'evals', 'evals.json'))) out.push(entry.name);
  }
  return out.sort();
}

// --- mode grounding ---

async function runGrounding() {
  const skills = await discoverEvalSkills();
  if (skills.length === 0) {
    console.error('Aucun skill avec evals/evals.json trouvé.');
    process.exit(1);
  }

  let totalAssertions = 0;
  let grounded = 0;
  const failures = [];

  for (const skill of skills) {
    const index = await buildSourceIndex(skill);
    const suite = await readJson(join(ROOT, skill, 'evals', 'evals.json'));
    const evals = suite.evals || [];
    let skillAssertions = 0;
    let skillGrounded = 0;

    for (const ev of evals) {
      for (const a of ev.assertions || []) {
        totalAssertions += 1;
        skillAssertions += 1;
        const ref = `${skill}#${ev.id} "${a.text}"`;

        if (!a.source_id) {
          failures.push(`${ref} : pas de source_id`);
          continue;
        }
        const src = index.get(a.source_id);
        if (!src) {
          failures.push(`${ref} : source_id introuvable (${a.source_id})`);
          continue;
        }
        if (!CONFIRMED.has(src.statut)) {
          failures.push(`${ref} : source ${a.source_id} non confirmée (statut=${src.statut})`);
          continue;
        }
        const haystack = normalize(src.valeur);
        const missing = (a.must_match || []).filter((tok) => !haystack.includes(normalize(tok)));
        if (missing.length) {
          failures.push(`${ref} : jetons absents de la source ${a.source_id} -> ${missing.join(', ')}`);
          continue;
        }
        grounded += 1;
        skillGrounded += 1;
      }
    }

    const pct = skillAssertions ? Math.round((skillGrounded / skillAssertions) * 100) : 0;
    console.log(`- ${skill} : ${skillGrounded}/${skillAssertions} assertions sourcées (${pct} %) sur ${evals.length} scénario(s)`);
  }

  const pct = totalAssertions ? Math.round((grounded / totalAssertions) * 100) : 0;
  console.log('------------------------------------------------------------------------');
  console.log(`Couverture sourcée globale : ${grounded}/${totalAssertions} (${pct} %)`);
  console.log('========================================================================');

  if (failures.length) {
    console.error('\nECHEC — assertions non sourcées :');
    for (const f of failures) console.error(`- ${f}`);
    process.exit(1);
  }
  console.log('OK — toutes les assertions des évals sont adossées à une source confirmée.');
}

// --- mode llm (expérimental, hors CI) ---

async function runLlm() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('Mode --llm : variable ANTHROPIC_API_KEY absente. Voir evals/README.md.');
    process.exit(2);
  }
  const model = process.env.EVAL_MODEL || 'claude-sonnet-4-5';
  const skills = await discoverEvalSkills();
  console.log(`Mode A/B (modèle ${model}) — EXPÉRIMENTAL. Ne publie aucun delta non mesuré.\n`);

  for (const skill of skills) {
    const suite = await readJson(join(ROOT, skill, 'evals', 'evals.json'));
    const skillMd = await readFile(join(ROOT, skill, 'SKILL.md'), 'utf8');
    for (const ev of suite.evals || []) {
      const withCtx = await ask(apiKey, model, skillMd, ev.prompt);
      const without = await ask(apiKey, model, '', ev.prompt);
      const scoreWith = await judge(apiKey, model, ev, withCtx);
      const scoreWithout = await judge(apiKey, model, ev, without);
      const n = (ev.assertions || []).length || 1;
      console.log(`${skill}#${ev.id} ${ev.name} : avec=${scoreWith}/${n} · sans=${scoreWithout}/${n} · delta=${scoreWith - scoreWithout}`);
    }
  }
  console.log('\nNB : reportez ces chiffres dans le README UNIQUEMENT après mesure réelle.');
}

async function callAnthropic(apiKey, model, system, user, maxTokens) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system: system || undefined,
      messages: [{ role: 'user', content: user }],
    }),
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return (data.content || []).map((b) => b.text || '').join('\n');
}

function ask(apiKey, model, skillMd, prompt) {
  const system = skillMd
    ? `Tu es un agent équipé du skill suivant. Utilise-le.\n\n${skillMd}`
    : '';
  return callAnthropic(apiKey, model, system, prompt, 1500);
}

async function judge(apiKey, model, ev, answer) {
  const list = (ev.assertions || []).map((a, i) => `${i + 1}. ${a.text}`).join('\n');
  const prompt = `Voici une réponse d'agent :\n"""\n${answer}\n"""\n\nÉvalue chaque assertion (VRAI/FAUX strictement) :\n${list}\n\nRéponds par une ligne JSON : {"results":[true/false,...]}`;
  const out = await callAnthropic(apiKey, model, '', prompt, 400);
  try {
    const m = out.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(m[0]);
    return (parsed.results || []).filter(Boolean).length;
  } catch {
    return 0;
  }
}

// --- entrée ---

const mode = process.argv.includes('--llm') ? 'llm' : 'grounding';
console.log('========================================================================');
console.log(`Paperasse Belgique — évals (mode : ${mode})`);
console.log('========================================================================');
(mode === 'llm' ? runLlm() : runGrounding()).catch((err) => {
  console.error(`Erreur évals : ${err.message}`);
  process.exit(2);
});
