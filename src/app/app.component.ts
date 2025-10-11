import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    EducationComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <div class="app-container">
      <app-navbar></app-navbar>
      <main>
        <app-hero></app-hero>
        <app-about></app-about>
        <app-education></app-education>
        <app-experience></app-experience>
        <app-skills></app-skills>
        <app-projects></app-projects>
        <app-contact></app-contact>
        <app-footer></app-footer>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        color: var(--text-color);
        background-color: var(--background-color);
      }

      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: var(--background-color);
        color: var(--text-color);
      }

      main {
        flex: 1;
        margin-top: 4rem;
      }
    `,
  ],
})
export class AppComponent {}
