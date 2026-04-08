import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const urls = [
  "https://make.ct.ws/wp-content/uploads/2026/03/4b-scaled.png",
  "https://make.ct.ws/wp-content/uploads/2026/03/4-1-scaled.png",
  "https://make.ct.ws/wp-content/uploads/2026/03/1.png",
  "https://make.ct.ws/wp-content/uploads/2026/03/1b-scaled.png",
  "https://make.ct.ws/wp-content/uploads/2025/07/Image_ASO_Before-and-After.png"
];

const dir = path.join(process.cwd(), 'public', 'images');

async function downloadAndConvert() {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const url of urls) {
    const filename = path.basename(url);
    const parsed = path.parse(filename);
    const webpPath = path.join(dir, `${parsed.name}.webp`);
    
    try {
      console.log(`Downloading ${url}...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      console.log(`Downloaded ${buffer.length} bytes. Converting to WebP...`);
      await sharp(buffer)
        .webp({ quality: 80 })
        .toFile(webpPath);
        
      console.log(`Successfully saved ${parsed.name}.webp`);
      
      // Delete the old png if it exists
      const oldPngPath = path.join(dir, filename);
      if (fs.existsSync(oldPngPath)) {
        fs.unlinkSync(oldPngPath);
        console.log(`Deleted old ${filename}`);
      }
    } catch (err) {
      console.error(`Error processing ${filename}:`, err);
    }
  }
}

downloadAndConvert();
