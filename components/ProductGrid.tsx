/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, loading, onProductClick }) => {
  console.log("ProductGrid received products:", products);
  // Determine initial count based on screen size
  const getInitialCount = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 4 : 9;
    }
    return 9;
  };

  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9); // Default to 9, update in effect

  useEffect(() => {
    setVisibleCount(getInitialCount());
  }, []);

  // Compute unique categories from products
  const categories = useMemo(() => {
    const uniqueCats = new Map<string, string>(); // category -> categoryZh

    products.forEach(p => {
      // Filter out 'Archive' (case insensitive check just in case, but usually strict)
      if (p.category && p.category.toLowerCase() !== 'archive') {
        // Use the first found Chinese translation for each category
        if (!uniqueCats.has(p.category)) {
          uniqueCats.set(p.category, p.categoryZh || '');
        }
      }
    });

    // Convert map to array and prepend 'All'
    const catArray = Array.from(uniqueCats.entries()).map(([cat, catZh]) => ({
      id: cat,
      label: cat,
      labelZh: catZh
    }));

    return [
      { id: 'All', label: 'All', labelZh: '全部' },
      ...catArray
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') {
      return products.filter(p => !p.category || p.category.toLowerCase() !== 'archive');
    }
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(getInitialCount());
  }, [activeCategory]);

  return (
    <section id="products" className="py-32 px-6 md:px-12 bg-[#F5F2EB]">
      <div className="max-w-[1800px] mx-auto">

        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26]">Works</h2>

          {/* Minimal Filter */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 border-t border-[#D6D1C7]/50 w-full max-w-2xl">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group flex flex-col items-center pb-1 border-b transition-all duration-300 ${activeCategory === cat.id
                  ? 'border-[#2C2A26] text-[#2C2A26]'
                  : 'border-transparent text-[#A8A29E] hover:text-[#2C2A26]'
                  }`}
              >
                <span className="text-sm uppercase tracking-widest">{cat.label}</span>
                <span className={`text-[10px] tracking-wider transition-opacity duration-300 ${activeCategory === cat.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                  }`}>
                  {cat.labelZh}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State or Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2C2A26]"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-20 animate-fade-in-up">
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} onClick={onProductClick} />
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="flex justify-center mt-20">
                <button
                  onClick={() => setVisibleCount(prev => prev + 9)} // Load 9 more
                  className="group relative px-12 py-4 overflow-hidden border border-[#2C2A26] text-[#2C2A26] hover:text-white transition-colors duration-500"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#2C2A26] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                  <span className="relative z-10 text-sm font-medium tracking-[0.2em] uppercase">More</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;