/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  
  // Mock sizes for demonstration if not in data
  const sizes = ['S', 'M', 'L'];
  const showSizes = product.category === 'Jewelry';

  return (
    <div className="pt-24 min-h-screen bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Shop
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left: Main Image Only */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-[#EBE7DE] overflow-hidden">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-full object-cover animate-fade-in-up"
              />
            </div>
            {/* Simple Gallery preview could go here */}
             <div className="grid grid-cols-2 gap-4">
               {product.gallery?.slice(1).map((img, idx) => (
                  <img key={idx} src={img} alt="" className="w-full aspect-square object-cover bg-[#EBE7DE]" />
               ))}
             </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-start max-w-xl">
             <span className="text-sm font-medium text-[#A8A29E] uppercase tracking-widest mb-1">{product.category} / {product.categoryZh}</span>
             
             <h1 className="text-4xl md:text-5xl font-serif text-[#2C2A26] mb-2">{product.name}</h1>
             <h2 className="text-2xl font-light text-[#5D5A53] mb-6">{product.nameZh}</h2>
             
             <span className="text-2xl font-light text-[#2C2A26] mb-8">${product.price}</span>
             
             <div className="border-b border-[#D6D1C7] pb-8 mb-8 space-y-6">
                <div>
                    <h3 className="font-serif italic text-lg mb-2 text-[#2C2A26]">{product.tagline}</h3>
                    <p className="text-[#5D5A53] leading-relaxed font-light text-lg">
                    {product.longDescription || product.description}
                    </p>
                </div>
                
                <div>
                    <h3 className="text-lg font-light mb-2 text-[#2C2A26]">{product.taglineZh}</h3>
                    <p className="text-[#5D5A53] leading-relaxed font-light text-base opacity-80">
                    {product.longDescriptionZh || product.descriptionZh}
                    </p>
                </div>
             </div>

             {showSizes && (
                <div className="mb-8">
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#2C2A26] mb-4">Select Size / 選擇尺寸</span>
                  <div className="flex gap-4">
                    {sizes.map(size => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                          selectedSize === size 
                            ? 'border-[#2C2A26] bg-[#2C2A26] text-[#F5F2EB]' 
                            : 'border-[#D6D1C7] text-[#5D5A53] hover:border-[#2C2A26]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
             )}

             <div className="flex flex-col gap-4">
               <a 
                 href={product.shopeeUrl || "https://shopee.tw/linea.design.tw"}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full py-5 bg-[#EE4D2D] text-white uppercase tracking-widest text-sm font-medium hover:bg-[#D03E1F] transition-colors text-center"
               >
                 Shop Now / 前往蝦皮購買
               </a>
               
               <div className="mt-8">
                   <h4 className="text-xs font-bold uppercase tracking-widest text-[#2C2A26] mb-3">Features / 特色</h4>
                   <ul className="space-y-2 text-sm text-[#5D5A53]">
                    {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                        <span className="w-1 h-1 bg-[#2C2A26] rounded-full"></span>
                        {feature} <span className="text-[#A8A29E] mx-1">|</span> {product.featuresZh[idx]}
                    </li>
                    ))}
                </ul>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;