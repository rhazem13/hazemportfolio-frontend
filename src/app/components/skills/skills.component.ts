import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="section skills">
      <div class="container">
        <h2 class="section-title">Skills & Technologies</h2>
        <div class="skills-grid">
          <div class="skill-category">
            <h3>Frontend</h3>
            <div class="skill-items">
              <div class="skill-item">
                <i class="fab fa-html5"></i>
                <span>HTML5</span>
              </div>
              <div class="skill-item">
                <i class="fab fa-css3-alt"></i>
                <span>CSS3</span>
              </div>
              <div class="skill-item">
                <i class="fab fa-js"></i>
                <span>JavaScript</span>
              </div>
              <div class="skill-item">
                <i class="fab fa-angular"></i>
                <span>Angular</span>
              </div>
            </div>
          </div>
          <div class="skill-category">
            <h3>Backend</h3>
            <div class="skill-items">
              <div class="skill-item">
                <i class="fab fa-node-js"></i>
                <span>Node.js</span>
              </div>
              <div class="skill-item">
                <i class="fas fa-database"></i>
                <span>SQL</span>
              </div>
              <div class="skill-item">
                <i class="fas fa-server"></i>
                <span>REST APIs</span>
              </div>
            </div>
          </div>
          <div class="skill-category">
            <h3>Tools & Others</h3>
            <div class="skill-items">
              <div class="skill-item">
                <i class="fab fa-git-alt"></i>
                <span>Git</span>
              </div>
              <div class="skill-item">
                <i class="fab fa-docker"></i>
                <span>Docker</span>
              </div>
              <div class="skill-item">
                <i class="fas fa-cloud"></i>
                <span>Cloud</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .skills {
        background: var(--background-color);
        padding: 5rem 0;
      }

      .section-title {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 3rem;
        color: var(--dark-gray);
      }

      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }

      .skill-category {
        padding: 2rem;
        background: var(--surface-color);
        border-radius: 12px;
        box-shadow: 0 4px 6px var(--shadow-color);
      }

      .skill-category h3 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
      }

      .skill-items {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 1rem;
      }

      .skill-item {
        background: var(--card-background);
        border-radius: 8px;
        padding: 1rem;
        transition: transform 0.3s ease, background-color 0.3s ease;
      }

      .skill-item:hover {
        transform: translateY(-5px);
        background: var(--hover-color);
      }

      .skill-item i {
        font-size: 2rem;
        color: var(--primary-color);
      }
    `,
  ],
})
export class SkillsComponent {}
