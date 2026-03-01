const fs = require('fs');
const { execSync } = require('child_process');

try {
    console.log("Compressing sectiononebackground-mobile.webp...");
    execSync('npx -y sharp-cli@3.1.0 --input src/assets/sectiononebackground-mobile.webp --output src/assets/sectiononebackground-mobile-temp.webp --quality 40');
    fs.renameSync('src/assets/sectiononebackground-mobile-temp.webp', 'src/assets/sectiononebackground-mobile.webp');

    console.log("Compressing sectiononebackground.webp...");
    execSync('npx -y sharp-cli@3.1.0 --input src/assets/sectiononebackground.webp --output src/assets/sectiononebackground-temp.webp --quality 40');
    fs.renameSync('src/assets/sectiononebackground-temp.webp', 'src/assets/sectiononebackground.webp');

    console.log("Compression completed successfully.");
} catch (error) {
    console.error("Error during compression:", error);
}
