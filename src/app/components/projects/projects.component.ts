import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="section projects">
      <div class="container">
        <h2 class="section-title">Featured Projects</h2>
        <div class="projects-grid">
          <div class="project-card">
            <div class="project-image">
              <i class="fas fa-code project-placeholder"></i>
            </div>
            <div class="project-content">
              <h3>Project One</h3>
              <p>A full-stack web application built with Angular and Node.js</p>
              <div class="project-tags">
                <span>Angular</span>
                <span>Node.js</span>
                <span>MongoDB</span>
              </div>
              <div class="project-links">
                <a href="#" class="project-link">
                  <i class="fab fa-github"></i> View Code
                </a>
                <a href="#" class="project-link">
                  <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
              </div>
            </div>
          </div>

          <div class="project-card">
            <div class="project-image">
              <i class="fas fa-mobile-alt project-placeholder"></i>
            </div>
            <div class="project-content">
              <h3>Project Two</h3>
              <p>A responsive web application with modern UI/UX design</p>
              <div class="project-tags">
                <span>React</span>
                <span>TypeScript</span>
                <span>Firebase</span>
              </div>
              <div class="project-links">
                <a href="#" class="project-link">
                  <i class="fab fa-github"></i> View Code
                </a>
                <a href="#" class="project-link">
                  <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .projects {
        background: var(--surface-color);
        padding: 5rem 0;
      }

      .section-title {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 3rem;
        color: var(--dark-gray);
      }

      .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }

      .project-card {
        background: var(--card-background);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 6px var(--shadow-color);
        transition: transform 0.3s ease;
      }

      .project-card:hover {
        transform: translateY(-5px);
      }

      .project-image {
        height: 200px;
        background: linear-gradient(45deg, var(--primary-color), #00a8ff);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .project-placeholder {
        font-size: 4rem;
        color: white;
      }

      .project-content {
        padding: 1.5rem;
      }

      .project-content h3 {
        color: var(--text-color);
        margin-bottom: 0.5rem;
      }

      .project-content p {
        color: var(--text-secondary);
      }

      .project-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 1rem 0;
      }

      .project-tags span {
        background: var(--light-gray);
        padding: 0.3rem 0.8rem;
        border-radius: 20px;
        font-size: 0.9rem;
        color: var(--primary-color);
      }

      .project-links {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }

      .project-link {
        text-decoration: none;
        color: var(--text-secondary);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: color 0.3s ease;
      }

      .project-link:hover {
        color: var(--primary-color);
      }
    `,
  ],
})
export class ProjectsComponent {}
