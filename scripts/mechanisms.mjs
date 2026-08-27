#!/usr/bin/env node
// The arithmetic the foundations tier argues from, as runnable functions.
//
// Why this file exists: every mechanism in skills/operating-model/references/foundations/
// makes a quantitative claim, and a quantitative claim written only in prose cannot be
// checked, cannot be re-run against your own numbers, and drifts silently the moment an
// example is edited. Here each one is a function, and `--test` pins the figures used in
// the worked examples so editing one without editing the other fails loudly.
//
// No dependencies. Usage:
//   node scripts/mechanisms.mjs --test
//   node scripts/mechanisms.mjs list
//   node scripts/mechanisms.mjs serialAvailability 0.9999 0.999 0.9995 0.999
//   node scripts/mechanisms.mjs plateau 100 0.05
//
// Every function states its assumptions in a comment. When an assumption doesn't hold in
// your context, the number it returns is not wrong — it is about a different system, which
// is the failure mode `foundations/how-to-argue.md` calls over-transfer.

const MINUTES_PER_MONTH = 30 * 24 * 60; // the 30-day window SLOs are usually stated over
const WEEKS_PER_MONTH = 4.345;

// --- reliability -----------------------------------------------------------

// Serial composition: all parts must work. Assumes independent failures; correlated
// failure (shared deploy, shared region) makes the true number worse, never better.
export const serialAvailability = (...parts) => parts.flat().reduce((a, b) => a * b, 1);

// Minutes of permitted failure in a window, given an availability figure.
export const downtimeMinutes = (availability, days = 30) => (1 - availability) * days * 24 * 60;

// The error budget is the gap between the target and 1, expressed in minutes.
export const errorBudgetMinutes = (target, days = 30) => downtimeMinutes(target, days);

// k redundant copies, of which a fraction `correlated` of failures hit all of them at once
// (the same bad deploy, the same config, the same dependency). With correlated = 0 this is
// the textbook 1 - (1-a)^k; with correlated = 1 redundancy buys exactly nothing.
export const redundantAvailability = (a, k, correlated = 0) => {
  const u = 1 - a;
  return 1 - (correlated * u + (1 - correlated) * Math.pow(u, k));
};

// Burn rate: how many times faster than the budget allows the current error rate is.
// 1 exactly exhausts the budget over the window.
export const burnRate = (errorRate, target) => errorRate / (1 - target);

// Expected loss from failures, as the three terms that multiply.
export const expectedLoss = (frequencyPerMonth, exposureFraction, durationMinutes) =>
  frequencyPerMonth * exposureFraction * durationMinutes;

// --- flow and queues -------------------------------------------------------

export const littlesLaw = (wip, throughputPerWeek) => wip / throughputPerWeek; // weeks in system
export const queueMultiplier = (rho) => 1 / (1 - rho); // M/M/1 time-in-system, relative to service time

// Probability a release of n independent changes contains at least one defect.
export const batchDefectProbability = (n, perChangeProbability) =>
  1 - Math.pow(1 - perChangeProbability, n);

// --- defects and detection -------------------------------------------------

// Escape probability through a series of filters. Assumes independence: two filters whose
// holes line up (a human checking what the linter checks) do not compose like this.
export const escapeProbability = (...detectionProbabilities) =>
  detectionProbabilities.flat().reduce((esc, p) => esc * (1 - p), 1);

// --- operational load ------------------------------------------------------

// Periods until operational load reaches a threshold, given per-period growth.
// load * (1+g)^t = threshold  ->  t = ln(threshold/load) / ln(1+g)
export const periodsToThreshold = (load, threshold, growthPerPeriod) =>
  Math.log(threshold / load) / Math.log(1 + growthPerPeriod);

// Weeks until an automation pays for itself. Assumes the saving is steady and the
// automation itself needs maintaining — the term people leave out.
export const automationPaybackWeeks = (buildHours, maintHoursPerMonth, savedHoursPerWeek) => {
  const netWeekly = savedHoursPerWeek - maintHoursPerMonth / WEEKS_PER_MONTH;
  return netWeekly <= 0 ? Infinity : buildHours / netWeekly;
};

// Amdahl's bound: with an irreducibly manual fraction s, total load can fall at most 1/s.
export const amdahlMaxReduction = (manualFraction) => 1 / manualFraction;

// --- growth ----------------------------------------------------------------

// Steady state of N(t+1) = N(t) + a + k*N - c*N. Infinite when the loop beats churn.
export const plateau = (acquisitionPerPeriod, churnPerPeriod, loopK = 0) =>
  loopK >= churnPerPeriod ? Infinity : acquisitionPerPeriod / (churnPerPeriod - loopK);

// Lifetime value as the geometric sum: revenue per period over churn per period.
export const ltv = (revenuePerPeriod, churnPerPeriod) => revenuePerPeriod / churnPerPeriod;

// --- perceptual and motor limits -------------------------------------------

// Fitts: movement time rises with the log of distance over target width.
export const fittsMs = (distance, width, a = 50, b = 150) =>
  a + b * Math.log2((2 * distance) / width);

// Hick–Hyman: choice time rises with the log of the number of undifferentiated options.
// Note what this does NOT say: splitting a set into two stages pays the intercept `a` twice,
// so two-stage choice is slower on Hick's terms alone. See visualSearchMs for the mechanism
// that actually makes grouping win.
export const hickMs = (n, a = 200, b = 150) => a + b * Math.log2(n + 1);

// Visual search for an item whose location you don't know is roughly linear in the number
// of items scanned (serial self-terminating search). This is the term grouping attacks:
// it cuts the scanned set, which the logarithm of Hick's law cannot do.
export const visualSearchMs = (n, msPerItem = 40) => n * msPerItem;

// --- self-test -------------------------------------------------------------
// Each assertion pins a figure that appears in a reference or worked example. If you change
// the prose, this fails; if you change the model, the prose has to move with it.

const round = (x, dp = 4) => Number(x.toFixed(dp));
const checks = [];
const check = (label, actual, expected, tolerance = 0.5) => {
  const ok =
    expected === Infinity ? actual === Infinity : Math.abs(actual - expected) <= tolerance;
  checks.push({ label, actual, expected, ok });
};

export const selfTest = () => {
  checks.length = 0;

  // reliability-and-redundancy.md — the serial table
  check('3 components at 99.9% -> availability', serialAvailability(0.999, 0.999, 0.999) * 100, 99.7, 0.01);
  check('3 components at 99.9% -> minutes/month', downtimeMinutes(serialAvailability(0.999, 0.999, 0.999)), 129.6, 1);
  check('6 components at 99.9% -> minutes/month', downtimeMinutes(serialAvailability(...Array(6).fill(0.999))), 259, 1);
  check('10 components at 99.9% -> availability', serialAvailability(...Array(10).fill(0.999)) * 100, 99.0, 0.01);
  check('10 components at 99.9% -> minutes/month', downtimeMinutes(serialAvailability(...Array(10).fill(0.999))), 430, 2);
  check('99.9% budget in minutes', errorBudgetMinutes(0.999), 43.2, 0.1);
  check('99.99% budget in minutes', errorBudgetMinutes(0.9999), 4.32, 0.05);
  check('two independent 99% copies', redundantAvailability(0.99, 2) * 100, 99.99, 0.001);
  check('three independent 99% copies', redundantAvailability(0.99, 3) * 100, 99.9999, 0.0001);
  check('redundancy with 5/6 correlated failures barely moves', redundantAvailability(0.99, 2, 5 / 6) * 100, 99.165, 0.001);
  check('fully correlated failures make redundancy worthless', redundantAvailability(0.99, 5, 1) * 100, 99.0, 0.001);

  // worked-examples.md #5 — the checkout chain
  const chain = serialAvailability(0.9999, 0.999, 0.9995, 0.999);
  check('checkout chain availability', chain * 100, 99.74, 0.01);
  check('checkout chain minutes/month', downtimeMinutes(chain), 112, 1);
  check('99.5% target budget in minutes', errorBudgetMinutes(0.995), 216, 0.5);
  check('gap between 99.5% and 99.9% in minutes', errorBudgetMinutes(0.995) - errorBudgetMinutes(0.999), 172.8, 0.5);

  // worked-examples.md #6 — the measured week of toil
  check('toil payback in weeks', automationPaybackWeeks(10, 0.5, 2.583), 4.05, 0.1);
  check('months until toil hits half of a 35h week', periodsToThreshold(5, 17.5, 1) * 6, 10.8, 0.2);
  check('Amdahl: 40% irreducible caps reduction at 2.5x', amdahlMaxReduction(0.4), 2.5, 0.001);

  // flow-and-queues.md — the utilization table
  check('rho = 0.80 multiplier', queueMultiplier(0.8), 5, 0.001);
  check('rho = 0.90 multiplier', queueMultiplier(0.9), 10, 0.001);
  check('rho = 0.95 multiplier', queueMultiplier(0.95), 20, 0.001);
  check('14 changes at 5% each -> P(bad release)', batchDefectProbability(14, 0.05), 0.512, 0.005);
  check('1 change at 5% -> P(bad release)', batchDefectProbability(1, 0.05), 0.05, 0.001);

  // defects-and-detection.md — two mediocre filters beat one good one
  check('two filters at p=0.7 -> escape', escapeProbability(0.7, 0.7), 0.09, 0.001);
  check('one filter at p=0.8 -> escape', escapeProbability(0.8), 0.2, 0.001);

  // loops-and-saturation.md — the plateau table
  check('a=100, c=10% -> plateau', plateau(100, 0.1), 1000, 0.001);
  check('a=100, c=5% -> plateau', plateau(100, 0.05), 2000, 0.001);
  check('a=100, c=2% -> plateau', plateau(100, 0.02), 5000, 0.001);
  check('a=200, c=5% -> plateau', plateau(200, 0.05), 4000, 0.001);
  check('k at half of churn doubles the plateau', plateau(100, 0.05, 0.025), 2 * plateau(100, 0.05), 0.001);
  check('k above churn -> no plateau', plateau(100, 0.05, 0.06), Infinity, 0);
  check('LTV = revenue / churn', ltv(10, 0.05), 200, 0.001);
  check('halving churn doubles LTV', ltv(10, 0.025), 2 * ltv(10, 0.05), 0.001);

  // perceptual-limits.md — the shape, not the constants
  check('doubling distance adds one bit of Fitts time', fittsMs(200, 40) - fittsMs(100, 40), 150, 0.001);
  check('halving target width adds one bit', fittsMs(100, 20) - fittsMs(100, 40), 150, 0.001);
  // The trap, asserted rather than assumed: two-stage choice pays the intercept twice, so on
  // Hick's terms alone grouping LOSES. What grouping actually attacks is the linear search term.
  check('two-stage choice is slower on Hick terms alone', Number(hickMs(5) + hickMs(6) > hickMs(30)), 1, 0);
  check('grouping wins on search: 30 flat', visualSearchMs(30), 1200, 0.001);
  check('grouping wins on search: 5 groups then 6 items', visualSearchMs(5) + visualSearchMs(6), 440, 0.001);

  const failed = checks.filter((c) => !c.ok);
  return { checks: checks.map((c) => ({ ...c, actual: round(c.actual) })), failed };
};

// --- CLI -------------------------------------------------------------------

const api = {
  serialAvailability, downtimeMinutes, errorBudgetMinutes, redundantAvailability, burnRate,
  expectedLoss, littlesLaw, queueMultiplier, batchDefectProbability, escapeProbability,
  periodsToThreshold, automationPaybackWeeks, amdahlMaxReduction, plateau, ltv, fittsMs, hickMs,
  visualSearchMs,
};

const isMain = process.argv[1] && process.argv[1].endsWith('mechanisms.mjs');
if (isMain) {
  const [cmd, ...args] = process.argv.slice(2);
  if (!cmd || cmd === '--test') {
    const { checks: all, failed } = selfTest();
    for (const c of failed) console.error(`  FAIL ${c.label}: got ${round(c.actual)}, expected ${c.expected}`);
    if (failed.length) {
      console.error(`mechanisms: ${failed.length} of ${all.length} checks failed`);
      process.exit(1);
    }
    console.log(`mechanisms OK: ${all.length} checks — the figures in the references still follow from the models`);
  } else if (cmd === 'list') {
    for (const name of Object.keys(api)) console.log(name);
  } else if (api[cmd]) {
    const out = api[cmd](...args.map(Number));
    console.log(typeof out === 'number' ? round(out, 6) : out);
  } else {
    console.error(`unknown mechanism '${cmd}'. Try: node scripts/mechanisms.mjs list`);
    process.exit(1);
  }
}
