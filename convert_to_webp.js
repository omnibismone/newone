import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public', 'images');

async function convertImages() {
  if (!fs.existsSync(dir)) {
    console.log('Directory not found');
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const parsed = path.parse(file);
    const webpPath = path.join(dir, `${parsed.name}.webp`);
    
    try {
      await sharp(filePath)
        .webp({ quality: 80 }) // 80 is a good balance between quality and size
        .toFile(webpPath);
      
      console.log(`Converted ${file} to ${parsed.name}.webp`);
      
      // Delete the original file to save space
      fs.unlinkSync(filePath);
      console.log(`Deleted original ${file}`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
  
  console.log('All conversions finished!');
}

convertImages();
