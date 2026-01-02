import { GoogleGenAI } from "@google/genai";
import { DesignState } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateLacquerwareImage = async (design: DesignState): Promise<string> => {
  const ai = getClient();
  
  // Construct a detailed artistic prompt based on the parameters
  const prompt = `
    A high-quality, photorealistic close-up studio shot of a traditional exquisite lacquerware ${design.shape}.
    Base material: High gloss ${design.baseColor}.
    Main Motif: ${design.motif} painted in ${design.technique}.
    Decorative details: ${design.decoration}. 
    Specific details: ${design.additionalPrompt}.
    Lighting: Soft studio lighting emphasizing the glossy texture of the lacquer and the reflection of the gold/inlay details.
    Background: Dark, neutral, elegant mood.
    Style: Masterpiece, traditional craftsmanship, detailed macro photography, 8k resolution.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using flash-image for speed/quality balance
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    // Iterate to find the image part
    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};