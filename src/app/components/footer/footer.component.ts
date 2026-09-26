
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./styles/footer.component.scss'],
})
export class FooterComponent {
  constructor(public translationService: TranslationService) {}

  t(key: string): string {
    return this.translationService.t(key);
  }
}
