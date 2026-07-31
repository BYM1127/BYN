const fs = require('fs');
const path = require('path');

const seedDataPath = path.join(__dirname, 'seedData.json');
const crochetDir = path.join(__dirname, 'public', 'crochet');

if (!fs.existsSync(seedDataPath)) {
  console.error('seedData.json not found!');
  process.exit(1);
}

if (!fs.existsSync(crochetDir)) {
  console.error('public/crochet directory not found!');
  process.exit(1);
}

// 1. Read existing seedData
const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));

// 2. Filter out old crochet items, keeping photography and webdesign
const nonCrochetItems = seedData.filter(item => item.pillar !== 'crochet');
console.log(`Retained ${nonCrochetItems.length} non-crochet items.`);

// 3. Helper to recursively find all files
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = getFiles(crochetDir);

// 4. Generate new crochet items
const newCrochetItems = [];

// Title mapping based on folder category
const titleMap = {
  'bags': 'Handcrafted Crochet Bag',
  'hats': 'Cozy Crochet Hat',
  'tops-shirts': 'Handcrafted Crochet Top',
  'two piece': 'Two-Piece Crochet Set',
  'pants': 'Handcrafted Crochet Pants',
  'skirt': 'Handcrafted Crochet Skirt',
  'Sleeves': 'Handcrafted Crochet Sleeves',
  'night market': 'Night Market Crochet Special'
};

allFiles.forEach(filePath => {
  const relPath = path.relative(crochetDir, filePath).replace(/\\/g, '/');
  const pathParts = relPath.split('/');
  
  // We only want files inside a subfolder, e.g. bags/image.jpg
  if (pathParts.length < 2) {
    return; // Skip files directly under public/crochet/
  }
  
  const categoryFolder = pathParts[0];
  
  // Skip temp folders like "New folder"
  if (categoryFolder.toLowerCase() === 'new folder') {
    return;
  }
  
  const ext = path.extname(filePath).toLowerCase();
  // Keep only images
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return;
  }
  
  const fileName = path.basename(filePath);
  const imageUrl = `/crochet/${categoryFolder}/${fileName}`;
  
  const category = categoryFolder; // We keep original folder name (with case/spaces) as category
  const title = titleMap[category] || 'Handcrafted Crochet Piece';
  
  newCrochetItems.push({
    pillar: 'crochet',
    title: title,
    imageUrl: imageUrl,
    category: category,
    tags: ['crochet', 'handmade', category.toLowerCase()],
    rating: 5,
    reviews: 0
  });
});

console.log(`Generated ${newCrochetItems.length} new crochet items.`);

// 5. Combine and save
const updatedSeedData = [...nonCrochetItems, ...newCrochetItems];
fs.writeFileSync(seedDataPath, JSON.stringify(updatedSeedData, null, 2), 'utf8');
console.log(`Successfully updated seedData.json with ${updatedSeedData.length} total items.`);
