#!/usr/bin/env node
/**
 * Replace the resume PDF shown on the portfolio.
 *
 *   npm run update-resume -- ~/Downloads/Sanjay-Y-M-Resume.pdf
 *
 * What it does:
 *   1. Checks the file exists and really is a PDF.
 *   2. Copies it to src/assets/resume/<RESUME_FILE> (the name set in profile.ts),
 *      replacing the old one, so the "Download Resume" buttons serve the new file.
 *   3. Sets RESUME_LAST_UPDATED in profile.ts to the current month, so the
 *      "Last updated" note on the site is correct.
 */
import { copyFileSync, existsSync, openSync, readSync, closeSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const profilePath = resolve(root, 'src/app/data/profile.ts');

const fail = (msg) => {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
};

const arg = process.argv[2];
if (!arg) {
  fail('Give the path to your new resume PDF, e.g.\n  npm run update-resume -- ~/Downloads/Sanjay-Y-M-Resume.pdf');
}

const source = resolve(arg.replace(/^~(?=$|\/)/, homedir()));
if (!existsSync(source) || !statSync(source).isFile()) fail(`File not found: ${source}`);
if (extname(source).toLowerCase() !== '.pdf') fail(`Not a .pdf file: ${source}`);

// A real PDF starts with the bytes "%PDF".
const fd = openSync(source, 'r');
const header = Buffer.alloc(4);
readSync(fd, header, 0, 4, 0);
closeSync(fd);
if (header.toString('latin1') !== '%PDF') fail(`This file doesn't look like a valid PDF: ${source}`);

let profile = readFileSync(profilePath, 'utf8');
const nameMatch = profile.match(/export const RESUME_FILE = '([^']+)';/);
if (!nameMatch) fail('Could not find RESUME_FILE in src/app/data/profile.ts');
const fileName = nameMatch[1];

const target = resolve(root, 'src/assets/resume', fileName);
copyFileSync(source, target);

const now = new Date();
const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
profile = profile.replace(
  /export const RESUME_LAST_UPDATED = '[^']*';/,
  `export const RESUME_LAST_UPDATED = '${ym}';`
);
writeFileSync(profilePath, profile);

const kb = (statSync(target).size / 1024).toFixed(0);
console.log(`
✔ Resume updated
    from: ${source}
    to:   src/assets/resume/${fileName} (${kb} KB)
    "Last updated" on the site set to ${ym}

Next:
  • Preview locally:  npm start   →  http://localhost:4200/#Resume
  • Publish:          rebuild and deploy as usual (e.g. npm run build, or ng deploy)
`);
