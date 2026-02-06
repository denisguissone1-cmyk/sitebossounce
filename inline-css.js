const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'public', 'index.html');
const cssPath = path.join(__dirname, 'public', 'styles.css');

if (!fs.existsSync(htmlPath) || !fs.existsSync(cssPath)) {
    console.error('Files not found.');
    process.exit(1);
}

let html = fs.readFileSync(htmlPath, 'utf8');
const css = fs.readFileSync(cssPath, 'utf8');

// Replace standard link
let newHtml = html.replace('<link href="styles.css" rel="stylesheet">', `<style>${css}</style>`);

// Fallback if the tag is slightly different (attributes order, etc.)
if (newHtml === html) {
    console.log('Exact match not found, trying regex...');
    newHtml = html.replace(/<link[^>]*href=["']styles\.css["'][^>]*>/, `<style>${css}</style>`);
}

if (newHtml !== html) {
    fs.writeFileSync(htmlPath, newHtml);
    console.log('Successfully inlined styles.css into index.html');
} else {
    console.error('Could not find styles.css link in index.html');
}
