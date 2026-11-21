#!/usr/bin/env node
/**
 * Assembles the website that GitHub Pages publishes (run via `npm run build:site`).
 *
 *   dist/site/
 *   ├── My-Portfolio/        ← the Angular app (from dist/portfolio)
 *   ├── index.html           ← site root: forwards to /My-Portfolio/
 *   ├── 404.html             ← forwards old, mistyped or wrong-case links
 *   └── My-Portfolio-App/    ← the first address: forwards to /My-Portfolio/
 *
 * To change the address, change SITE_PATH here AND "baseHref" in angular.json
 * (production configuration). The build stops if they don't match.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const SITE_PATH = 'My-Portfolio';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const app = join(root, 'dist/portfolio');
const out = join(root, 'dist/site');

const fail = (msg) => {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
};

if (!existsSync(join(app, 'index.html'))) fail('dist/portfolio is missing. Run "ng build" first.');

const baseHref = readFileSync(join(app, 'index.html'), 'utf8').match(/<base href="([^"]*)"/)?.[1];
if (baseHref !== `/${SITE_PATH}/`) {
  fail(`The app was built with base href "${baseHref}" but SITE_PATH is "/${SITE_PATH}/".\n` +
       `  Make "baseHref" in angular.json (production) match SITE_PATH in scripts/build-site.mjs.`);
}

rmSync(out, { recursive: true, force: true });
cpSync(app, join(out, SITE_PATH), { recursive: true });

// Copy site-root/, filling in __SITE_PATH__ in HTML files.
const copyRoot = (from, to) => {
  for (const name of readdirSync(from)) {
    const src = join(from, name);
    const dest = join(to, name);
    if (statSync(src).isDirectory()) {
      mkdirSync(dest, { recursive: true });
      copyRoot(src, dest);
    } else if (name.endsWith('.html')) {
      writeFileSync(dest, readFileSync(src, 'utf8').replaceAll('__SITE_PATH__', SITE_PATH));
    } else {
      cpSync(src, dest);
    }
  }
};
copyRoot(join(root, 'site-root'), out);

console.log(`✔ Site assembled in dist/site — portfolio at /${SITE_PATH}/, forwarding pages at the root.`);
