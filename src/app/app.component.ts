import { Component, HostListener, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';
import { PROFILE } from './data/profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  windowScrolled = false;

  constructor(private meta: Meta, private titleService: Title) { }

  ngOnInit() {
    this.setPageMeta();

    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.windowScrolled = window.scrollY > 400;
  }

  /** Keeps the search/share description in sync with the calculated years of experience. */
  private setPageMeta() {
    const p = PROFILE;
    const description =
      `${p.name} — ${p.title} with ${p.experienceYears}+ years of experience in Playwright, Selenium, ` +
      `Karate API testing and CI/CD quality gates across ${p.domains.join(', ').replace(/, ([^,]*)$/, ' and $1')}.`;
    this.titleService.setTitle(`${p.name} | ${p.title}`);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
