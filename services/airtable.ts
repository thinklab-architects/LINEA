import { Product } from '../types';

const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME || 'Products';

interface AirtableRecord {
    id: string;
    fields: {
        Name: string;
        NameZh?: string;
        Tagline?: string;
        TaglineZh?: string;
        Description?: string;
        DescriptionZh?: string;
        LongDescription?: string;
        LongDescriptionZh?: string;
        Price?: number;
        Category?: 'Jewelry' | 'Home' | 'Object' | 'Archive';
        CategoryZh?: string;
        Features?: string; // Expecting newline separated or comma separated string
        FeaturesZh?: string;
        ShopeeUrl?: string;
    };
}

interface AirtableResponse {
    records: AirtableRecord[];
}

export const fetchProductTexts = async (): Promise<Record<string, Partial<Product>>> => {
    if (!API_KEY || !BASE_ID) {
        console.warn('Airtable configuration missing. Using local data only.');
        return {};
    }

    try {
        const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error(`Airtable API Error: ${response.statusText}`);
        }

        const data: AirtableResponse = await response.json();
        const productMap: Record<string, Partial<Product>> = {};

        data.records.forEach(record => {
            const f = record.fields;
            if (f.Name) {
                productMap[f.Name] = {
                    nameZh: f.NameZh,
                    tagline: f.Tagline,
                    taglineZh: f.TaglineZh,
                    description: f.Description,
                    descriptionZh: f.DescriptionZh,
                    longDescription: f.LongDescription,
                    longDescriptionZh: f.LongDescriptionZh,
                    price: f.Price,
                    category: f.Category,
                    categoryZh: f.CategoryZh,
                    shopeeUrl: f.ShopeeUrl,
                    features: f.Features ? f.Features.split('\n').filter(Boolean) : undefined,
                    featuresZh: f.FeaturesZh ? f.FeaturesZh.split('\n').filter(Boolean) : undefined,
                };
            }
        });

        return productMap;

    } catch (error) {
        console.error('Failed to fetch Airtable data:', error);
        return {};
    }
};
