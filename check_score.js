const fs = require('fs');
const r = JSON.parse(fs.readFileSync('./report-mobile.json', 'utf8'));
const lines = [];
lines.push('Performance: ' + (r.categories.performance.score * 100));
const a = r.audits;
lines.push('FCP: ' + a['first-contentful-paint'].displayValue + ' score: ' + a['first-contentful-paint'].score);
lines.push('LCP: ' + a['largest-contentful-paint'].displayValue + ' score: ' + a['largest-contentful-paint'].score);
lines.push('SI: ' + a['speed-index'].displayValue + ' score: ' + a['speed-index'].score);
lines.push('TBT: ' + a['total-blocking-time'].displayValue + ' score: ' + a['total-blocking-time'].score);
lines.push('CLS: ' + a['cumulative-layout-shift'].displayValue + ' score: ' + a['cumulative-layout-shift'].score);

if (a['unused-javascript']) {
    lines.push('\nUnused JS:');
    const items = a['unused-javascript'].details?.items || [];
    items.forEach(i => lines.push('  ' + (i.url || '').split('/').pop() + ' - transfer: ' + (i.totalBytes / 1024).toFixed(1) + 'KB, savings: ' + (i.wastedBytes / 1024).toFixed(1) + 'KB'));
}

if (a['render-blocking-resources']) {
    lines.push('\nRender-blocking resources:');
    const items = a['render-blocking-resources'].details?.items || [];
    items.forEach(i => lines.push('  ' + (i.url || '').split('/').pop() + ' - ' + (i.totalBytes / 1024).toFixed(1) + 'KB, savings: ' + i.wastedMs + 'ms'));
}

if (a['critical-request-chains']) {
    lines.push('\nCritical Chains: ' + a['critical-request-chains'].displayValue);
}

if (a['network-requests']) {
    lines.push('\nTop network requests by size:');
    const items = (a['network-requests'].details?.items || [])
        .filter(i => i.transferSize > 1000)
        .sort((a, b) => b.transferSize - a.transferSize)
        .slice(0, 15);
    items.forEach(i => lines.push('  ' + (i.url || '').split('/').pop()?.substring(0, 50) + ' - ' + (i.transferSize / 1024).toFixed(1) + 'KB - end: ' + (i.endTime || 0).toFixed(0) + 'ms'));
}

if (a['non-composited-animations']) {
    lines.push('\nNon-composited animations: ' + (a['non-composited-animations'].details?.items?.length || 0));
}

if (a['long-tasks']) {
    lines.push('\nLong tasks: ' + (a['long-tasks'].details?.items?.length || 0));
    const items = a['long-tasks'].details?.items || [];
    items.forEach(i => lines.push('  duration: ' + i.duration + 'ms, start: ' + i.startTime?.toFixed(0) + 'ms'));
}

fs.writeFileSync('./score-analysis.txt', lines.join('\n'));
console.log('Done - see score-analysis.txt');
