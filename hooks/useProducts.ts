import { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS as localProducts } from '../constants';
// @ts-ignore - Created by build script
import syncedData from '../data/syncedProducts.json';

export const useProducts = () => {
    // Start with local products to ensure immediate render (and safety if sync fails)
    const [products, setProducts] = useState<Product[]>(localProducts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In the built app, syncedData should be populated.
        // We check if it has data and use it.
        if (syncedData && Array.isArray(syncedData) && syncedData.length > 0) {
            console.log("Using synced data:", syncedData.length, "records");
            setProducts(syncedData);
        } else {
            console.warn("Synced data missing or empty, using local fallback.");
            // products is already localProducts, so no action needed, 
            // but we could set it explicitly if we wanted to be sure.
        }
        setLoading(false);
    }, []);

    return { products, loading };
};
