import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

/**
 * Calls the Gemini model to get an explanation for a given prompt.
 * @param {string} prompt - The text to send to the AI.
 * @returns {Promise<string>} - The AI's generated text response.
 */

export async function getAiExplanation(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error in service:", error);
    // Throwing an error allows the route handler to catch and respond
    throw new Error("Failed to get response from AI service.");
  }
}
