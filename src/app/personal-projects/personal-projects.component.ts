import { Component } from '@angular/core';
import { PROFILE } from '../data/profile';

@Component({
  selector: 'app-personal-projects',
  templateUrl: './personal-projects.component.html',
  styleUrls: ['./personal-projects.component.scss']
})
export class PersonalProjectsComponent {
  projects = PROFILE.personalProjects;
  github = PROFILE.github;
}
