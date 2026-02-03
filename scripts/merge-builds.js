import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const blogDistDir = path.join(rootDir, 'dist-blog');
const blogTargetDir = path.join(distDir, 'blog');

console.log('🔀 Merging Astro blog into main dist...');

// Copier récursivement le contenu du blog
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Vérifier que les deux builds existent
if (!fs.existsSync(distDir)) {
  console.error('❌ Main build (dist/) not found. Run build:main first.');
  process.exit(1);
}

if (!fs.existsSync(blogDistDir)) {
  console.error('❌ Blog build (dist-blog/) not found. Run build:blog first.');
  process.exit(1);
}

// Copier le blog dans dist/blog
copyRecursiveSync(blogDistDir, blogTargetDir);

// Nettoyer dist-blog
fs.rmSync(blogDistDir, { recursive: true, force: true });

console.log('✅ Blog merged into dist/blog successfully!');
console.log('📦 Final structure:');
console.log('   dist/              (React app)');
console.log('   dist/blog/         (Astro blog)');
