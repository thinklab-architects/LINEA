import { useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS as localProducts } from '../constants';
// @ts-ignore - Created by build script
import syncedData from '../data/syncedProducts.json';

export const useProducts = () => {
    // Start with synced data if available, otherwise fallback to local
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real build, syncedData will be populated.
        // During dev, if the script hasn't run, it might be undefined/empty.
        if (syncedData && Array.isArray(syncedData) && syncedData.length > 0) {
            setProducts(syncedData);
        } else {
            console.warn("Synced data missing, falling back to local constants.");
            setProducts(localProducts);
        }
        setLoading(false);
    }, []);

    return { products, loading };
};
