import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./styles/about.component.scss'],
})
export class AboutComponent {}
