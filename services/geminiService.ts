import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export const suggestAnimationName = async (currentList: string[]): Promise<string> => {
  if (!API_KEY) {
    console.warn("Gemini API Key is missing.");
    return "Plasma Void"; // Fallback
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const prompt = `
      I have an Android charging animation app. 
      Current animation names are: ${currentList.join(', ')}.
      Suggest ONE new, cool, futuristic, short name (max 3 words) for a charging animation style. 
      Do not use quotes. Just the name.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text?.trim();
    return text || "Neon Nebula";
  } catch (error) {
    console.error("Error generating animation name:", error);
    return "Quantum Flux"; // Fallback on error
  }
};