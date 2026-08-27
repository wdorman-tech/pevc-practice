export type MathItem = { q: string; a: number; hint: string }

const ri = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export const MATH_GENS: (() => MathItem)[] = [
  () => {
    const p = pick([5, 10, 15, 20, 25, 40]);
    const n = ri(3, 25) * 20;
    return { q: `What is ${p}% of ${n}?`, a: (n * p) / 100, hint: "" };
  },
  () => {
    const e = ri(4, 40) * 5;
    const m = pick([6, 7, 8, 9, 10, 11, 12, 14]);
    return { q: `EBITDA is $${e}M. Comparable companies trade at ${m}x EV/EBITDA. What is implied enterprise value, in $M?`, a: e * m, hint: "" };
  },
  () => {
    const ni = ri(3, 25) * 10;
    const pe = pick([9, 12, 15, 18, 20, 24]);
    return { q: `Market cap is $${ni * pe}M and net income is $${ni}M. What is the P/E?`, a: pe, hint: "" };
  },
  () => {
    const r = ri(3, 22) * 20;
    const g = pick([5, 10, 15, 20, 25]);
    return { q: `Revenue is $${r}M growing ${g}%. What is next year's revenue, in $M?`, a: (r * (100 + g)) / 100, hint: "" };
  },
  () => {
    const rev = ri(2, 12) * 100;
    const gm = pick([20, 30, 35, 40, 60]);
    const cogs = (rev * (100 - gm)) / 100;
    return { q: `Revenue is $${rev}M and COGS is $${cogs}M. What is the gross margin, in percent?`, a: gm, hint: "Answer as a number, e.g. 35" };
  },
  () => {
    const mc = ri(20, 90) * 10;
    const d = ri(5, 40) * 10;
    const c = ri(2, 20) * 10;
    return { q: `Market cap $${mc}M, debt $${d}M, cash $${c}M. What is enterprise value, in $M?`, a: mc + d - c, hint: "" };
  },
  () => {
    const r = pick([2, 3, 4, 6, 8, 9, 12]);
    return { q: `Growing at ${r}% a year, roughly how many years to double? Use the rule of 72.`, a: 72 / r, hint: "" };
  },
  () => {
    const gm = pick([30, 40, 50, 60]);
    const cut = pick([10, 20]);
    const gpOld = gm;
    const gpNew = gm - cut;
    const need = Math.round((gpOld / gpNew - 1) * 100);
    return {
      q: `Gross margin is ${gm}% and you cut price by ${cut}%. What percent volume increase keeps gross profit flat? Round to the nearest whole number.`,
      a: need,
      hint: "Price 100, cost stays fixed.",
    };
  },
  () => {
    const p = pick([20, 40, 50, 60]);
    const v = p / 2;
    const units = ri(4, 30) * 100;
    const f = (p - v) * units;
    return { q: `Price is $${p}, variable cost is $${v}, fixed costs are $${f}. How many units to break even?`, a: units, hint: "" };
  },
]
