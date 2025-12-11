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

                if (Object.keys(airtableData).length === 0) {
                    setLoading(false);
                    return;
                }

                const mergedProducts = localProducts.map(localProduct => {
                    const remoteData = airtableData[localProduct.name];
                    if (remoteData) {
                        // Merge local product with remote text data
                        // We preserve local ID, image, and gallery
                        return {
                            ...localProduct,
                            ...remoteData,
                            // Ensure we don't accidentally overwrite strict local fields with undefined if missing in Airtable
                            features: remoteData.features || localProduct.features,
                            featuresZh: remoteData.featuresZh || localProduct.featuresZh,
                        };
                    }
                    return localProduct;
                });

                setProducts(mergedProducts);
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
