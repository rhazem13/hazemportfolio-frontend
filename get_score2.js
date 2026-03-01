const fs = require('fs');
const data = JSON.parse(fs.readFileSync('report.json', 'utf8'));
const logs = [];
logs.push('Score: ' + data.categories.performance.score * 100);
logs.push('FCP: ' + data.audits['first-contentful-paint'].displayValue);
logs.push('LCP: ' + data.audits['largest-contentful-paint'].displayValue);
fs.writeFileSync('score11.txt', logs.join('\n'));
