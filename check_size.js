import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'images');
let totalSize = 0;

if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    totalSize += stats.size;
    console.log(`${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  });
  console.log(`Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
} else {
  console.log('Directory not found');
}
