const fs = require('fs');
const path = require('path');

const BASE = '/c/Users/kj583/gate-prep-app';

function writeFile(filePath, content) {
  const fullPath = path.join(BASE, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  console.log('Created:', filePath);
}

const syllabusContent = fs.readFileSync('/dev/stdin', 'utf8');
console.log(syllabusContent);
