/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle } from './types';

// Images
// Note: Product images are now handled dynamically via Airtable sync or public folder
// Static imports removed to prevent build errors for missing files

// Placeholder Shopee URL - in a real app, this would be the specific product link
const SHOPEE_STORE_URL = 'https://shopee.tw/linea.design.tw';
export const INSTAGRAM_URL = 'https://www.instagram.com/linea.design.tw/'; // Placeholder
export const FACEBOOK_URL = 'https://www.facebook.com/linea.design.tw/';   // Placeholder

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
        imageUrl: '', // Sourced from Airtable
        gallery: [], // Sourced from Airtable
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
        imageUrl: '',
        gallery: [],
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
        imageUrl: '',
        gallery: [],
        features: ['Layered Diffusion', 'Ambient Glow', 'Sculptural Statement'],
        featuresZh: ['層疊漫射技術', '氛圍光感', '雕塑感造型'],
        shopeeUrl: SHOPEE_STORE_URL
    },
    {
        id: 'p7',
        name: 'Aether Spire',
        nameZh: '以太・尖塔',
        tagline: 'Light ascending.',
        taglineZh: '光之飛升',
        description: 'Description coming soon.',
        descriptionZh: '描述即將上線。',
        longDescription: 'Full description coming soon.',
        longDescriptionZh: '完整描述即將上線。',
        price: 999,
        category: 'Object',
        categoryZh: '物件',
        imageUrl: '',
        gallery: [],
        features: ['Feature 1', 'Feature 2'],
        featuresZh: ['特色1', '特色2'],
        shopeeUrl: SHOPEE_STORE_URL
    },
    {
        id: 'p8',
        name: 'Virtual Corridors',
        nameZh: '虛擬迴廊',
        tagline: 'Digital architecture.',
        taglineZh: '數位建築',
        description: 'Description coming soon.',
        descriptionZh: '描述即將上線。',
        longDescription: 'Full description coming soon.',
        longDescriptionZh: '完整描述即將上線。',
        price: 999,
        category: 'Home',
        categoryZh: '家飾',
        imageUrl: '',
        gallery: [],
        features: ['Feature 1', 'Feature 2'],
        featuresZh: ['特色1', '特色2'],
        shopeeUrl: SHOPEE_STORE_URL
    }
];

// Journal Articles are now loaded from src/data/journal-data.json
import journalData from './data/journal-data.json';
export const JOURNAL_ARTICLES: JournalArticle[] = journalData as unknown as JournalArticle[];

export const BRAND_NAME = 'LINEA';
export const PRIMARY_COLOR = 'stone-900';
export const ACCENT_COLOR = 'stone-500';
