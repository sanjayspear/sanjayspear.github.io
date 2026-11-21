# Sanjay Y M — Portfolio

Personal portfolio website for **Sanjay Y M, Senior QA Automation Engineer**.
It's a single scrolling page built with **Angular 16**, Bootstrap 4 and PrimeNG.

**Sections:** Home · About · Experience · Projects · Skills · Education · Resume · Contact

---

## Contents

1. [Quick start](#1-quick-start)
2. [Where everything lives](#2-where-everything-lives)
3. [What updates itself](#3-what-updates-itself)
4. [Updating your resume PDF](#4-updating-your-resume-pdf)
5. [Updating content (jobs, projects, skills, contact)](#5-updating-content)
6. [Build and deploy](#6-build-and-deploy)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Quick start

**Needs:** [Node.js](https://nodejs.org) (LTS recommended) and VS Code.

```bash
# open the project in VS Code
code ~/Documents/My-Porfolio-App

# in the VS Code terminal (Ctrl + `):
npm install --legacy-peer-deps   # first time only
npm start                        # → open http://localhost:4200
```

The page reloads by itself whenever you save a file. Press `Ctrl + C` in the terminal to stop it.

> **Why `--legacy-peer-deps`?** Some libraries in this project ask for newer Angular versions
> than it uses. This flag tells npm to install anyway. It works fine.

---

## 2. Where everything lives

```
My-Porfolio-App/
├── src/
│   ├── app/
│   │   ├── data/
│   │   │   ├── profile.ts        ← ★ ALL YOUR CONTENT — edit this file
│   │   │   └── date-utils.ts     ← year/duration calculations (no need to touch)
│   │   ├── home/                 ← hero section + Playwright code snippet
│   │   ├── about/                ← bio, stat cards, "What I bring" cards
│   │   ├── experience/           ← job timeline
│   │   ├── projects/             ← project cards
│   │   ├── skills/               ← skill groups
│   │   ├── education/            ← degree + languages
│   │   ├── resume/               ← download button
│   │   ├── contact/              ← email / phone / location cards
│   │   ├── header/ · footer/     ← top menu and footer
│   ├── assets/
│   │   ├── resume/Sanjay-Y-M-Resume.pdf   ← the PDF visitors download
│   │   ├── Images/ · vedio/                ← images and the education video
│   ├── index.html                ← browser tab title and default description
│   └── styles.scss               ← shared colours, cards, buttons
├── scripts/update-resume.mjs     ← powers `npm run update-resume`
└── package.json
```

**You'll almost always only edit `src/app/data/profile.ts`.**
In VS Code press `Cmd + P`, type `profile.ts` and press Enter.

The top of that file has a **QUICK UPDATE** block:

```ts
export const CAREER_START_DATE = '2017-09';   // years of experience are counted from this
export const RESUME_FILE = 'Sanjay-Y-M-Resume.pdf';
export const RESUME_LAST_UPDATED = '2026-11'; // set automatically by update-resume
const CI_CD_PLATFORMS = ['Jenkins', 'Azure DevOps', 'Harness'];
```

---

## 3. What updates itself

These are calculated in the visitor's browser each time the page loads, so they stay
correct **without editing or redeploying anything**:

| On the site | Calculated from | Example |
|---|---|---|
| Years of experience (About text, stat card, Experience subtitle, code snippet, search/share description) | `CAREER_START_DATE` | `9+` today → `10+` from **1 Sep 2027** → `11+` from Sep 2028 … |
| Each job's duration | the job's `start` / `end` | Capgemini: "1 yr 7 mos", which keeps growing |
| "Present" on the current job | `end: null` | `May 2025 – Present` |
| Projects stat (`6+`) and Domains stat (`4`) | the `projects` list | add a project → the stat goes up |
| CI/CD Platforms stat (`3`) | `CI_CD_PLATFORMS` | |
| Footer copyright year | today's date | © 2026 → © 2027 |

---

## 4. Updating your resume PDF

### Recommended: one command

1. Export your new resume as a **PDF** (for example to `~/Downloads`).
2. In the VS Code terminal, from the project folder:

   ```bash
   npm run update-resume -- ~/Downloads/Sanjay-Y-M-Resume.pdf
   ```

   > Tip: type `npm run update-resume -- ` (with the trailing space), then **drag the PDF from
   > Finder into the terminal** to paste its full path.

3. You'll see:

   ```
   ✔ Resume updated
       to:   src/assets/resume/Sanjay-Y-M-Resume.pdf (45 KB)
       "Last updated" on the site set to 2026-11
   ```

4. Check it at http://localhost:4200/#Resume, then [build and deploy](#6-build-and-deploy).

**What the command does:**
- Checks that the file exists and really is a PDF. If anything is wrong it stops and changes nothing.
- Replaces `src/assets/resume/Sanjay-Y-M-Resume.pdf`. Visitors always download it under that name, whatever your file was called.
- Sets the **"Last updated …"** note in the Resume section to the current month.

### Manual alternative

1. Copy your PDF over `src/assets/resume/Sanjay-Y-M-Resume.pdf`, keeping exactly that file name.
2. In `profile.ts`, set `RESUME_LAST_UPDATED` to the current month, e.g. `'2027-03'`.

---

## 5. Updating content

All of these are edits to `src/app/data/profile.ts`. Save the file and the browser updates.
Dates always use the format **`'YYYY-MM'`**, e.g. `'2027-03'` for March 2027.

### Changing jobs

1. Find your current job in `experience` and change `end: null` to its last month:
   ```ts
   end: '2027-03',
   ```
2. Add the new job at the **top** of the `experience` list:
   ```ts
   {
     company: 'New Company Pvt. Ltd.',
     location: 'Bengaluru',
     role: 'Lead SDET',
     start: '2027-04',
     end: null,                       // null = current job, shows "Present"
     summary: 'One line about the team or product.',
     highlights: [
       'What you built or improved…',
       'Another achievement…',
     ],
     tech: ['Playwright', 'Karate', 'GitHub Actions'],
   },
   ```
   The timeline, the green "current" dot and the durations update automatically.

### Adding a project

Add an entry to the `projects` list:

```ts
{
  name: 'Project Name',
  domain: 'Banking',                // Banking | Insurance | Manufacturing | E-Learning
  company: 'Company · Client',
  description: 'What you tested and why it mattered.',
  tags: ['Playwright', 'Karate'],
},
```

A new domain name works too. It gets a default briefcase icon, and the Domains stat counts it.

### Other common edits

| I want to… | In `profile.ts` |
|---|---|
| Add a skill | Add it to the matching group's `items` in `skills` |
| Add a CI/CD platform | Add it to `CI_CD_PLATFORMS` (QUICK UPDATE block) |
| Add **LinkedIn / GitHub** | Fill in `linkedin: 'https://…'` / `github: 'https://…'`. The icons and contact card appear only when these are set |
| Change phone, email, location | `email`, `phone` (shown), `phoneHref` (digits for the call link), `location` |
| Edit the bio | the `about` paragraphs. Keep `${YEARS}+` wherever you mention experience so it stays automatic |
| Change the rotating titles on Home | the `roles` list |
| Edit "What I bring to a team" | the `strengths` list (icons are [Font Awesome 5](https://fontawesome.com/v5/search?m=free) class names) |

> ⚠️ Text is inside quotes. If your text contains an apostrophe (`'`), either write `\'`
> or wrap the whole text in backticks `` ` `` like the `about` paragraphs.

---

## 6. Build and deploy

```bash
npm run build
```

This creates the finished website in `dist/portfolio/`. You can upload that folder to any static
host (Netlify, Vercel, GitHub Pages, …).

### Publishing to GitHub Pages (automatic)

The site is published by **GitHub Actions** (`.github/workflows/deploy.yml`).
**Every push to `main` rebuilds and republishes the live site**, usually within 2 minutes.

```bash
# after editing content or running update-resume:
git add -A
git commit -m "Update resume"      # describe what changed
git push
```

- Watch progress: GitHub repo → **Actions** tab (green ✔ = live).
- Live URL: **https://&lt;username&gt;.github.io** (repo named `<username>.github.io`).
  Any other repo name is published at `https://<username>.github.io/<repo-name>/`, and the
  workflow sets the right base path automatically.
- Re-run without changes: **Actions → Deploy portfolio → Run workflow**.

You only need to push when **you** change content or the resume. Years and durations
update on the live site by themselves.

---

## 7. Troubleshooting

| Problem | Fix |
|---|---|
| `npm install` fails with `ERESOLVE … peer dependency` | Use `npm install --legacy-peer-deps` |
| `npm` fails with `EACCES: permission denied … ~/.npm` | Run once: `sudo chown -R $(whoami) ~/.npm`, then install again |
| `code: command not found` | In VS Code: `Cmd + Shift + P` → **Shell Command: Install 'code' command in PATH** |
| Port 4200 already in use | Stop the other terminal running `npm start`, or run `npx ng serve --port 4300` |
| Page is blank after an edit | Look at the terminal running `npm start`. It shows the exact file and line, usually a missing comma, quote or bracket in `profile.ts` |
| Old resume still downloads | Your browser has cached it. Hard refresh with `Cmd + Shift + R` |
| Deployed site loads without styles on GitHub Pages | Deploy with `--base-href=/<repo-name>/` (see section 6) |

### Other commands

| Command | What it does |
|---|---|
| `npm start` | Run locally with live reload |
| `npm run build` | Production build into `dist/portfolio/` |
| `npm run update-resume -- <file.pdf>` | Replace the resume PDF and its "Last updated" date |
| `npm test` | Run unit tests (Karma) |
