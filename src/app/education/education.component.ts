import { Component } from '@angular/core';
import { PROFILE } from '../data/profile';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  p = PROFILE;
}
