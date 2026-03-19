const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/gallery';
const outputDir = 'public/gallery-optimized';
const maxWidth = 1600;
const quality = 80;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(inputDir);
  console.log(`Found ${files.length} files. Starting optimization to new folder...`);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    if (!file.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) continue;

    try {
      await sharp(inputPath)
        .resize({ width: maxWidth, withoutEnlargement: true })
        .jpeg({ quality, progressive: true })
        .toFile(outputPath);
      
      console.log(`✅ Processed: ${file}`);
    } catch (err) {
      console.error(`❌ Error processing ${file}:`, err.message);
    }
  }
  console.log('--- Optimization Complete ---');
}

optimizeImages();
