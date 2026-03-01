const fs = require('fs');
const data = JSON.parse(fs.readFileSync('report-mobile.json', 'utf8'));

const logs = [];
const score = data.categories.performance.score * 100;
logs.push('--- MOBILE PERFORMANCE ---');
logs.push('Performance Score: ' + score);
logs.push('FCP: ' + data.audits['first-contentful-paint'].displayValue);
logs.push('LCP: ' + data.audits['largest-contentful-paint'].displayValue);
logs.push('TBT: ' + data.audits['total-blocking-time'].displayValue);
logs.push('CLS: ' + data.audits['cumulative-layout-shift'].displayValue);
logs.push('SI: ' + data.audits['speed-index'].displayValue);

logs.push('\n--- OPPORTUNITIES ---');
const opportunities = Object.values(data.audits)
    .filter(a => a.details && a.details.type === 'opportunity' && a.score !== null && a.score < 1)
    .sort((a, b) => (b.details.overallSavingsMs || 0) - (a.details.overallSavingsMs || 0));
opportunities.forEach(a => logs.push(`${a.id} | savings=${a.details.overallSavingsMs}ms`));

logs.push('\n--- DIAGNOSTICS ---');
const diagIds = ['render-blocking-resources', 'uses-rel-preconnect', 'font-display', 'unused-javascript', 'unused-css-rules', 'server-response-time', 'modern-image-formats', 'uses-responsive-images', 'uses-optimized-images'];
diagIds.forEach(id => {
    const a = data.audits[id];
    if (a && a.score < 1) {
        logs.push(`Diagnostic: ${a.id} | score=${a.score} | value=${a.displayValue}`);
    }
});

fs.writeFileSync('score-mobile.txt', logs.join('\n'), 'utf8');
