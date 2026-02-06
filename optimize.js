const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const carouselDir = path.join(publicDir, 'carrossel');

const tasks = [
    {
        file: 'dresscode.webp',
        width: 800, // Reduced from 1080
        quality: 80
    },
    {
        file: 'embaixadoras.webp',
        width: 640, // Reduced from 1280
        quality: 80
    },
    {
        file: 'logo.webp',
        width: 192, // Reduced from 512, ensuring 2x density for 96px display
        quality: 85
    },
    {
        file: 'carrossel/taisa-320.webp',
        width: 320, // Keep width, optimize compression
        quality: 75
    }
];

async function optimize() {
    console.log('Starting Image Optimization...');
    let totalSaved = 0;

    for (const task of tasks) {
        const filePath = path.join(publicDir, task.file);
        if (!fs.existsSync(filePath)) {
            console.warn(`File not found: ${task.file}`);
            continue;
        }

        const inputBuffer = fs.readFileSync(filePath);
        const originalSize = inputBuffer.length;

        try {
            let pipeline = sharp(inputBuffer).webp({ quality: task.quality });

            if (task.width) {
                pipeline = pipeline.resize({ width: task.width, withoutEnlargement: true });
            }

            const outputBuffer = await pipeline.toBuffer();
            const newSize = outputBuffer.length;
            const saved = originalSize - newSize;
            totalSaved += saved;

            fs.writeFileSync(filePath, outputBuffer);

            console.log(`Optimized ${task.file}:`);
            console.log(`  Before: ${(originalSize / 1024).toFixed(2)} KB`);
            console.log(`  After:  ${(newSize / 1024).toFixed(2)} KB`);
            console.log(`  Saved:  ${(saved / 1024).toFixed(2)} KB (${((saved / originalSize) * 100).toFixed(1)}%)`);
        } catch (error) {
            console.error(`Error processing ${task.file}:`, error);
        }
    }

    console.log('-----------------------------------');
    console.log(`Total Space Saved: ${(totalSaved / 1024).toFixed(2)} KB`);
}

optimize();
