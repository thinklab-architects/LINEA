
import fs from 'fs';
import path from 'path';
import fm from 'front-matter';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../content/journal');
const PUBLIC_IMAGE_DIR = path.join(__dirname, '../public/images/journal');
const OUTPUT_FILE = path.join(__dirname, '../data/journal-data.json');
const BASE_URL = '/LINEA';

// Ensure directories exist
if (!fs.existsSync(CONTENT_DIR)) {
    console.log(`Creating content directory: ${CONTENT_DIR}`);
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

if (!fs.existsSync(PUBLIC_IMAGE_DIR)) {
    console.log(`Creating public image directory: ${PUBLIC_IMAGE_DIR}`);
    fs.mkdirSync(PUBLIC_IMAGE_DIR, { recursive: true });
}

if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
    console.log(`Creating data directory: ${path.dirname(OUTPUT_FILE)}`);
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
}


function processJournal() {
    console.log('Starting Journal Processing...');

    const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));
    const articles = [];

    files.forEach((file, index) => {
        const filePath = path.join(CONTENT_DIR, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const attributes = fm(content);

        let markdownBody = attributes.body;
        const frontmatter = attributes.attributes;

        // Process Images in Markdown
        // Regex to find ![[image.jpg]] (Obsidian style) or ![alt](image.jpg) (Standard Markdown)
        // We assume images are co-located in CONTENT_DIR or subfolders

        // 1. Handle Standard Markdown ![alt](url)
        markdownBody = markdownBody.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, imgPath) => {
            return processImageMatch(match, alt, imgPath, file);
        });

        // 2. Handle Obsidian Wikilinks ![[image.jpg]]
        markdownBody = markdownBody.replace(/!\[\[(.*?)\]\]/g, (match, imgPath) => {
            return processImageMatch(match, '', imgPath, file);
        });

        // Convert to HTML
        const htmlContent = marked.parse(markdownBody);

        // Process Cover Image
        let coverImage = frontmatter.image;
        if (coverImage && !coverImage.startsWith('http')) {
            // It's a local file
            const newPath = copyImage(coverImage, file);
            if (newPath) {
                coverImage = newPath;
            }
        }

        articles.push({
            id: frontmatter.id || `gen-${index + 1}`, // Fallback ID
            title: frontmatter.title || 'Untitled',
            titleZh: frontmatter.titleZh || '',
            date: frontmatter.date ? new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
            excerpt: frontmatter.excerpt || '',
            excerptZh: frontmatter.excerptZh || '',
            image: coverImage || '',
            content: htmlContent
        });
    });

    // Sort by date descending
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(articles, null, 2));
    console.log(`Successfully generated ${articles.length} articles to ${OUTPUT_FILE}`);
}

function processImageMatch(fullMatch, alt, imagePath, sourceFile) {
    // Clean up image path (remove query params if any)
    const cleanPath = imagePath.split('?')[0].trim();

    // Check if it's an external URL
    if (cleanPath.startsWith('http') || cleanPath.startsWith('//')) {
        return fullMatch; // Return as is
    }

    const newWebPath = copyImage(cleanPath, sourceFile);

    if (newWebPath) {
        return `![${alt}](${newWebPath})`;
    } else {
        return fullMatch; // Keep original if fail
    }
}

function copyImage(imageFilename, sourceMarkdownFile) {
    // Try to find the image file
    // 1. In the same directory as the markdown file
    let sourcePath = path.join(CONTENT_DIR, imageFilename);

    if (!fs.existsSync(sourcePath)) {
        // Try looking in an 'assets' or 'images' subfolder if commonly used
        // Or just fail gracefully
        console.warn(`Warning: Image not found: ${imageFilename} (referenced in ${sourceMarkdownFile})`);
        return null;
    }

    const destFilename = `${path.basename(sourceMarkdownFile, '.md')}-${path.basename(imageFilename)}`;
    const destPath = path.join(PUBLIC_IMAGE_DIR, destFilename);

    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied image: ${imageFilename} -> ${destFilename}`);

    return `${BASE_URL}/images/journal/${destFilename}`;
}

processJournal();
