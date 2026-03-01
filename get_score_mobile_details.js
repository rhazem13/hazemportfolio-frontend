const fs = require('fs');
const data = JSON.parse(fs.readFileSync('report-mobile.json', 'utf8'));
const logs = [];

const renderBlocking = data.audits['render-blocking-resources'];
if (renderBlocking && renderBlocking.details && renderBlocking.details.items) {
    logs.push("Render Blocking:");
    renderBlocking.details.items.forEach(item => {
        logs.push(`${item.url} | wastedMs: ${item.wastedMs}`);
    });
}

const networkReq = data.audits['network-requests'];
if (networkReq && networkReq.details && networkReq.details.items) {
    logs.push("\nNetwork Requests (Critical/Large):");
    networkReq.details.items
        .sort((a, b) => b.endTime - a.endTime)
        .slice(0, 10)
        .forEach(item => {
            logs.push(`${item.url} | size: ${item.transferSize} | start: ${item.startTime} | end: ${item.endTime} | type: ${item.resourceType}`);
        });
}

const lcpElem = data.audits['largest-contentful-paint-element'];
if (lcpElem && lcpElem.details && lcpElem.details.items) {
    logs.push("\nLCP Element Details:");
    lcpElem.details.items.forEach(i => logs.push(i.node ? i.node.snippet : i.node));
}

fs.writeFileSync('score-mobile-details.txt', logs.join('\n'), 'utf8');
