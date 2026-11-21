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
    { id: 1, name: 'Home' },
    { id: 2, name: 'About' },
    { id: 3, name: 'Experience' },
    { id: 4, name: 'Projects' },
    { id: 5, name: 'Skills' },
    { id: 6, name: 'Education' },
    { id: 7, name: 'Resume' },
    { id: 8, name: 'Contact' }
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
