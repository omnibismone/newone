import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = [
  "https://make.ct.ws/wp-content/uploads/2026/03/4b-scaled.png",
  "https://make.ct.ws/wp-content/uploads/2026/03/4-1-scaled.png",
  "https://make.ct.ws/wp-content/uploads/2026/03/1.png",
  "https://make.ct.ws/wp-content/uploads/2026/03/1b-scaled.png",
  "https://make.ct.ws/wp-content/uploads/2025/07/Image_ASO_Before-and-After.png"
];

const dir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

urls.forEach(url => {
  const filename = path.basename(url);
  const dest = path.join(dir, filename);
  const file = fs.createWriteStream(dest);
  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', err => {
    fs.unlink(dest, () => {});
    console.error(`Error downloading ${filename}: ${err.message}`);
  });
});
