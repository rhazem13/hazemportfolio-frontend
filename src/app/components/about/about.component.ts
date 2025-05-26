import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="section about">
      <div class="container">
        <h2 class="section-title">About Me</h2>
        <div class="about-content">
          <div class="about-text">
            <p class="lead">
              I'm a passionate Software Engineer with a keen interest in
              building scalable and efficient web applications.
            </p>
            <p>
              With a strong foundation in modern web technologies and a
              problem-solving mindset, I strive to create innovative solutions
              that make a difference. My experience spans across full-stack
              development, with a particular focus on creating robust and
              user-friendly applications.
            </p>
            <div class="quick-info">
              <div class="info-item">
                <i class="fas fa-code"></i>
                <span>Full Stack Development</span>
              </div>
              <div class="info-item">
                <i class="fas fa-laptop-code"></i>
                <span>Clean Code Advocate</span>
              </div>
              <div class="info-item">
                <i class="fas fa-lightbulb"></i>
                <span>Problem Solver</span>
              </div>
            </div>
          </div>
          <div class="about-image">
            <div class="image-placeholder">
              <i class="fas fa-user-circle"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .about {
        background-color: var(--surface-color);
        padding: 5rem 0;
      }

      .about-content {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 4rem;
        align-items: center;
      }

      .about-text {
        font-size: 1.1rem;
        color: var(--text-secondary);
      }

      .lead {
        font-size: 1.3rem;
        font-weight: 500;
        margin-bottom: 1.5rem;
        color: var(--primary-color);
      }

      .quick-info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-top: 2rem;
      }

      .info-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: var(--card-background);
        border-radius: 8px;
        box-shadow: 0 2px 4px var(--shadow-color);
      }

      .info-item i {
        font-size: 1.5rem;
        color: var(--primary-color);
      }

      .about-image {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .image-placeholder {
        width: 300px;
        height: 300px;
        background: linear-gradient(45deg, var(--primary-color), #00a8ff);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .image-placeholder i {
        font-size: 8rem;
        color: white;
      }

      .section-title {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 3rem;
        color: var(--dark-gray);
      }

      @media (max-width: 768px) {
        .about-content {
          grid-template-columns: 1fr;
        }

        .about-image {
          order: -1;
        }

        .image-placeholder {
          width: 200px;
          height: 200px;
        }

        .image-placeholder i {
          font-size: 5rem;
        }
      }
    `,
  ],
})
export class AboutComponent {}
