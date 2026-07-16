const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace minmax(200px, 1fr) with minmax(min(100%, 200px), 1fr)
      let newContent = content.replace(/minmax\((\d+px),\s*1fr\)/g, "minmax(min(100%, $1), 1fr)");
      
      if (fullPath.endsWith('globals.css')) {
          newContent = newContent.replace(/padding: 5rem 1\.5rem;/g, "padding: clamp(3rem, 8vw, 5rem) 1.5rem;");
          newContent = newContent.replace(/padding: 3rem 1\.5rem;/g, "padding: clamp(2rem, 5vw, 3rem) 1.5rem;");
      }
      
      if (fullPath.endsWith('app\\(site)\\page.tsx') || fullPath.endsWith('app/(site)/page.tsx')) {
          newContent = newContent.replace(/padding: '2\.5rem'/g, "padding: 'clamp(1.5rem, 5vw, 2.5rem)'");
          newContent = newContent.replace(/padding: '1\.75rem'/g, "padding: 'clamp(1.25rem, 4vw, 1.75rem)'");
      }

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated layout in ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, 'app'));
