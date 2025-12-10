/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle } from './types';

// Placeholder Shopee URL - in a real app, this would be the specific product link
const SHOPEE_STORE_URL = 'https://shopee.tw/linea.design.tw'; 

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Tornado Vase',
    nameZh: '旋・乾燥花瓶',
    tagline: 'Structure and fragility.',
    taglineZh: '結構與脆弱的靜謐平衡',
    description: 'A spiral form where light flows through, tracing the motion of a tornado. Designed for dried florals.',
    descriptionZh: '光線穿透螺旋形態，描繪如龍捲風般的動態軌跡。專為乾燥花設計的建築微景觀。',
    longDescription: 'A quiet balance between structure and fragility. Light flows through the spiral form, tracing motion of tornado. Each curve embraces the delicate remains of time — where digital craft meets organic calm.',
    longDescriptionZh: '結構與脆弱之間的靜謐平衡。光線順著螺旋形態流動，描摹出龍捲風的動態。每一道曲線都溫柔地擁抱著時間的殘留——這正是數位工藝與有機平靜相遇之處。',
    price: 145,
    category: 'Home',
    categoryZh: '家飾',
    imageUrl: 'https://images.unsplash.com/photo-1616627561950-9f746e33018e?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1616627561950-9f746e33018e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1589154625725-d7168661858b?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Parametric Design', 'Light Diffusion', 'Bio-Polymer Material'],
    featuresZh: ['參數化設計', '光影漫射結構', '環保生物聚合物'],
    shopeeUrl: SHOPEE_STORE_URL
  },
  {
    id: 'p2',
    name: 'Flowing Silence Pot',
    nameZh: '流動靜謐・盆器',
    tagline: 'Where motion meets stillness.',
    taglineZh: '當動態遇見靜止',
    description: 'Soft, continuous, and endlessly evolving curves that trace the rhythm of light and air.',
    descriptionZh: '柔軟、連續且無盡演變的曲線，描繪著光與空氣的韻律。',
    longDescription: 'Where motion meets stillness — each curve traces the rhythm of light and air. Soft, continuous, and endlessly evolving. This vessel is designed to hold life, acting as a serene architectural landscape for your plants.',
    longDescriptionZh: '動態與靜止的交會點——每一道曲線都追隨著光與空氣的節奏。柔軟、連續，且生生不息地演變。這不僅是一個容器，更是一片為植物而生的寧靜建築地景。',
    price: 120,
    category: 'Home',
    categoryZh: '家飾',
    imageUrl: 'https://images.unsplash.com/photo-1596547609805-7b8086c55143?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1596547609805-7b8086c55143?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1596547609652-9cf5d8d60be5?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Continuous Geometry', 'Matte White Finish', 'Architectural Form'],
    featuresZh: ['連續幾何曲面', '霧面潔白質感', '建築流線造型'],
    shopeeUrl: SHOPEE_STORE_URL
  },
  {
    id: 'p3',
    name: 'Milky Way Flow',
    nameZh: '銀河光流',
    tagline: 'Nebulae in light.',
    taglineZh: '光之星雲',
    description: 'Layered surfaces that breathe under illumination, swirling like cosmic nebulae.',
    descriptionZh: '層疊的表面在光照下呼吸，如宇宙星雲般旋轉流動。',
    longDescription: 'Like the gentle flow of the Milky Way, light drifts and expands through space. Layered surfaces breathe under illumination, swirling like cosmic nebulae. This light object transforms the atmosphere of a room, creating a soft, dimensional glow.',
    longDescriptionZh: '如銀河般溫柔流動，光線在空間中漂浮、擴展。層疊的表面在照明下彷彿有了呼吸，像宇宙星雲般盤旋。這件光之雕塑轉化了空間的氛圍，創造出柔軟而具深度的光暈。',
    price: 280,
    category: 'Object',
    categoryZh: '物件',
    imageUrl: 'https://images.unsplash.com/photo-1565545620921-267924d55736?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1565545620921-267924d55736?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Layered Diffusion', 'Ambient Glow', 'Sculptural Statement'],
    featuresZh: ['層疊漫射技術', '氛圍光感', '雕塑感造型'],
    shopeeUrl: SHOPEE_STORE_URL
  },
  {
    id: 'p4',
    name: 'Helix Cuff',
    nameZh: '螺旋・手鐲',
    tagline: 'DNA of design.',
    taglineZh: '設計的基因序列',
    description: 'A silver cuff that mimics the twisting growth patterns found in nature.',
    descriptionZh: '模仿自然界生長扭轉模式的純銀手鐲。',
    longDescription: 'Architecture often mimics the efficiency of biology. The Helix Cuff captures the moment a straight line twists into a curve. Crafted from sterling silver, it features the same parametric logic as our larger home objects, scaled down to the intimacy of the wrist.',
    longDescriptionZh: '建築往往模仿生物學的高效能。Helix 手鐲捕捉了直線扭轉為曲線的那一瞬間。以純銀打造，它採用了與我們大型家飾相同的參數化邏輯，縮小至手腕親密的尺度。',
    price: 165,
    category: 'Jewelry',
    categoryZh: '首飾',
    imageUrl: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Sterling Silver', 'Ergonomic Fit', 'Fluid Geometry'],
    featuresZh: ['925純銀', '人體工學貼合', '流體幾何'],
    shopeeUrl: SHOPEE_STORE_URL
  },
  {
    id: 'p5',
    name: 'Voronoi Earrings',
    nameZh: '細胞・耳環',
    tagline: 'Cellular beauty.',
    taglineZh: '細胞結構之美',
    description: 'Intricate lattice earrings based on cellular structures found in leaves and dragonfly wings.',
    descriptionZh: '源自葉脈與蜻蜓翅膀細胞結構的錯綜網格耳環。',
    longDescription: 'Lightweight yet structurally complex, these earrings utilize the Voronoi pattern found throughout nature—from drying earth to leaf veins. They cast beautiful, complex shadows and represent the perfect union of computational design and natural beauty.',
    longDescriptionZh: '輕盈卻結構複雜，這些耳環運用了自然界中無處不在的 Voronoi 圖樣——從乾裂的大地到葉片的紋理。它們投射出美麗而複雜的陰影，代表了運算設計與自然之美的完美結合。',
    price: 110,
    category: 'Jewelry',
    categoryZh: '首飾',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1630019852942-f89202989a51?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['3D Printed Cast', 'Lightweight', 'Nature Inspired'],
    featuresZh: ['3D列印鑄造', '極致輕盈', '師法自然'],
    shopeeUrl: SHOPEE_STORE_URL
  },
  {
    id: 'p6',
    name: 'Lace Coaster Set',
    nameZh: '光影・杯墊組',
    tagline: 'Shadow play.',
    taglineZh: '桌上的光影遊戲',
    description: 'Delicate, laser-etched coasters featuring microscopic architectural diagrams.',
    descriptionZh: '精緻雷射蝕刻杯墊，呈現微觀的建築圖學。',
    longDescription: 'A series of intricate line drawings brought to physical form. These coasters act as small blueprints for the table. When light hits them, they extend their footprint through shadow, blurring the boundary between the object and the surface it rests on.',
    longDescriptionZh: '將錯綜複雜的線條圖轉化為實體。這些杯墊如同餐桌上的微型藍圖。當光線照射時，它們透過陰影延伸其足跡，模糊了物件與桌面之間的界線。',
    price: 55,
    category: 'Object',
    categoryZh: '物件',
    imageUrl: 'https://images.unsplash.com/photo-1517135390602-d35d72493979?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1517135390602-d35d72493979?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1526434473860-29c322744888?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Laser Etched', 'Acrylic/Resin', 'Set of 4'],
    featuresZh: ['雷射蝕刻', '壓克力/樹脂', '四件組'],
    shopeeUrl: SHOPEE_STORE_URL
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 1,
        title: "Digital Craft, Organic Calm",
        titleZh: "數位工藝，有機平靜",
        date: "October 12, 2024",
        excerpt: "How algorithms help us mimic the quiet complexity of nature.",
        excerptZh: "演算法如何幫助我們模仿自然界中靜謐的複雜性。",
        image: "https://images.unsplash.com/photo-1507643179173-442f8552932c?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left text-[#5D5A53]" },
                "We often think of 'digital' and 'natural' as opposites. At LINEA, we see them as collaborators."
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "Nature builds with code—DNA. It dictates the spiral of a shell and the branching of a tree. By using parametric design tools, we can emulate these growth patterns, creating forms that feel alive. The result is a 'Dried Floral Vase' that twists like a tornado, or a light fixture that flows like a nebula."
            ),
             React.createElement("p", { className: "mb-8 text-[#5D5A53] font-light" },
                "我們常認為「數位」與「自然」是對立的。但在 LINEA，我們視它們為協作者。大自然以代碼——DNA——進行構建。它指令了貝殼的螺旋與樹木的分枝。透過參數化設計工具，我們可以模仿這些生長模式，創造出充滿生命力的形態。結果便是如龍捲風般旋轉的「乾燥花瓶」，或如星雲般流動的燈飾。"
            ),
            React.createElement("blockquote", { className: "border-l-2 border-[#2C2A26] pl-6 italic text-xl text-[#2C2A26] my-10 font-serif" },
                "\"The computer is the loom; the algorithm is the thread. The result is woven light.\""
            )
        )
    },
    {
        id: 2,
        title: "Learning from Light",
        titleZh: "向光學習",
        date: "September 28, 2024",
        excerpt: "Designing objects that only truly exist when illuminated.",
        excerptZh: "設計那些唯有在被照亮時才真正存在的物件。",
        image: "https://images.unsplash.com/photo-1492552181161-62217fc3076d?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "A solid object is static. A translucent object, composed of layers, breathes. Our 'Milky Way' series is an exploration of how light travels through matter."
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "By varying the thickness of our 3D-printed walls, we control the opacity. We are not just designing the shape of the lamp, but the shape of the light it emits. It drifts, expands, and swirls, bringing the movement of the cosmos into the quiet corner of a room."
            ),
             React.createElement("p", { className: "mb-8 text-[#5D5A53] font-light" },
                "實體物件是靜態的。而由層次構成的半透明物件，則會呼吸。我們的「銀河」系列是對光線如何在物質中穿梭的探索。透過改變 3D 列印壁厚的厚度，我們控制了不透明度。我們不只是設計燈具的形狀，而是設計它散發出的光之形狀。它漂浮、擴展、旋轉，將宇宙的動態帶入房間靜謐的角落。"
            )
        )
    },
    {
        id: 3,
        title: "The Scale of Intimacy",
        titleZh: "親密的尺度",
        date: "September 15, 2024",
        excerpt: "Why an architect designs jewelry.",
        excerptZh: "為什麼建築師要設計首飾。",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "Architecture frames the body in space. Jewelry frames the body itself. The concerns are the same: structure, balance, weight, and beauty."
            ),
             React.createElement("p", { className: "mb-8 text-[#5D5A53] font-light" },
                "建築在空間中框住身體。首飾則框住身體本身。兩者的關注點是相同的：結構、平衡、重量與美感。"
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "Whether it is a building or a ring, we look for the 'Line'—the single gesture that defines the form. Our jewelry collection takes the complex curves of our home objects and refines them into silver and gold, creating wearable architecture."
            )
        )
    }
];

export const BRAND_NAME = 'LINEA';
export const PRIMARY_COLOR = 'stone-900'; 
export const ACCENT_COLOR = 'stone-500';