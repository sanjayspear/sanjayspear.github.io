import { Component } from '@angular/core';
import { PROFILE } from '../data/profile';

const DOMAIN_ICONS: Record<string, string> = {
  Banking: 'fas fa-university',
  Insurance: 'fas fa-shield-alt',
  Manufacturing: 'fas fa-industry',
  'E-Learning': 'fas fa-graduation-cap',
};

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  p = PROFILE;

  domainIcon(domain: string): string {
    return DOMAIN_ICONS[domain] ?? 'fas fa-briefcase';
  }
}
