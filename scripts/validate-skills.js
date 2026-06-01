// validate-skills.js
// -----------------------------------------------------------------------------
// Quality gate for Paperasse Belgique skills.
//
// Checks:
//   - SKILL.md frontmatter follows the supported skill schema.
//   - skill names and descriptions are trigger-friendly.
//   - v2 metadata is present.
//   - agents/openai.yaml exists and exposes a usable UI prompt.
//   - skill source registries remain traceable and status-aligned with the
//     central data/sources.json registry when they share the same id.
//
// Node >= 18, no external dependencies.
// -----------------------------------------------------------------------------

import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ALLOWED_FRONTMATTER_KEYS = new Set([
  'name',
  'description',
  'license',
  'allowed-tools',
  'metadata',
]);
const CONFIRMED_STATUSES = new Set(['confirme', 'confirme_partiel', 'confirme_avec_reserve']);
const VALID_STATUSES = new Set([...CONFIRMED_STATUSES, 'a_verifier']);
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const errors = [];
const warnings = [];

function fail(file, message) {
  errors.push(`${file}: ${message}`);
}

function warn(file, message) {
  warnings.push(`${file}: ${message}`);
}

async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (err) {
    fail(file, `JSON illisible: ${err.message}`);
    return null;
  }
}

function extractFrontmatter(content, file) {
  if (!content.startsWith('---\n')) {
    fail(file, 'frontmatter YAML manquant');
    return null;
  }

  const end = content.indexOf('\n---', 4);
  if (end === -1) {
    fail(file, 'frontmatter YAML non ferme');
    return null;
  }

  return content.slice(4, end);
}

function topLevelKeys(frontmatter) {
  return frontmatter
    .split('\n')
    .map((line) => /^([A-Za-z0-9_-]+):/.exec(line)?.[1])
    .filter(Boolean);
}

function scalarValue(frontmatter, key) {
  const lines = frontmatter.split('\n');
  const start = lines.findIndex((line) => line.startsWith(`${key}:`));
  if (start === -1) return '';

  const first = lines[start].slice(key.length + 1).trim();
  if (first && first !== '>-' && first !== '|' && first !== '|-') {
    return stripQuotes(first);
  }

  const collected = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^[A-Za-z0-9_-]+:/.test(line)) break;
    if (line.trim()) collected.push(line.trim());
  }
  return collected.join(' ').replace(/\s+/g, ' ').trim();
}

function stripQuotes(value) {
  return value.replace(/^['"]|['"]$/g, '').trim();
}

function validateDate(value) {
  if (!DATE_RE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(d.getTime()) &&
    d.toISOString().slice(0, 10) === value
  );
}

async function discoverSkillDirs() {
  const entries = await readdir(ROOT, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => existsSync(join(ROOT, name, 'SKILL.md')))
    .sort();
}

async function validateSkillMd(skillDir) {
  const file = join(ROOT, skillDir, 'SKILL.md');
  const content = await readFile(file, 'utf8');
  const frontmatter = extractFrontmatter(content, `${skillDir}/SKILL.md`);
  if (!frontmatter) return;

  for (const key of topLevelKeys(frontmatter)) {
    if (!ALLOWED_FRONTMATTER_KEYS.has(key)) {
      fail(`${skillDir}/SKILL.md`, `cle frontmatter non supportee: ${key}`);
    }
  }

  const name = scalarValue(frontmatter, 'name');
  const description = scalarValue(frontmatter, 'description');

  if (!name) fail(`${skillDir}/SKILL.md`, 'name manquant');
  if (name && !NAME_RE.test(name)) {
    fail(`${skillDir}/SKILL.md`, `name invalide: ${name}`);
  }
  if (name && name !== skillDir) {
    fail(`${skillDir}/SKILL.md`, `name (${name}) different du dossier (${skillDir})`);
  }

  if (!description) fail(`${skillDir}/SKILL.md`, 'description manquante');
  if (description.length > 1024) {
    fail(`${skillDir}/SKILL.md`, `description trop longue (${description.length}/1024)`);
  }
  if (/[<>]/.test(description)) {
    fail(`${skillDir}/SKILL.md`, 'description ne doit pas contenir < ou >');
  }

  if (!/metadata:\n(?:.|\n)*?version:\s*["']?\d+\.\d+\.\d+["']?/m.test(frontmatter)) {
    fail(`${skillDir}/SKILL.md`, 'metadata.version (semver X.Y.Z) manquante');
  }
  const lastUpdated = /last-updated:\s*["']?(\d{4}-\d{2}-\d{2})["']?/m.exec(frontmatter)?.[1];
  if (!lastUpdated || !validateDate(lastUpdated)) {
    fail(`${skillDir}/SKILL.md`, 'metadata.last-updated doit etre une date valide (AAAA-MM-JJ)');
  }
}

async function validateOpenAiYaml(skillDir) {
  const file = join(ROOT, skillDir, 'agents', 'openai.yaml');
  if (!existsSync(file)) {
    fail(`${skillDir}/agents/openai.yaml`, 'fichier manquant');
    return;
  }

  const content = await readFile(file, 'utf8');
  for (const key of ['interface:', 'display_name:', 'short_description:', 'default_prompt:']) {
    if (!content.includes(key)) {
      fail(`${skillDir}/agents/openai.yaml`, `champ manquant: ${key}`);
    }
  }

  const prompt = /default_prompt:\s*["']([^"']+)["']/.exec(content)?.[1] || '';
  if (!prompt.includes(`$${skillDir}`)) {
    fail(`${skillDir}/agents/openai.yaml`, `default_prompt doit mentionner $${skillDir}`);
  }

  const shortDescription = /short_description:\s*["']([^"']+)["']/.exec(content)?.[1] || '';
  if (shortDescription.length < 25 || shortDescription.length > 64) {
    fail(`${skillDir}/agents/openai.yaml`, `short_description doit faire 25-64 caracteres (${shortDescription.length})`);
  }
}

async function validateSources(skillDir, centralStatusById) {
  const file = join(ROOT, skillDir, 'references', 'sources.json');
  if (!existsSync(file)) {
    warn(`${skillDir}/references/sources.json`, 'registre absent');
    return;
  }

  const data = await readJson(file);
  if (!data) return;

  const sources = Array.isArray(data.sources) ? data.sources : [];
  if (sources.length === 0) {
    fail(`${skillDir}/references/sources.json`, 'aucune source');
  }

  for (const source of sources) {
    const id = source.id || '(sans id)';
    const status = source.statut;
    if (!VALID_STATUSES.has(status)) {
      fail(`${skillDir}/references/sources.json`, `${id}: statut non supporte (${status})`);
    }

    if (CONFIRMED_STATUSES.has(status)) {
      if (!source.url || typeof source.url !== 'string') {
        fail(`${skillDir}/references/sources.json`, `${id}: url manquante pour une source confirmee`);
      }
      if (!validateDate(source.date_consultation)) {
        fail(`${skillDir}/references/sources.json`, `${id}: date_consultation invalide`);
      }
    }

    if (centralStatusById.has(id) && centralStatusById.get(id) !== status) {
      fail(
        `${skillDir}/references/sources.json`,
        `${id}: statut (${status}) different du registre central (${centralStatusById.get(id)})`,
      );
    }
  }
}

async function main() {
  const central = await readJson(join(ROOT, 'data', 'sources.json'));
  const centralStatusById = new Map(
    (central?.sources || []).map((source) => [source.id, source.statut]),
  );

  const skillDirs = await discoverSkillDirs();
  if (skillDirs.length === 0) {
    fail('.', 'aucun dossier de skill trouve');
  }

  for (const skillDir of skillDirs) {
    await validateSkillMd(skillDir);
    await validateOpenAiYaml(skillDir);
    await validateSources(skillDir, centralStatusById);
  }

  if (warnings.length) {
    console.log('AVERTISSEMENTS');
    for (const message of warnings) console.log(`- ${message}`);
    console.log('');
  }

  if (errors.length) {
    console.error('ECHEC VALIDATION SKILLS');
    for (const message of errors) console.error(`- ${message}`);
    process.exit(1);
  }

  console.log(`OK — ${skillDirs.length} skill(s) valides: ${skillDirs.join(', ')}`);
}

main().catch((err) => {
  console.error(`Erreur validation skills: ${err.message}`);
  process.exit(2);
});
