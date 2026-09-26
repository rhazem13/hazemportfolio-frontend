import { TestBed } from '@angular/core/testing';

import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  it('counts only completed months', async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(ExperienceComponent);
    const experience = fixture.componentInstance.experiences.find(
      ({ id }) => id === 'dp-world-software-engineer-2025',
    );
    expect(experience).toBeDefined();
    experience!.endDate = new Date('2026-08-11T00:00:00Z');

    expect(fixture.componentInstance.getExperienceDuration(experience!)).toBe('1 yr 2 mo');
  });
});
