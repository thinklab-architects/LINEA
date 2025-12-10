/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const getSystemInstruction = () => {
  const productContext = PRODUCTS.map(p => 
    `- ${p.name} / ${p.nameZh} ($${p.price}): ${p.description}. Features: ${p.features.join(', ')}`
  ).join('\n');

  return `You are the AI Design Consultant for "LINEA", a brand founded by an architect that fuses digital craft with organic calm.
  Your tone is poetic, serene, sophisticated, and knowledgeable about architectural design and nature.
  You are bilingual and can answer in both English and Traditional Chinese depending on the user's language.
  
  Key concepts to weave into your answers:
  - "Flowing Silence" / "流動的靜謐"
  - "Digital Craft meets Organic Calm" / "數位工藝遇見有機平靜"
  - "Parametric design mimicking nature" / "模仿自然的參數化設計"
  - "Structure and fragility" / "結構與脆弱"

  Here is our current catalog:
  ${productContext}
  
  Answer customer questions about styling, materials (3D printed bio-polymers, silver), and the philosophy behind the shapes.
  Keep answers concise (under 3 sentences usually).`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    let apiKey: string | undefined;
    
    // Robustly attempt to get the API key, handling ReferenceError if process is not defined
    try {
      apiKey = process.env.API_KEY;
    } catch (e) {
      // process is likely not defined in this environment
      console.warn("Accessing process.env failed");
    }
    
    if (!apiKey) {
      return "I'm sorry, I cannot connect to the design studio right now. (Missing API Key)";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I seem to be having trouble reaching our archives at the moment.";
  }
};