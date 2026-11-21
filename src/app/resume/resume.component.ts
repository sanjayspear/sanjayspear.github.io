import { Component } from '@angular/core';
import { PROFILE, RESUME_FILE } from '../data/profile';
import { formatMonth } from '../data/date-utils';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent {
  p = PROFILE;
  fileName = RESUME_FILE;
  lastUpdated = formatMonth(PROFILE.resumeLastUpdated);
}
