import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutComponent } from './components/about/about.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { ContactComponent } from './components/contact/contact.component';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ScrollSurprisesComponent } from './components/scroll-surprises/scroll-surprises.component';
import { SkillsComponent } from './components/skills/skills.component';
import { RouterOutlet } from '@angular/router';

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
    CertificatesComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    CustomCursorComponent,
    ScrollSurprisesComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
