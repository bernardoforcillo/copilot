#!/usr/bin/env node
// Structural checker for this plugin. Exit 0 = consistent; exit 1 = problems (printed).
//
// It checks the invariants that silently drift as the plugin grows: broken file
// references, orphaned reference files, and the two places in docs/architecture.md
// that claim to describe the whole plugin (the dispatch graph and the
// loop-until-converged adopters table) but are maintained by hand.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const problems = [];
const p = (msg) => problems.push(msg);

const walk = (dir, out = []) => {
  for (const entry of readdirSync(join(root, dir))) {
    const rel = join(dir, entry);
    if (statSync(join(root, rel)).isDirectory()) walk(rel, out);
    else if (entry.endsWith('.md')) out.push(rel);
  }
  return out;
};

const skills = readdirSync(join(root, 'skills')).filter((d) =>
  statSync(join(root, 'skills', d)).isDirectory()
);
const agents = readdirSync(join(root, 'agents'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''));

// --- (1) frontmatter -------------------------------------------------------
for (const skill of skills) {
  const file = join('skills', skill, 'SKILL.md');
  if (!existsSync(join(root, file))) {
    p(`${file}: missing (every skill directory needs a SKILL.md)`);
    continue;
  }
  const fm = readFileSync(join(root, file), 'utf8').match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) {
    p(`${file}: missing frontmatter block`);
    continue;
  }
  if (!/^description:\s*\S/m.test(fm[1])) p(`${file}: missing 'description'`);
  const skillName = fm[1].match(/^name:\s*(\S+)\s*$/m);
  // Claude Code infers the name from the directory, but tooling that reads the
  // frontmatter directly (the eval harness, for one) gets an empty name without it.
  if (!skillName) p(`${file}: missing 'name'`);
  else if (skillName[1] !== skill) p(`${file}: name '${skillName[1]}' != directory '${skill}'`);
}
for (const agent of agents) {
  const file = join('agents', `${agent}.md`);
  const fm = readFileSync(join(root, file), 'utf8').match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) {
    p(`${file}: missing frontmatter block`);
    continue;
  }
  const name = fm[1].match(/^name:\s*(\S+)\s*$/m);
  if (!name) p(`${file}: missing 'name'`);
  else if (name[1] !== agent) p(`${file}: name '${name[1]}' != filename '${agent}'`);
  if (!/^description:\s*\S/m.test(fm[1])) p(`${file}: missing 'description'`);
  if (!/^tools:\s*\S/m.test(fm[1])) p(`${file}: missing 'tools'`);
}

// --- (2) every referenced file exists --------------------------------------
// Only paths that point inside this plugin are checked. A reference to a target
// project's own files (CLAUDE.md, tsconfig.json, .claude/memory/...) is not ours,
// and is told apart from a broken internal path by whether a file of that name
// exists anywhere in the plugin at all.
const INTERNAL = /^(\$\{CLAUDE_PLUGIN_ROOT\}\/|\.\.\/|references\/|foundations\/|templates\/|skills\/|agents\/|docs\/|hooks\/|scripts\/)/;
const docFiles = [...walk('skills'), ...walk('agents'), ...walk('docs')];
const IGNORED_ROOTS = readFileSync(join(root, '.gitignore'), 'utf8')
  .split('\n')
  .map((l) => l.trim().replace(/\/$/, ''))
  .filter((l) => l && !l.startsWith('#'));

const pluginFiles = new Map(); // basename -> [repo-relative paths]
for (const f of [...docFiles, ...walk('hooks').concat(existsSync(join(root, 'scripts')) ? walk('scripts') : [])]) {
  const base = f.split('/').pop();
  pluginFiles.set(base, [...(pluginFiles.get(base) || []), f]);
}
for (const skill of skills) {
  const t = join('skills', skill, 'templates');
  if (!existsSync(join(root, t))) continue;
  for (const entry of readdirSync(join(root, t))) {
    pluginFiles.set(entry, [...(pluginFiles.get(entry) || []), join(t, entry)]);
  }
}

const candidates = (fromFile, ref) => {
  const fromDir = dirname(fromFile);
  if (ref.startsWith('${CLAUDE_PLUGIN_ROOT}/')) return [ref.replace('${CLAUDE_PLUGIN_ROOT}/', '')];
  const out = [relative(root, resolve(root, fromDir, ref)), ref];
  // A skill-relative path (references/x.md) may be written from a file deeper in
  // the skill, so also try it against the skill root.
  const parts = fromDir.split('/');
  if (parts[0] === 'skills') out.push(join('skills', parts[1], ref));
  return out;
};

for (const file of docFiles) {
  const text = readFileSync(join(root, file), 'utf8');
  for (const m of text.matchAll(/`([^`\s]+\.(?:md|mjs|sh|json))`/g)) {
    const ref = m[1];
    // A bare filename is the repo's shorthand for "that reference file", resolved
    // by context; only things written as paths are checked as paths.
    if (!ref.includes('/')) continue;
    if (/[<>*]/.test(ref)) continue; // a path template, not a file
    if (ref.startsWith('.claude/')) continue; // a target project's own wiki
    if (IGNORED_ROOTS.some((ig) => ref.startsWith(ig))) continue;
    if (candidates(file, ref).some((t) => existsSync(join(root, t)))) continue;
    const base = ref.split('/').pop();
    const elsewhere = [...new Set(pluginFiles.get(base) || [])];
    if (elsewhere.length) {
      p(`${file}: path \`${ref}\` does not resolve — the file is at ${elsewhere.join(', ')}`);
    } else if (INTERNAL.test(ref)) {
      // Shaped like one of ours, so a typo here is a broken link rather than a
      // reference to some target project's file.
      p(`${file}: path \`${ref}\` does not resolve and no such file exists in this plugin`);
    }
  }
}

// --- (3) no orphaned reference files ---------------------------------------
const allText = docFiles.map((f) => readFileSync(join(root, f), 'utf8')).join('\n');
for (const skill of skills) {
  const refDir = join('skills', skill, 'references');
  if (!existsSync(join(root, refDir))) continue;
  for (const ref of walk(refDir)) {
    const name = ref.split('/').pop();
    if (!allText.includes(name)) p(`${ref}: orphan — no skill or agent mentions it`);
  }
}

// --- (4) dispatch graph in docs/architecture.md matches what exists ---------
const arch = readFileSync(join(root, 'docs/architecture.md'), 'utf8');
const graph = arch.match(/```mermaid\n([\s\S]*?)```/);
if (!graph) p('docs/architecture.md: no mermaid dispatch graph found');
else {
  const body = graph[1];
  const declared = new Set(
    [...body.matchAll(/^\s{4}([a-z][a-z0-9-]*)\s*$/gm)].map((m) => m[1])
  );
  for (const skill of skills) {
    if (!declared.has(skill)) p(`docs/architecture.md: dispatch graph is missing skill '${skill}'`);
  }
  for (const agent of agents) {
    if (!declared.has(agent)) p(`docs/architecture.md: dispatch graph is missing agent '${agent}'`);
  }
  for (const node of declared) {
    if (!skills.includes(node) && !agents.includes(node))
      p(`docs/architecture.md: dispatch graph declares '${node}', which is neither a skill nor an agent`);
  }
}

// --- (5) loop adopters table matches who actually loops ---------------------
const adopterRows = [...arch.matchAll(/^\|\s*`([a-z][a-z0-9-]*)`\s*(?:skill|agent)[^|]*\|/gm)].map(
  (m) => m[1]
);
const adopters = new Set(adopterRows);
for (const file of docFiles) {
  if (file.startsWith('docs/')) continue;
  const text = readFileSync(join(root, file), 'utf8');
  if (!/loop-until-converged/.test(text)) continue;
  const owner = file.startsWith('agents/')
    ? file.split('/')[1].replace(/\.md$/, '')
    : file.split('/')[1];
  if (!adopters.has(owner))
    p(`docs/architecture.md: '${owner}' adopts the loop-until-converged pattern but has no adopters-table row`);
}
for (const adopter of adopters) {
  if (!skills.includes(adopter) && !agents.includes(adopter))
    p(`docs/architecture.md: adopters table lists '${adopter}', which is neither a skill nor an agent`);
}

// --- (6) mermaid blocks are closed and declare a known diagram type ---------
// Not a parser — that needs a browser DOM and a dependency. This catches the two
// ways a diagram actually breaks in a text file: an unclosed fence, and a first
// line that isn't a diagram declaration.
const MERMAID_TYPES = [
  'graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram-v2', 'stateDiagram',
  'erDiagram', 'journey', 'gantt', 'pie', 'quadrantChart', 'requirementDiagram', 'gitGraph',
  'mindmap', 'timeline', 'sankey-beta', 'xychart-beta', 'block-beta', 'packet-beta', 'kanban',
  'architecture-beta', 'zenuml', 'C4Context', 'C4Container', 'C4Component', 'C4Dynamic',
  'C4Deployment',
];
for (const file of docFiles) {
  const lines = readFileSync(join(root, file), 'utf8').split('\n');
  let open = null;
  for (const [i, line] of lines.entries()) {
    if (open === null && line.trim() === '```mermaid') {
      open = i + 1;
      const first = lines.slice(i + 1).find((l) => l.trim() && !l.trim().startsWith('%%'));
      if (!first || !MERMAID_TYPES.some((t) => first.trim().startsWith(t)))
        p(`${file}:${i + 1}: mermaid block does not start with a known diagram type`);
    } else if (open !== null && line.trim() === '```') {
      open = null;
    }
  }
  if (open !== null) p(`${file}:${open}: unclosed mermaid block`);
}

// --- (7) eval sets point at skills that exist ------------------------------
// Eval files name a skill in their filename (and, for task evals, in a field).
// A renamed skill silently orphans its evals otherwise.
if (existsSync(join(root, 'evals'))) {
  for (const file of readdirSync(join(root, 'evals')).filter((f) => f.endsWith('.json'))) {
    let parsed;
    try {
      parsed = JSON.parse(readFileSync(join(root, 'evals', file), 'utf8'));
    } catch (err) {
      p(`evals/${file}: not valid JSON (${err.message})`);
      continue;
    }
    const named = file.replace(/-(trigger|tasks)\.json$/, '');
    if (!skills.includes(named)) p(`evals/${file}: names skill '${named}', which does not exist`);
    if (!Array.isArray(parsed) && parsed.skill_name && !skills.includes(parsed.skill_name))
      p(`evals/${file}: skill_name '${parsed.skill_name}' does not exist`);
    if (Array.isArray(parsed)) {
      const bad = parsed.filter((q) => typeof q.query !== 'string' || typeof q.should_trigger !== 'boolean');
      if (bad.length) p(`evals/${file}: ${bad.length} entr(ies) missing a string query or boolean should_trigger`);
    } else {
      for (const e of parsed.evals || []) {
        if (!e.prompt) p(`evals/${file}: eval ${e.id ?? '?'} has no prompt`);
        if (!(e.assertions || []).length) p(`evals/${file}: eval ${e.id ?? '?'} has no assertions`);
      }
    }
  }
}

// --- (8) counts stated in prose match what's on disk -----------------------
// Written numbers drift silently: a file gets added and the sentence that counts
// them keeps its old word. Every number checked here is one that has actually gone
// stale in this repo, which is what earns the check.
const WORDS = {
  zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
  nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15,
  sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20,
  'twenty-one': 21, 'twenty-two': 22, 'twenty-three': 23, 'twenty-four': 24, 'twenty-five': 25,
};
const asNumber = (token) => {
  const t = token.toLowerCase();
  if (/^\d+$/.test(t)) return Number(t);
  return Object.prototype.hasOwnProperty.call(WORDS, t) ? WORDS[t] : null;
};
const countMd = (dir, recursive = false) => {
  if (!existsSync(join(root, dir))) return 0;
  return readdirSync(join(root, dir)).reduce((n, entry) => {
    const rel = join(dir, entry);
    if (statSync(join(root, rel)).isDirectory()) return n + (recursive ? countMd(rel, true) : 0);
    return n + (entry.endsWith('.md') ? 1 : 0);
  }, 0);
};
const claim = (file, label, stated, actual) => {
  const n = asNumber(stated);
  if (n === null) return; // not a number word we know — leave it alone
  if (n !== actual) p(`${file}: says ${stated} ${label}, but ${actual} exist on disk`);
};

for (const skill of skills) {
  const file = join('skills', skill, 'SKILL.md');
  if (!existsSync(join(root, file))) continue;
  const text = readFileSync(join(root, file), 'utf8');
  const heading = text.match(/^##\s+The\s+([A-Za-z-]+|\d+)\s+references\s*$/m);
  if (heading) claim(file, 'reference files', heading[1], countMd(join('skills', skill, 'references')));
  for (const m of text.matchAll(/([A-Za-z-]+|\d+)\s+files under `references\/foundations\/`/g)) {
    claim(file, 'foundations files', m[1], countMd(join('skills', skill, 'references', 'foundations')));
  }
  for (const m of text.matchAll(/and\s+([a-z-]+|\d+)\s+foundations\s+\(/g)) {
    claim(file, 'foundations files', m[1], countMd(join('skills', skill, 'references', 'foundations')));
  }
}

const adopterClaim = arch.match(/^([A-Za-z-]+|\d+)\s+skills\/agents in this plugin do review/m);
if (adopterClaim)
  claim('docs/architecture.md', 'loop adopters', adopterClaim[1], new Set(adopterRows).size);

for (const file of docFiles) {
  const text = readFileSync(join(root, file), 'utf8');
  const worked = text.match(/^([A-Za-z-]+|\d+)\s+end-to-end applications/m);
  if (worked)
    claim(file, 'worked examples', worked[1], [...text.matchAll(/^##\s+\d+\.\s/gm)].length);
}

// --- (9) the foundations tier keeps its own contract -----------------------
// A file in this tier claims to derive a rule from a mechanism. That claim has a shape:
// what it generates, the mechanism itself, and the condition under which the mechanism is
// absent — the last one being the part that makes the rest usable in a context nobody
// wrote it for. A file missing it is an assertion wearing a derivation's title.
for (const skill of skills) {
  const dir = join('skills', skill, 'references', 'foundations');
  if (!existsSync(join(root, dir))) continue;
  for (const entry of readdirSync(join(root, dir)).filter((f) => f.endsWith('.md'))) {
    const file = join(dir, entry);
    const text = readFileSync(join(root, file), 'utf8');
    if (!/^# Foundation: /m.test(text)) p(`${file}: does not open with '# Foundation: <topic>'`);
    if (!/\*\*The principles? it generates:\*\*/.test(text))
      p(`${file}: no '**The principle(s) it generates:**' line — a foundation has to say which rule it is under`);
    if (!/\*\*The mechanism:\*\*/.test(text))
      p(`${file}: no '**The mechanism:**' line`);
    if (!/^##\s+When th(is|ese)\b.*absent/m.test(text))
      p(`${file}: no '## When this mechanism is absent' section — a rule with no voiding condition is taken on authority`);
    // The operating-model tier is indexed by that skill's derivation table; a foundation it
    // doesn't reach is unreachable from the desk it belongs to, whatever else mentions it.
    if (skill === 'operating-model') {
      const skillText = readFileSync(join(root, 'skills', skill, 'SKILL.md'), 'utf8');
      if (!skillText.includes(entry))
        p(`${file}: not referenced from skills/${skill}/SKILL.md (the derivation table is the tier's index)`);
    }
  }
}

// --- (10) the argument chain is connected ---------------------------------
// A reader reaches a reference file directly — that is what progressive disclosure means —
// so a rule whose mechanism is only named in SKILL.md's derivation table is, from where they
// are standing, taken on authority. Where a skill has a foundations tier, every top-level
// reference file has to name at least one file in it. Indexes are exempt: they point at
// everything by construction and derive nothing.
const CHAIN_EXEMPT = new Set(['provenance.md', 'bibliography.md']);
for (const skill of skills) {
  const refDir = join('skills', skill, 'references');
  const foundDir = join(refDir, 'foundations');
  if (!existsSync(join(root, foundDir))) continue;
  for (const entry of readdirSync(join(root, refDir))) {
    if (!entry.endsWith('.md') || CHAIN_EXEMPT.has(entry)) continue;
    const file = join(refDir, entry);
    const text = readFileSync(join(root, file), 'utf8');
    if (!/foundations\/[a-z0-9-]+\.md/.test(text))
      p(`${file}: names no file in foundations/ — the rule it states is reachable only as an assertion`);
  }
}

// --- (11) the arithmetic in the references still follows from the models ----
// The figures quoted in the foundations and the worked examples are computed, not asserted.
// mechanisms.mjs holds the models and pins those figures; if either side moves alone, this fails.
try {
  const mech = await import('./mechanisms.mjs');
  const { checks: mechChecks, failed } = mech.selfTest();
  for (const c of failed) p(`scripts/mechanisms.mjs: ${c.label} — got ${c.actual}, expected ${c.expected}`);
  if (!mechChecks.length) p('scripts/mechanisms.mjs: self-test ran no checks');
} catch (err) {
  p(`scripts/mechanisms.mjs: self-test could not run (${err.message})`);
}

// --- (12) plugin.json and marketplace.json stay in sync --------------------
const plugin = JSON.parse(readFileSync(join(root, '.claude-plugin/plugin.json'), 'utf8'));
const market = JSON.parse(readFileSync(join(root, '.claude-plugin/marketplace.json'), 'utf8'));
const entry = (market.plugins || []).find((x) => x.name === plugin.name);
if (!entry) p(`marketplace.json: no entry for plugin '${plugin.name}'`);
else if (entry.description !== plugin.description)
  p('marketplace.json: description out of sync with plugin.json');

if (problems.length) {
  console.error(`plugin: ${problems.length} problem(s):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}
console.log(
  `plugin OK: ${skills.length} skills, ${agents.length} agents, graph + adopters + references consistent`
);
