
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Simple .env parser since we can't rely on external libs yet
const loadEnv = () => {
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf-8');
            content.split('\n').forEach(line => {
                const match = line.match(/^([^=]+)=(.*)$/);
                if (match) {
                    const key = match[1].trim();
                    const value = match[2].trim().replace(/^["']|["']$/g, '');
                    process.env[key] = value;
                }
            });
        }
    } catch (e) {
        console.log('No .env file found or error reading it, relying on process.env');
    }
};

loadEnv();

const API_KEY = process.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = process.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.VITE_AIRTABLE_TABLE_NAME || 'Products';

if (!API_KEY || !BASE_ID) {
    console.error('Missing Airtable API Key or Base ID');
    process.exit(1);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '../public');
const DATA_DIR = path.resolve(__dirname, '../data');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images', 'dynamic');

// Ensure directories exist
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

async function fetchAirtableData() {
    console.log('Fetching data from Airtable...');
    const records = [];
    let offset = null;

    do {
        const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}${offset ? `?offset=${offset}` : ''}`;
        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${API_KEY}` }
        });

        if (!response.ok) {
            throw new Error(`Airtable API Error: ${response.statusText}`);
        }

        const data = await response.json();
        records.push(...data.records);
        offset = data.offset;
    } while (offset);

    return records;
}

async function downloadImage(url, destPath) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to download ${url}`);
    const arrayBuffer = await response.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(arrayBuffer));
}

async function sync() {
    try {
        const records = await fetchAirtableData();
        console.log(`Found ${records.length} records.`);
        if (records.length > 0) {
            console.log('First record fields:', JSON.stringify(records[0].fields, null, 2));
        }

        const processedProducts = [];

        for (const record of records) {
            const fields = record.fields;
            const name = fields.Name;

            if (!name) continue;

            console.log(`Processing: ${name}`);

            // Process Images
            let imageUrl = null;
            let gallery = [];

            // New Schema: Images1 (Primary), Images2 (Secondary), Images3 (Rest)
            // Aggregate all images into one list for consistent processing
            const allImages = [];
            if (fields.Images1 && Array.isArray(fields.Images1)) allImages.push(...fields.Images1);
            if (fields.Images2 && Array.isArray(fields.Images2)) allImages.push(...fields.Images2);
            if (fields.Images3 && Array.isArray(fields.Images3)) allImages.push(...fields.Images3);

            // Fallback for legacy "Images" field if still present
            if (allImages.length === 0 && fields.Images && Array.isArray(fields.Images)) {
                allImages.push(...fields.Images);
            }

            if (allImages.length > 0) {
                console.log(`  - Found ${allImages.length} images across Images1/2/3.`);

                // Create product folder
                const productDir = path.join(IMAGES_DIR, name.replace(/[^a-z0-9]/gi, '_')); // Sanitize
                if (!fs.existsSync(productDir)) fs.mkdirSync(productDir, { recursive: true });

                // Download each image
                for (let i = 0; i < allImages.length; i++) {
                    const img = allImages[i];
                    console.log(`    - Downloading image ${i}: ${img.url} (filename: ${img.filename})`);

                    const ext = path.extname(img.filename) || '.jpg';
                    const filename = `${i + 1}${ext}`;
                    const localPath = path.join(productDir, filename);
                    // Revert to including /LINEA because on GH Pages it is needed if not using relative ./
                    const publicUrl = `/LINEA/images/dynamic/${name.replace(/[^a-z0-9]/gi, '_')}/${filename}`;

                    // Only download if changed (simplification: just overwrite for now to be safe)
                    try {
                        await downloadImage(img.url, localPath);
                        if (i === 0) {
                            imageUrl = publicUrl;
                            console.log(`    - Assigned imageUrl: ${imageUrl}`);
                        }
                        gallery.push(publicUrl);
                    } catch (err) {
                        console.error(`    - Failed to download ${img.url}:`, err);
                    }
                }
            } else {
                console.log('  - No images found in Images1, Images2, Images3, or Images.');
            }

            processedProducts.push({
                id: record.id,
                name: fields.Name,
                nameZh: fields.NameZh || fields.Name,
                tagline: fields.Tagline || '',
                taglineZh: fields.TaglineZh || '',
                description: fields.Description || '',
                descriptionZh: fields.DescriptionZh || '',
                longDescription: fields.LongDescription || '',
                longDescriptionZh: fields.LongDescriptionZh || '',
                price: fields.Price || 0,
                category: fields.Category || 'Object',
                categoryZh: fields.CategoryZh || '物件',
                imageUrl: imageUrl, // Local path
                gallery: gallery,  // Local paths
                features: fields.Features ? fields.Features.split('\n') : [],
                featuresZh: fields.FeaturesZh ? fields.FeaturesZh.split('\n') : [],
                shopeeUrl: fields.ShopeeUrl
            });
        }

        // Save JSON
        const outputPath = path.join(DATA_DIR, 'syncedProducts.json');
        fs.writeFileSync(outputPath, JSON.stringify(processedProducts, null, 2));
        console.log(`Successfully synced ${processedProducts.length} products to ${outputPath}`);


    } catch (error) {
        console.error('Sync failed:', error);
        process.exit(1);
    }
}

// Trigger deployment for Airtable Sync
console.log('Starting sync process...');
sync();
