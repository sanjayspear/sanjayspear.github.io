import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Typed from 'typed.js';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import { PROFILE } from '../data/profile';

hljs.registerLanguage('typescript', typescript);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  p = PROFILE;
  greeting = 'Hi';
  code = `import { test, expect } from '@playwright/test';

const sanjay = {
  role: 'Senior QA Automation Engineer',
  experienceYears: ${PROFILE.experienceYears},
  ui: ['Playwright', 'Selenium WebDriver'],
  api: ['Karate', 'Postman', 'REST'],
  pipelines: ['Jenkins', 'Azure DevOps', 'Harness'],
  domains: ['Banking', 'Insurance', 'Manufacturing'],
};

test('every release ships with confidence', async () => {
  expect(sanjay.experienceYears).toBeGreaterThanOrEqual(${PROFILE.experienceYears});
  expect(sanjay.ui).toContain('Playwright');
  expect(sanjay.pipelines).toEqual(
    expect.arrayContaining(['Jenkins', 'Harness']),
  );
});`;

  @ViewChild('typedElement', { static: true }) typedElement!: ElementRef;
  @ViewChild('rolesElement', { static: true }) rolesElement!: ElementRef;

  private typedInstances: Typed[] = [];

  ngOnInit() {
    this.setGreeting();
  }

  ngAfterViewInit() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });

    this.typedInstances.push(
      new Typed(this.typedElement.nativeElement, {
        strings: [this.greeting + ','],
        typeSpeed: 60,
        showCursor: false,
        loop: false,
      }),
      new Typed(this.rolesElement.nativeElement, {
        strings: PROFILE.roles,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 1800,
        loop: true,
      })
    );
  }

  ngOnDestroy() {
    this.typedInstances.forEach((t) => t.destroy());
  }

  setGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greeting = 'Good Morning';
    } else if (currentHour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }
}
