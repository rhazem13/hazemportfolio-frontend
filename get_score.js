const fs = require('fs');
const data = JSON.parse(fs.readFileSync('report.json', 'utf8'));
const logs = [];
logs.push('Score: ' + data.categories.performance.score * 100);
['render-blocking-resources', 'server-response-time', 'font-display', 'unused-javascript', 'unused-css-rules', 'uses-rel-preconnect', 'uses-http2', 'uses-optimized-images'].forEach(id => {
    const a = data.audits[id];
    if (a) {
        logs.push(`Diagnostic: ${a.id} | score=${a.score} | value=${a.displayValue}`);
    }
});
fs.writeFileSync('score10.txt', logs.join('\n'), 'utf8');
