/**
 * Date helpers for the portfolio. Everything is calculated in the visitor's
 * browser at page load, so values such as "years of experience" and
 * "1 yr 7 mos" stay correct without anyone redeploying the site.
 *
 * Dates use the 'YYYY-MM' format, e.g. '2017-09' for September 2017.
 */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parse(ym: string): { year: number; month: number } {
  const [year, month] = ym.split('-').map(Number);
  return { year, month: month - 1 };
}

function nowYm(): { year: number; month: number } {
  const d = new Date();
  return { year: d.getFullYear(), month: d.getMonth() };
}

/** Whole months from start to end (or today), counting both the start and end month. */
export function monthsBetween(start: string, end?: string | null): number {
  const s = parse(start);
  const e = end ? parse(end) : nowYm();
  return Math.max(0, (e.year - s.year) * 12 + (e.month - s.month) + 1);
}

/** Completed years since a 'YYYY-MM' date. '2017-09' → 9 in Nov 2026, 10 from Sep 2027. */
export function yearsSince(start: string): number {
  const s = parse(start);
  const n = nowYm();
  return Math.max(0, Math.floor(((n.year - s.year) * 12 + (n.month - s.month)) / 12));
}

/** '2025-05' → 'May 2025' */
export function formatMonth(ym: string): string {
  const { year, month } = parse(ym);
  return `${MONTHS[month]} ${year}`;
}

/** 19 → '1 yr 7 mos' */
export function formatDuration(totalMonths: number): string {
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  const parts: string[] = [];
  if (y) parts.push(`${y} yr${y > 1 ? 's' : ''}`);
  if (m) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
  return parts.join(' ') || '1 mo';
}

/** ('2025-05', null) → 'May 2025 – Present' */
export function formatPeriod(start: string, end?: string | null): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;
}
