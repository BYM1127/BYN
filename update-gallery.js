const fs = require('fs');
const path = require('path');

const crochetDir = path.join(__dirname, 'public', 'crochet');
const bymContentDir = path.join(__dirname, 'public', 'BYM content');
const galleryPath = path.join(__dirname, 'app', '(site)', 'gallery', 'page.tsx');

const getImages = (dir, prefix) => {
  return fs.readdirSync(dir)
    .filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i))
    .map((file, index) => ({
      id: `${prefix}-${index + 1}`,
      title: `Crochet Piece ${index + 1}`,
      src: `/${prefix}/${file}`,
      category: 'Crochet'
    }));
};

const crochetImages = getImages(crochetDir, 'crochet');
const bymImages = getImages(bymContentDir, 'BYM content');

const allItems = [...crochetImages, ...bymImages].map((item, index) => {
  item.id = index + 1;
  item.title = `Crochet Masterpiece ${index + 1}`;
  return item;
});

const fileContent = fs.readFileSync(galleryPath, 'utf-8');
const newItemsStr = `const ITEMS = ${JSON.stringify(allItems, null, 2)}`;

const updatedContent = fileContent.replace(/const ITEMS = \[[\s\S]*?\]/, newItemsStr);

fs.writeFileSync(galleryPath, updatedContent);
console.log('Gallery updated with all images!');
