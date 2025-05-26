import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer>
      <div class="footer-content">
        <p>&copy; 2024 Hazem. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [
    `
      footer {
        background: var(--surface-color);
        color: var(--text-color);
        padding: 2rem;
        text-align: center;
        border-top: 1px solid var(--border-color);
      }

      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
      }
    `,
  ],
})
export class FooterComponent {}
