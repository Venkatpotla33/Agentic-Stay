import { GoogleGenAI } from "@google/genai";
import { HomeStay, GroundingSource } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are an expert travel agent AI. Your purpose is to help users find home stays. Use your search capabilities to find real-time information and synthesize it to create representative property listings.
Based on the user's request, you must generate a list of 3 to 6 home stay properties.
You must respond ONLY with a valid JSON array of objects. Do not include any other text, explanations, or markdown fences.
Each object in the array must conform to the following TypeScript interface:

interface HomeStay {
  id: string; // A unique identifier, e.g., a UUID.
  name: string; // A creative and appealing name for the property.
  location: string; // City and a more specific area, e.g., "Paris, Le Marais".
  pricePerNight: number; // A realistic price in INR.
  rating: number; // A rating between 4.0 and 5.0, with one decimal place.
  amenities: string[]; // A list of 3-5 key amenities (e.g., "WiFi", "Pool", "Pet-friendly").
  imageKeywords: string; // 3-4 descriptive keywords for a stock photo, e.g., "cozy cabin winter mountains".
  description: string; // A brief, enticing description of the property (2-3 sentences).
}

Generate a diverse set of properties that match the user's query. Ensure all fields are filled with plausible data based on your search results.
`;

export const findHomeStays = async (userQuery: string): Promise<{listings: HomeStay[], sources: GroundingSource[]}> => {
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: userQuery,
        config: {
            systemInstruction: systemInstruction,
            tools: [{googleSearch: {}}],
        },
    });

    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const sources: GroundingSource[] = groundingMetadata?.groundingChunks
      ?.map((chunk: any) => ({ uri: chunk.web.uri, title: chunk.web.title }))
      .filter((s: any) => s.uri && s.title) || [];

    const jsonStr = response.text.trim();

    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    const cleanedJsonStr = match && match[2] ? match[2].trim() : jsonStr;

    const parsedData = JSON.parse(cleanedJsonStr);

    if (Array.isArray(parsedData)) {
      // Basic validation to check if the objects have the required keys
      const listings = parsedData.filter(item => 
        item.id && item.name && item.location && typeof item.pricePerNight === 'number'
      );
      return { listings, sources };
    }
    
    throw new Error("AI response was not a valid array of home stays.");

  } catch (error) {
    console.error("Error fetching or parsing home stays:", error);
    if (error instanceof Error && error.message.includes('JSON.parse')) {
        throw new Error("The AI returned an invalid response. Please try rephrasing your search.");
    }
    throw new Error("Could not connect to the AI service. Please check your connection or API key and try again.");
  }
};

export const generateHomeStayImage = async (prompt: string): Promise<string> => {
    try {
      const descriptivePrompt = `A beautiful, high-quality photograph of ${prompt}, travel photography style, vibrant colors, stunning view.`;
      const response = await ai.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt: descriptivePrompt,
          config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
      });
  
      if (response.generatedImages && response.generatedImages.length > 0) {
          const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
          return `data:image/jpeg;base64,${base64ImageBytes}`;
      }
      console.warn("Image generation returned no images for prompt:", prompt);
      return ""; // Return empty string to signal fallback
    } catch (error) {
      console.error("Error generating image:", error);
      return ""; // Return empty string on error
    }
  };