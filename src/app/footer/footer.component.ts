import { Component } from '@angular/core';
import { PROFILE } from '../data/profile';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  name = PROFILE.name;
  year = new Date().getFullYear();
}
