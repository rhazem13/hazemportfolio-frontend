# Hazem Ragab's portfolio

The source for [hazemportfolio-frontend.pages.dev](https://hazemportfolio-frontend.pages.dev/). The site presents my backend engineering experience, selected work and contact details.

## Stack

Angular 22 with static prerendering, SCSS and a small English/Arabic translation service. The production site is a static build on Cloudflare Pages.

## Local development

```bash
npm ci
npm start
```

Run `npm test -- --watch=false` and `npm run build` before deployment. The build output used by Cloudflare Pages is `dist/hazemportfolio-frontend/browser`.

## Updating content

- Experience and engineering outcomes: `src/app/components/experience/experience.component.ts`
- Project case studies: `src/app/components/projects/projects.component.ts`
- English and Arabic page copy: `src/app/services/translation.service.ts`
- CV PDF: replace `src/assets/Hazem_Ragab_Resume.pdf` with the current, approved CV
- Search and social metadata: `src/index.html`

Keep professional claims and measurements defensible. Client code and internal company architecture are intentionally omitted.
