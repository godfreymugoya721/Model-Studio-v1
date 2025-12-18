
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeImage = async (base64Image: string): Promise<AnalysisResult> => {
  const ai = getAI();
  const base64Data = base64Image.split(',')[1] || base64Image;

  const prompt = `
    You are a world-renowned fashion photographer (Vogue, Harper's Bazaar). 
    Analyze the uploaded model photo. 
    1. Describe features (face, bone structure, skin, expression).
    2. Critique lighting, angle, and composition.
    3. Suggest 3 specific editorial improvements for a portfolio.

    Return the result in JSON format with exactly these fields:
    - critique (string): A detailed professional critique.
    - prompts (array of strings): 3 short high-fashion style names like "Golden Hour Editorial", "Cinematic Noir", "High-Key Portfolio".
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { text: prompt },
        { inlineData: { mimeType: 'image/jpeg', data: base64Data } }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          critique: { type: Type.STRING },
          prompts: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["critique", "prompts"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const generateVariation = async (base64Image: string, stylePrompt: string): Promise<string | null> => {
  const ai = getAI();
  const base64Data = base64Image.split(',')[1] || base64Image;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Data } },
        { text: `professional high-fashion photography, ${stylePrompt}, high-end editorial lighting, 8k resolution, shot on Hasselblad, highly detailed skin texture, masterpiece portfolio shot. Do not change the model's fundamental features, just enhance lighting, background, and styling.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "3:4"
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  return null;
};
