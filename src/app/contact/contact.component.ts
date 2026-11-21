import { Component } from '@angular/core';
import { PROFILE } from '../data/profile';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  p = PROFILE;
  /** 'https://www.linkedin.com/in/x/' → 'linkedin.com/in/x' */
  linkedinLabel = shortUrl(PROFILE.linkedin);
  githubLabel = shortUrl(PROFILE.github);
}

function shortUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}
