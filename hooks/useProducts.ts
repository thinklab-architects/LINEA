import { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS as localProducts } from '../constants';
import { fetchProductTexts } from '../services/airtable';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>(localProducts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const airtableData = await fetchProductTexts();

                // If Airtable is failing or empty, fallback to local (Safety Mode)
                if (Object.keys(airtableData).length === 0) {
                    console.warn("Airtable empty/failed, using local fallback.");
                    setLoading(false);
                    return;
                }

                // 1. Sync & Filter Local Products
                // Only keep local products that ALSO exist in Airtable
                const syncedLocal = localProducts
                    .filter(local => airtableData[local.name])
                    .map(localProduct => {
                        const remoteData = airtableData[localProduct.name]!;
                        return {
                            ...localProduct,
                            ...remoteData,
                            imageUrl: remoteData.imageUrl || localProduct.imageUrl,
                            gallery: remoteData.gallery || localProduct.gallery,
                            features: remoteData.features || localProduct.features,
                            featuresZh: remoteData.featuresZh || localProduct.featuresZh,
                        };
                    });

                // 2. Identify & Create New Products from Airtable
                // Find names in Airtable that are NOT in localProducts
                const localNames = new Set(localProducts.map(p => p.name));
                const newProducts: Product[] = Object.entries(airtableData)
                    .filter(([name, data]) => !localNames.has(name) && data.imageUrl) // Must have name & image
                    .map(([name, data], index) => ({
                        id: `new-${index}`, // Temporary ID
                        name: name,
                        nameZh: data.nameZh || name,
                        tagline: data.tagline || '',
                        taglineZh: data.taglineZh || '',
                        description: data.description || '',
                        descriptionZh: data.descriptionZh || '',
                        longDescription: data.longDescription || '',
                        longDescriptionZh: data.longDescriptionZh || '',
                        price: data.price || 0,
                        category: data.category || 'Object',
                        categoryZh: data.categoryZh || '物件',
                        imageUrl: data.imageUrl!, // Guaranteed by filter
                        gallery: data.gallery || [data.imageUrl!],
                        features: data.features || [],
                        featuresZh: data.featuresZh || [],
                        shopeeUrl: data.shopeeUrl
                    }));

                // Combine: Synced Local + New Remote
                setProducts([...syncedLocal, ...newProducts]);

            } catch (error) {
                console.error('Error loading product data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return { products, loading };
};
