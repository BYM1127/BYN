const fs = require('fs');
const path = require('path');

const bymContentDir = path.join(__dirname, 'public', 'BYM content');
const galleryPath = path.join(__dirname, 'app', '(site)', 'gallery', 'page.tsx');

const getImages = (dir, prefix) => {
  return fs.readdirSync(dir)
    .filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i))
    .map((file, index) => {
      return `  { id: 'bym_${index}', pillar: 'crochet', title: 'Crochet Work', imageUrl: '/${prefix}/${file}', emoji: '🧶', tags: ['crochet', 'handmade'] },`;
    });
};

const bymImages = getImages(bymContentDir, 'BYM content').join('\n');

const fileContent = fs.readFileSync(galleryPath, 'utf-8');

// The array ITEMS ends with "\n]" before "const FILTER_OPTIONS".
// We will replace "\n]" with ",\n" + bymImages + "\n]"
const updatedContent = fileContent.replace(/\n\]\n\nconst FILTER_OPTIONS/, ',\n' + bymImages + '\n]\n\nconst FILTER_OPTIONS');

fs.writeFileSync(galleryPath, updatedContent);
console.log('Gallery updated with all 100+ images properly!');
