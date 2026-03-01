const fs = require('fs');
const r = JSON.parse(fs.readFileSync('./report-mobile.json', 'utf8'));
const lcp = r.audits['largest-contentful-paint-element'];
const lcpBreakdown = r.audits['lcp-lazy-loaded'];
const lcpElement = r.audits['largest-contentful-paint-element'];

const lines = [];
if (lcpElement) {
    lines.push('LCP Element:');
    lines.push(JSON.stringify(lcpElement.details, null, 2).substring(0, 1000));
}
if (lcpBreakdown) {
    lines.push('\nLCP Lazy Loaded:');
    lines.push(JSON.stringify(lcpBreakdown.details, null, 2).substring(0, 500));
}

// FCP breakdown
const fcpPhases = r.audits['lcp-breakdown'];
if (fcpPhases) {
    lines.push('\nLCP Breakdown:');
    lines.push(JSON.stringify(fcpPhases.details, null, 2).substring(0, 1000));
}

// Unused CSS
const unusedCss = r.audits['unused-css-rules'];
if (unusedCss && unusedCss.details) {
    lines.push('\nUnused CSS:');
    const items = unusedCss.details.items || [];
    items.forEach(i => lines.push('  ' + (i.url || '').split('/').pop()?.substring(0, 60) + ' - total: ' + (i.totalBytes / 1024).toFixed(1) + 'KB, waste: ' + (i.wastedBytes / 1024).toFixed(1) + 'KB'));
}

// main-thread-tasks
const mainThread = r.audits['mainthread-work-breakdown'];
if (mainThread && mainThread.details) {
    lines.push('\nMain Thread Breakdown:');
    const items = mainThread.details.items || [];
    items.sort((a, b) => b.duration - a.duration);
    items.slice(0, 10).forEach(i => lines.push('  ' + i.group + ': ' + i.duration?.toFixed(0) + 'ms'));
}

// non-composited animations
const nca = r.audits['non-composited-animations'];
if (nca && nca.details) {
    lines.push('\nNon-composited animations:');
    const items = nca.details.items || [];
    items.forEach(i => {
        lines.push('  Node: ' + (i.node?.selector || 'unknown'));
        lines.push('    Snippet: ' + (i.node?.snippet || '').substring(0, 100));
        if (i.subItems && i.subItems.items) {
            i.subItems.items.forEach(s => lines.push('    - ' + s.failureReason));
        }
    });
}

fs.writeFileSync('./score-details2.txt', lines.join('\n'));
console.log('Done');
