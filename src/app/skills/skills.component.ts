import { Component } from '@angular/core';
import { PROFILE } from '../data/profile';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  p = PROFILE;
}
