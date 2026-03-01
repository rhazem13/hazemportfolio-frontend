const fs = require('fs');
const data = JSON.parse(fs.readFileSync('report-mobile.json', 'utf8'));
const logs = [];

// Get top opportunities by time
Object.values(data.audits)
    .filter(a => a.score < 1 && a.details && a.details.type === 'opportunity')
    .sort((a, b) => b.details.overallSavingsMs - a.details.overallSavingsMs)
    .slice(0, 5)
    .forEach(a => logs.push(`Opportunity: ${a.id} - ${a.details.overallSavingsMs}ms`));

// Get main thread work breakdown
const mainthread = data.audits['mainthread-work-breakdown'];
if (mainthread && mainthread.details && mainthread.details.items) {
    logs.push('\nMain thread breakdown:');
    mainthread.details.items.forEach(i => logs.push(`${i.groupLabel}: ${i.duration}ms`));
}

// Get bootup time
const bootup = data.audits['bootup-time'];
if (bootup && bootup.details && bootup.details.items) {
    logs.push('\nBootup time:');
    bootup.details.items.forEach(i => logs.push(`${i.url}: ${i.total}ms (script: ${i.scripting}ms)`));
}

// Get render blocking
const render = data.audits['render-blocking-resources'];
if (render && render.details && render.details.items) {
    logs.push('\nRender blocking:');
    render.details.items.forEach(i => logs.push(`${i.url}: ${i.wastedMs}ms`));
}

// Any other diagnostic with a high "wastedMs"
Object.values(data.audits).forEach(a => {
    if (a.details && typeof a.details.wastedMs === 'number' && a.details.wastedMs > 100) {
        logs.push(`Check Audit: ${a.id} wasted ${a.details.wastedMs}ms`);
    }
});

fs.writeFileSync('score-mobile-more.txt', logs.join('\n'), 'utf8');
