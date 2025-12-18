/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface Product {
  id: string;
  name: string;
  nameZh: string; // Chinese Name
  tagline: string;
  taglineZh: string; // Chinese Tagline
  description: string;
  descriptionZh: string; // Chinese Description
  longDescription?: string;
  longDescriptionZh?: string; // Chinese Long Description
  price: number;
  category: 'Jewelry' | 'Home' | 'Object' | 'Archive';
  categoryZh: string;
  imageUrl: string;
  gallery?: string[];
  features: string[];
  featuresZh: string[];
  shopeeUrl?: string; // Link to Shopee product/store
  sortNumber?: number; // Order for display
}

export interface JournalArticle {
  id: number;
  title: string;
  titleZh: string;
  date: string;
  excerpt: string;
  excerptZh: string;
  image: string;
  content: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export type ViewState =
  | { type: 'home' }
  | { type: 'product', product: Product }
  | { type: 'journal', article: JournalArticle };