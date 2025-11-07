const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), '.next', 'server', 'app');

function injectScript(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes('dashboard-console-capture.js')) {
    return;
  }
  
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
  
  if (content.includes('</head>')) {
    const updatedContent = content.replace('</head>', `${scriptTag}</head>`);
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`Injected console capture script into ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

if (fs.existsSync(outDir)) {
  walkDir(outDir);
  console.log('Console capture script injection complete');
} else {
  console.log('Build directory not found. Run build first.');
}