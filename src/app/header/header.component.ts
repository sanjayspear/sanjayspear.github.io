import { Component, HostListener, OnInit } from '@angular/core';
import { PROFILE } from '../data/profile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name = PROFILE.name;
  activeRoute = 'Home';
  routeData = [
    // `name` is the section's element id in app.component.html; `label` is the menu text.
    { id: 1, name: 'Home', label: 'Home' },
    { id: 2, name: 'About', label: 'About' },
    { id: 3, name: 'Experience', label: 'Experience' },
    { id: 4, name: 'Projects', label: 'Projects' },
    { id: 5, name: 'PersonalProjects', label: 'Personal Projects' },
    { id: 6, name: 'Skills', label: 'Skills' },
    { id: 7, name: 'Education', label: 'Education' },
    { id: 8, name: 'Resume', label: 'Resume' },
    { id: 9, name: 'Contact', label: 'Contact' }
  ];

  ngOnInit(): void {
    // Highlight whichever section is on screen at load (e.g. after a reload mid-page).
    setTimeout(() => this.updateActiveRouteBasedOnScroll());
  }

  routeChange(value: string) {
    this.activeRoute = value;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateActiveRouteBasedOnScroll();
  }

  /** The active section is the last one whose top has scrolled past the header. */
  updateActiveRouteBasedOnScroll() {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) {
      this.activeRoute = this.routeData[this.routeData.length - 1].name;
      return;
    }
    let active = this.routeData[0].name;
    for (const item of this.routeData) {
      const section = document.getElementById(item.name);
      if (section && section.getBoundingClientRect().top <= 120) {
        active = item.name;
      }
    }
    this.activeRoute = active;
  }
}
