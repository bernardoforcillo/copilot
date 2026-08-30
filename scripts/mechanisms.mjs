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

// Escape probability through two filters that are NOT independent. rho is the correlation
// between their misses: 0 is independence (the textbook case), 1 means the second filter
// misses exactly what the first misses and adds nothing. Real pairs sit in between, and the
// textbook product overstates coverage by however much rho is above zero.
export const escapeCorrelated = (p1, p2, rho = 0) => {
  const q1 = 1 - p1;
  const q2 = 1 - p2;
  return q1 * q2 + rho * Math.sqrt(p1 * q1 * p2 * q2);
};

// Expected defective changes reaching users per period, holding total change volume fixed
// while varying how many releases it is split across. This is the fleet-level question that
// per-release probability does not answer.
export const defectsPerPeriod = (volume, releases, perChangeProbability) =>
  releases * (1 - Math.pow(1 - perChangeProbability, volume / releases));

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

// --- decisions, evidence, capital -----------------------------------------

// Expected-value ranking, in the form the desk states it: what it's worth if it works,
// times the chance it does, over what it costs to find out. Assumes the three are
// independent estimates and that the bet repeats — a single irreversible bet with ruin
// on the table is not priced by its average (see foundations/compounding-and-capital.md).
export const expectedValue = (effectIfItWorks, probability, costToFindOut) =>
  (effectIfItWorks * probability) / costToFindOut;

// Two-sample rule of thumb at 80% power, alpha = 0.05: n per arm to detect a difference
// delta on a measure with standard deviation sigma. Assumes independent observations and
// roughly normal behaviour of the mean.
export const sampleSizePerArm = (sigma, delta) => (16 * sigma * sigma) / (delta * delta);

// The same relation read the other way: the smallest effect a given sample can resolve.
export const detectableDelta = (n, sigma) => Math.sqrt((16 * sigma * sigma) / n);

// Revenue multiplier of a price move that costs some conversion: (1+p)(1-c) - 1.
// Assumes retention is unaffected, which is the assumption that makes aggressive pricing
// look free — see pricing-and-value-capture.md for what that hides.
export const priceMoveRevenueChange = (pricePct, conversionLossPct) =>
  (1 + pricePct) * (1 - conversionLossPct) - 1;

// Reinvested returns compound; consumed returns add. Same rate, different function.
export const compounded = (rate, cycles) => Math.pow(1 + rate, cycles);
export const consumed = (rate, cycles) => 1 + rate * cycles;

// Shared component economics: build once at buildCost, adapt per consumer, versus each
// consumer building locally. Returns the total cost each way for k consumers.
export const sharedVsLocal = (buildCost, perConsumerAdaptation, localCost, k) => ({
  shared: buildCost + k * perConsumerAdaptation,
  local: k * localCost,
});

// Wright's learning curve: unit cost falls by a constant fraction per doubling of
// cumulative volume. rate = 0.85 means each doubling costs 85% of the previous one.
export const learningCurveUnitCost = (firstUnitCost, cumulativeUnits, rate = 0.85) =>
  firstUnitCost * Math.pow(cumulativeUnits, Math.log2(rate));

// --- growth ----------------------------------------------------------------

// Steady state of N(t+1) = N(t) + a + k*N - c*N. Infinite when the loop beats churn.
export const plateau = (acquisitionPerPeriod, churnPerPeriod, loopK = 0) =>
  loopK >= churnPerPeriod ? Infinity : acquisitionPerPeriod / (churnPerPeriod - loopK);

// Lifetime value as the geometric sum: revenue per period over churn per period.
// ASSUMES A CONSTANT HAZARD — the same fraction churns every period forever. Real cohorts
// usually have a declining hazard (the survivors are the committed ones), and this expression
// then understates LTV. Use ltvFromSurvival when you have the curve.
export const ltv = (revenuePerPeriod, churnPerPeriod) => revenuePerPeriod / churnPerPeriod;

// LTV from an actual survival curve: survival[i] is the fraction still active in period i.
// No hazard-shape assumption; it is just the sum of what each period is worth.
export const ltvFromSurvival = (revenuePerPeriod, survival) =>
  revenuePerPeriod * survival.reduce((a, b) => a + b, 0);

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

  // impact-and-prioritization.md — the EV form, and what it ranks
  check('a cheap probe outranks an expensive build at the same effect and odds',
    Number(expectedValue(100, 0.5, 2) > expectedValue(100, 0.5, 30)), 1, 0);
  check('EV of 100 x 0.5 over a 2-day probe', expectedValue(100, 0.5, 2), 25, 0.001);

  // foundations/uncertainty-and-information.md — n = 16 sigma^2 / delta^2
  check('sample per arm, sigma 1, delta 0.2', sampleSizePerArm(1, 0.2), 400, 0.001);
  check('halving the effect quadruples the sample',
    sampleSizePerArm(1, 0.1) / sampleSizePerArm(1, 0.2), 4, 0.001);
  check('what 400 per arm can resolve at sigma 1', detectableDelta(400, 1), 0.2, 0.0001);

  // pricing-and-value-capture.md — +10% price at -5% conversion
  check('10% price rise costing 5% of conversions', priceMoveRevenueChange(0.1, 0.05) * 100, 4.5, 0.01);
  check('10% price rise costing 15% of conversions is a loss',
    Number(priceMoveRevenueChange(0.1, 0.15) < 0), 1, 0);
  // The reported Evernote pair, computed rather than asserted (see provenance.md).
  check('100 -> 249 is a 149% increase', (249 / 100 - 1) * 100, 149, 0.5);

  // foundations/compounding-and-capital.md — the 20% table
  check('reinvested at 20% over 10 cycles', compounded(0.2, 10), 6.19, 0.01);
  check('consumed at 20% over 10 cycles', consumed(0.2, 10), 3, 0.001);
  check('reinvested at 20% over 20 cycles', compounded(0.2, 20), 38.34, 0.05);
  check('consumed at 20% over 20 cycles', consumed(0.2, 20), 5, 0.001);
  check('a platform saving 20% and costing 20% to maintain compounds at zero',
    compounded(0.2 - 0.2, 10), 1, 0.001);

  // platform-and-compounding.md — why the third consumer, not the second
  const two = sharedVsLocal(30, 3, 10, 2);
  const three = sharedVsLocal(30, 3, 10, 3);
  check('at k=2 the shared component costs more than building locally',
    Number(two.shared > two.local), 1, 0);
  check('at k=3 it is still not cheaper on cost alone',
    Number(three.shared > three.local), 1, 0);
  check('at k=6 the shared component wins',
    Number(sharedVsLocal(30, 3, 10, 6).shared < sharedVsLocal(30, 3, 10, 6).local), 1, 0);

  // Wright's learning curve at an 85% rate
  check('85% learning curve: 8th cumulative doubling-unit cost',
    learningCurveUnitCost(100, 8, 0.85), 61.4, 0.5);

  // uncertainty-and-information.md — the conversion-rate figures quoted in the file
  check('1pp lift on a 5% rate', sampleSizePerArm(Math.sqrt(0.05 * 0.95), 0.01), 7600, 1);
  check('relative 10% lift on a 5% rate', sampleSizePerArm(Math.sqrt(0.05 * 0.95), 0.005), 30400, 1);

  // defects-and-detection.md — where correlated filters stop being worth it
  check('two 0.7 filters, independent', escapeCorrelated(0.7, 0.7, 0), 0.09, 0.001);
  check('two 0.7 filters at rho 0.5', escapeCorrelated(0.7, 0.7, 0.5), 0.195, 0.001);
  check('two 0.7 filters at rho 0.8 are worse than one 0.8 filter',
    Number(escapeCorrelated(0.7, 0.7, 0.8) > escapeProbability(0.8)), 1, 0);
  check('break-even correlation is about 0.52', (0.2 - 0.09) / 0.21, 0.524, 0.005);

  // flow-and-queues.md — splitting a fixed volume raises the count of defective releases
  check('100 changes in 1 release', defectsPerPeriod(100, 1, 0.05), 0.99, 0.01);
  check('100 changes in 10 releases', defectsPerPeriod(100, 10, 0.05), 4.01, 0.01);
  check('100 changes in 100 releases approaches volume x p', defectsPerPeriod(100, 100, 0.05), 5, 0.01);
  check('more releases never reduces the count',
    Number(defectsPerPeriod(100, 25, 0.05) > defectsPerPeriod(100, 5, 0.05)), 1, 0);

  // load-and-automation.md — the urgency depends entirely on the growth rate
  check('toil reaches half the week in ~29 months at +30%/6mo', periodsToThreshold(5, 17.5, 0.3) * 6, 28.6, 0.3);
  check('...and in ~11 months at +100%/6mo', periodsToThreshold(5, 17.5, 1) * 6, 10.8, 0.2);

  // loops-and-saturation.md — R/c assumes a constant hazard, and cohorts do not have one
  const geometric = Array.from({ length: 120 }, (_, i) => Math.pow(0.95, i));
  let alive = 1;
  const declining = Array.from({ length: 120 }, (_, i) => {
    const v = alive;
    alive *= 1 - (0.02 + 0.1 * Math.exp(-i / 6));
    return v;
  });
  check('constant hazard: summing the curve matches R/c', ltvFromSurvival(1, geometric), ltv(1, 0.05), 0.1);
  check('declining hazard LTV', ltvFromSurvival(1, declining), 25.46, 0.1);
  check('R/c on first-month churn understates it by ~3x', ltv(1, 0.12), 8.33, 0.01);

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
  visualSearchMs, expectedValue, sampleSizePerArm, detectableDelta, priceMoveRevenueChange,
  compounded, consumed, sharedVsLocal, learningCurveUnitCost, escapeCorrelated, defectsPerPeriod,
  ltvFromSurvival,
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
  } else if (cmd === 'sweep') {
    // sweep <fn> <argIndex> <from> <to> <steps> <args...> — where does the conclusion flip?
    const [fn, idxRaw, fromRaw, toRaw, stepsRaw, ...rest] = args;
    const [idx, from, to, steps] = [idxRaw, fromRaw, toRaw, stepsRaw].map(Number);
    if (!api[fn] || Number.isNaN(idx)) {
      console.error('usage: sweep <fn> <argIndex> <from> <to> <steps> <args...>');
      process.exit(1);
    }
    const base = rest.map(Number);
    for (let i = 0; i <= steps; i += 1) {
      const v = from + ((to - from) * i) / steps;
      const argv = [...base];
      argv.splice(idx, 0, v);
      const out = api[fn](...argv);
      console.log(`${round(v, 4)}\t${typeof out === 'number' ? round(out, 6) : JSON.stringify(out)}`);
    }
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
