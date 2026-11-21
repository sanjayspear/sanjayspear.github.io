import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import * as AOS from 'aos';
import { PROFILE } from './data/profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
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

  /**
   * Links like https://sanjayspear.github.io/#Skills: the browser may try to jump to the
   * section before Angular has drawn it (common on a first, uncached visit), so scroll there
   * ourselves once the page has rendered, and again after images and fonts finish loading,
   * unless the visitor has already started scrolling.
   */
  ngAfterViewInit() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let userScrolled = false;
    const markUserScroll = () => (userScrolled = true);
    ['wheel', 'touchstart', 'keydown'].forEach((e) => window.addEventListener(e, markUserScroll, { once: true, passive: true }));

    const goToSection = () => {
      const el = document.getElementById(id);
      if (!el || userScrolled) return;
      const offBy = Math.abs(el.getBoundingClientRect().top - 80);
      if (offBy > 40) el.scrollIntoView({ behavior: 'auto' });
    };

    setTimeout(goToSection, 100);
    if (document.readyState === 'complete') setTimeout(goToSection, 600);
    else window.addEventListener('load', () => setTimeout(goToSection, 100), { once: true });
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
