import { Component } from '@angular/core';
import { PROFILE } from '../data/profile';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  p = PROFILE;
}
