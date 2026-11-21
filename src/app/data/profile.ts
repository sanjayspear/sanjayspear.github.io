/**
 * Single source of truth for all portfolio content.
 * Edit this file to update the site — components only render what is here.
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │ WHAT UPDATES ITSELF (no edits needed)                                     │
 * │  • Years of experience — counted from CAREER_START_DATE, rolls over each  │
 * │    September (9+ → 10+ in Sep 2027) everywhere on the site.              │
 * │  • Each job's duration ("1 yr 7 mos") and "Present" for the current job.  │
 * │  • Project and domain counts — counted from the `projects` list below.    │
 * │  • Footer copyright year.                                                 │
 * │                                                                           │
 * │ WHAT YOU UPDATE BY HAND                                                   │
 * │  • New job       → add an entry at the TOP of `experience` and set the    │
 * │                    previous job's `end` date (e.g. '2027-03').            │
 * │  • New project   → add it to `projects`.                                  │
 * │  • New skill     → add it to the right group in `skills`.                 │
 * │  • New resume    → run:  npm run update-resume -- ~/Downloads/file.pdf    │
 * │                    (see README.md → "Updating the portfolio")             │
 * └──────────────────────────────────────────────────────────────────────────┘
 */

import { formatDuration, formatPeriod, monthsBetween, yearsSince } from './date-utils';

// ═══════════════════════════════ QUICK UPDATE ═══════════════════════════════

/** The month your career started ('YYYY-MM'). Years of experience are calculated from this. */
export const CAREER_START_DATE = '2017-09';

/** Resume file in src/assets/resume/. Managed by `npm run update-resume`. */
export const RESUME_FILE = 'Sanjay-Y-M-Resume.pdf';

/** Month the resume PDF was last replaced ('YYYY-MM'). Managed by `npm run update-resume`. */
export const RESUME_LAST_UPDATED = '2026-11';

/** CI/CD platforms you've integrated with — the "CI/CD Platforms" stat counts this list. */
const CI_CD_PLATFORMS = ['Jenkins', 'Azure DevOps', 'Harness'];

// ════════════════════════════════════════════════════════════════════════════

export interface Stat { value: string; label: string; }
export interface Project { name: string; domain: string; company: string; description: string; tags: string[]; }
export interface SkillGroup { title: string; icon: string; items: string[]; }
export interface Strength { title: string; icon: string; description: string; }

/** What you write for each job. */
interface ExperienceInput {
  company: string;
  location: string;
  role: string;
  /** 'YYYY-MM' */
  start: string;
  /** 'YYYY-MM', or null for your current job */
  end: string | null;
  summary: string;
  highlights: string[];
  tech: string[];
}

/** What the site shows — period, duration and "current" are calculated. */
export interface Experience extends ExperienceInput {
  period: string;
  duration: string;
  current: boolean;
}

const YEARS = yearsSince(CAREER_START_DATE);

const experience: ExperienceInput[] = [
  {
    company: 'Capgemini Technology Services India Ltd.',
    location: 'Bengaluru',
    role: 'Senior Consultant',
    start: '2025-05',
    end: null,
    summary: "Quality engineering for Wells Fargo's Consumer Technology division — customer-facing banking platforms.",
    highlights: [
      "Engineered end-to-end UI automation frameworks with Playwright and Wells Fargo's internal Web Automation Framework (WAF), ensuring cross-browser reliability of customer banking workflows.",
      'Built and maintain automated REST API suites in Karate, validating backend microservices, payload schemas and transaction integrity for critical banking applications.',
      'Accelerated delivery by orchestrating parallel cloud test runs on LambdaTest HyperExecute and integrating automated quality gates into Harness deployment pipelines.',
      'Own the Agile test lifecycle — planning, defect triage and documentation in ALM Octane and Confluence — to uphold release quality and compliance standards.',
    ],
    tech: ['Playwright', 'Karate', 'TypeScript', 'HyperExecute', 'Harness', 'JFrog Artifactory', 'GitHub', 'ALM Octane'],
  },
  {
    company: 'Dhruv Compusoft Consultancy Pvt. Ltd.',
    location: 'Bengaluru',
    role: 'Senior Software Test Engineer',
    start: '2022-10',
    end: '2025-04',
    summary: 'Led UI and API automation for insurance claims management and inspection platforms.',
    highlights: [
      'Architected scalable UI automation suites with Selenium WebDriver, TestNG and the Page Object Model, paired with REST API validation in Postman.',
      'Spearheaded the migration of legacy Selenium suites to Playwright — cutting execution time and improving stability across modern web features and browsers.',
      'Integrated Selenium and Playwright frameworks into CI/CD pipelines for continuous regression, faster feedback loops and higher deployment efficiency.',
    ],
    tech: ['Selenium WebDriver', 'Playwright', 'TestNG', 'Java', 'Postman', 'POM', 'CI/CD'],
  },
  {
    company: 'Hexaware Technologies Ltd.',
    location: 'Bengaluru',
    role: 'Software Engineer',
    start: '2019-07',
    end: '2022-09',
    summary: 'End-to-end UI, API and database validation for insurance and manufacturing clients.',
    highlights: [
      'Automated end-to-end UI and API testing with Selenium and Postman, improving execution efficiency and release accuracy.',
      'Configured Jenkins and Azure DevOps pipelines for scheduled regression runs and build-health reporting that accelerated release sign-offs.',
      'Performed backend data validation with SQL to ensure integrity and accuracy across application databases.',
    ],
    tech: ['Selenium', 'Java', 'Postman', 'SQL', 'Jenkins', 'Azure DevOps'],
  },
  {
    company: 'Test Yantra Software Solutions Pvt. Ltd.',
    location: 'Bengaluru',
    role: 'Software Test Engineer',
    start: '2017-09',
    end: '2019-05',
    summary: 'Built a strong automation foundation across insurance and e-learning products.',
    highlights: [
      'Executed UI automation with Selenium WebDriver using TestNG and the Page Object Model.',
      'Drove Agile sprint tracking in Jira, technical documentation in Confluence and cross-functional collaboration via MS Teams.',
    ],
    tech: ['Selenium WebDriver', 'TestNG', 'POM', 'Jira', 'Confluence'],
  },
];

const projects: Project[] = [
  {
    name: 'LPO & TDCS',
    domain: 'Banking',
    company: 'Capgemini · Wells Fargo',
    description: 'Comprehensive UI and API automation for core consumer banking platforms — validating high-volume customer workflows, service integrations and production readiness across releases.',
    tags: ['Playwright', 'Karate', 'HyperExecute', 'Harness'],
  },
  {
    name: 'HCC – Hancock Claims Consultants',
    domain: 'Insurance',
    company: 'Dhruv Compusoft',
    description: 'End-to-end UI and API automation for claims management and inspection workflows, ensuring seamless cross-browser performance and release quality.',
    tags: ['Selenium', 'Playwright', 'Postman', 'CI/CD'],
  },
  {
    name: 'AAA',
    domain: 'Insurance',
    company: 'Hexaware',
    description: 'Validated core policy, claims and customer workflows across UI, API and database layers.',
    tags: ['Selenium', 'Postman', 'SQL'],
  },
  {
    name: 'Batchloader',
    domain: 'Manufacturing',
    company: 'Hexaware',
    description: 'End-to-end functional, API and SQL data validation for automated batch-processing workflows.',
    tags: ['API Testing', 'SQL', 'Jenkins'],
  },
  {
    name: 'Enrollment Broker',
    domain: 'Insurance',
    company: 'Test Yantra',
    description: 'UI automation of enrollment journeys using Selenium WebDriver, TestNG and Page Object Model.',
    tags: ['Selenium', 'TestNG', 'POM'],
  },
  {
    name: 'FTA',
    domain: 'E-Learning',
    company: 'Test Yantra',
    description: 'Automated regression coverage for an e-learning platform within Agile sprints.',
    tags: ['Selenium', 'TestNG', 'Jira'],
  },
];

const domains = Array.from(new Set(projects.map((p) => p.domain)));

export const PROFILE = {
  name: 'Sanjay Y M',
  shortName: 'Sanjay',
  title: 'Senior QA Automation Engineer',
  location: 'Bengaluru, Karnataka, India',
  email: 'sanjayym050592@gmail.com',
  phone: '+91 89045 28460',
  phoneHref: '+918904528460',
  /** Add your profile URLs here — empty values are hidden on the site. */
  linkedin: '',
  github: '',

  /** Calculated: completed years since CAREER_START_DATE. */
  experienceYears: YEARS,
  resumePdf: `assets/resume/${RESUME_FILE}`,
  resumeLastUpdated: RESUME_LAST_UPDATED,

  roles: [
    'Senior QA Automation Engineer',
    'Playwright & Selenium Specialist',
    'Karate API Test Engineer',
    'CI/CD Quality Gate Builder',
  ],

  about: [
    `I'm a Senior QA Automation Engineer with ${YEARS}+ years of experience making software releases faster, safer and
     more predictable across ${domains.slice(0, -1).join(', ')} and ${domains[domains.length - 1]} domains.`,
    `I design scalable UI and API test automation frameworks from the ground up, lead legacy Selenium-to-Playwright
     migrations, and build robust Karate API suites that validate complex microservices end to end.`,
    `My focus is shifting quality left: wiring automated quality gates into ${CI_CD_PLATFORMS.join(', ').replace(/, ([^,]*)$/, ' and $1')}
     pipelines so every build gets fast, reliable feedback — and teams ship with confidence.`,
  ],

  stats: [
    { value: `${YEARS}+`, label: 'Years in Quality Engineering' },
    { value: `${domains.length}`, label: 'Industry Domains' },
    { value: `${projects.length}+`, label: 'Enterprise Projects Delivered' },
    { value: `${CI_CD_PLATFORMS.length}`, label: 'CI/CD Platforms Integrated' },
  ] as Stat[],

  strengths: [
    {
      title: 'Framework Architecture',
      icon: 'fas fa-sitemap',
      description: 'Scalable, maintainable UI automation frameworks built on Page Object Model, reusable components and clean reporting.',
    },
    {
      title: 'Selenium → Playwright Migration',
      icon: 'fas fa-exchange-alt',
      description: 'Modernising legacy suites to Playwright for faster execution, auto-waiting stability and true cross-browser coverage.',
    },
    {
      title: 'API & Microservice Testing',
      icon: 'fas fa-plug',
      description: 'Karate and Postman suites validating payload schemas, contracts and transaction integrity across services.',
    },
    {
      title: 'CI/CD Quality Gates',
      icon: 'fas fa-shield-alt',
      description: 'Automated regression in Jenkins, Azure DevOps and Harness, with parallel cloud runs on LambdaTest HyperExecute.',
    },
    {
      title: 'Data Validation',
      icon: 'fas fa-database',
      description: 'Backend verification with SQL to guarantee data integrity across UI, API and database layers.',
    },
    {
      title: 'Agile Quality Ownership',
      icon: 'fas fa-users',
      description: 'End-to-end test lifecycle, defect triage and documentation, partnering closely with cross-functional squads.',
    },
  ] as Strength[],

  experience: experience.map((job): Experience => ({
    ...job,
    period: formatPeriod(job.start, job.end),
    duration: formatDuration(monthsBetween(job.start, job.end)),
    current: job.end === null,
  })),

  projects,
  domains,
  ciCdPlatforms: CI_CD_PLATFORMS,

  skills: [
    {
      title: 'Test Automation',
      icon: 'fas fa-robot',
      items: ['Playwright', 'Selenium WebDriver', 'Karate', 'TestNG', 'Page Object Model', 'Postman', 'Manual Testing'],
    },
    {
      title: 'Languages',
      icon: 'fas fa-code',
      items: ['Java', 'TypeScript', 'JavaScript', 'SQL'],
    },
    {
      title: 'CI/CD & DevOps',
      icon: 'fas fa-infinity',
      items: ['Jenkins', 'Azure DevOps', 'Harness', 'LambdaTest HyperExecute', 'JFrog Artifactory', 'Git', 'GitHub'],
    },
    {
      title: 'Test & Agile Tools',
      icon: 'fas fa-tasks',
      items: ['ALM Octane', 'Jira', 'Confluence', 'MS Teams', 'Agile / Scrum'],
    },
    {
      title: 'Platforms',
      icon: 'fas fa-desktop',
      items: ['Linux', 'Windows', 'Cross-browser Testing'],
    },
    {
      title: 'Core Strengths',
      icon: 'fas fa-lightbulb',
      items: ['Analytical Thinking', 'Communication', 'Team Collaboration', 'Defect Triage'],
    },
  ] as SkillGroup[],

  education: {
    degree: 'Bachelor of Computer Science – Software Engineering',
    institution: 'NITTE University, affiliated with Visvesvaraya Technological University (VTU)',
    year: '2014',
  },

  languages: ['English', 'Kannada', 'Hindi', 'Telugu'],
};
