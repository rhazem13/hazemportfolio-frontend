const fs = require('fs');

const css = fs.readFileSync('fa.css', 'utf8');

const icons = [
    'fa-lock', 'fa-external-link-alt', 'fa-sun', 'fa-moon', 'fa-code',
    'fa-envelope', 'fa-check', 'fa-map-marker-alt', 'fa-share-alt',
    'fa-check-circle', 'fa-download', 'fa-circle-notch',
    'fa-arrow-up-right-from-square', 'fa-lightbulb', 'fa-layer-group',
    'fa-database', 'fa-server', 'fa-laptop-code', 'fa-tools', 'fa-brain',
    'fa-puzzle-piece', 'fa-comments', 'fa-cubes', 'fa-graduation-cap',
    'fa-certificate', 'fa-github', 'fa-linkedin', 'fa-microsoft',
    'fa-python', 'fa-js', 'fa-windows', 'fa-angular', 'fa-html5',
    'fa-css3-alt', 'fa-sass', 'fa-git-alt'
];

let subsetCss = '';

const fontFaceRegex = /@font-face\s*{[^}]*}/g;
let match;
while ((match = fontFaceRegex.exec(css)) !== null) {
    let rule = match[0];
    // Replace any existing font-display value (e.g. block) with swap
    if (/font-display\s*:\s*\w+/.test(rule)) {
        rule = rule.replace(/font-display\s*:\s*\w+/, 'font-display:swap');
    } else {
        rule = rule.replace('}', 'font-display:swap;}');
    }
    rule = rule.replace(/\.\.\/webfonts\//g, 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/webfonts/');
    subsetCss += rule + '\n';
}

subsetCss += `
.fa, .fas, .fa-solid, .far, .fa-regular, .fab, .fa-brands {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: var(--fa-display, inline-block);
  font-style: normal;
  font-variant: normal;
  line-height: 1;
  text-rendering: auto;
}
.fas, .fa-solid { font-family: "Font Awesome 6 Free"; font-weight: 900; }
.fab, .fa-brands { font-family: "Font Awesome 6 Brands"; font-weight: 400; }
.far, .fa-regular { font-family: "Font Awesome 6 Free"; font-weight: 400; }
`;

// More robust matching: find rules containing content: and any of our icon classes in the selector
const ruleRegex = /([^{}]*){content:"[^"]*"}/g;
while ((match = ruleRegex.exec(css)) !== null) {
    const selector = match[1];
    const rule = match[0];
    if (icons.some(icon => selector.includes('.' + icon))) {
        subsetCss += rule + '\n';
    }
}

fs.writeFileSync('src/fontawesome-subset.scss', subsetCss);
console.log('Subset generated successfully in src/fontawesome-subset.scss');
