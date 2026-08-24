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
  if (!fm) p(`${file}: missing frontmatter block`);
  else if (!/^description:\s*\S/m.test(fm[1])) p(`${file}: missing 'description'`);
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

// --- (7) plugin.json and marketplace.json stay in sync ---------------------
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
