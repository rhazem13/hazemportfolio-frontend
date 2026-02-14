import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { TranslationService } from '../../services/translation.service';
import { AboutMe3dSceneComponent } from '../about-me-3d-scene/about-me-3d-scene.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, AboutMe3dSceneComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./styles/about.component.scss'],
})
export class AboutComponent {
  constructor(public translationService: TranslationService) { }

  t(key: string): string {
    return this.translationService.t(key);
  }
}
