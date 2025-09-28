import { GoogleGenAI } from "@google/genai";
import * as fs from "fs/promises";
import { readFileSync } from "fs";
import * as path from "path";

// Initialize the client. The key is automatically read from GOOGLE_API_KEY
const ai = new GoogleGenAI({});

/**
 * Utility function to convert a local PDF file path into a GenerativePart object
 * for the Gemini API. This function is restricted to handling PDF files only.
 * @param {string} filePath - Local path to the PDF file.
 * @returns {object} - A GenerativePart object with inline data.
 */
function fileToGenerativePart(filePath) {
  console.log("=== FILE DEBUG INFO ===");
  console.log("Full file path:", filePath);

  const ext = path.extname(filePath).toLowerCase();
  console.log("Detected extension:", `"${ext}"`);

  const effectiveExt = ext || ".pdf";
  console.log("Effective extension:", `"${effectiveExt}"`);

  // Read file to check if it's actually a PDF
  const fileBuffer = readFileSync(filePath);
  console.log("File size:", fileBuffer.length, "bytes");

  // Check PDF header (should start with %PDF)
  const header = fileBuffer.slice(0, 8).toString();
  console.log("File header:", `"${header}"`);
  console.log("Is PDF header?", header.startsWith("%PDF"));
  console.log("=== END DEBUG INFO ===");

  const mimeTypeMap = {
    ".pdf": "application/pdf",
  };

  const mimeType = mimeTypeMap[effectiveExt];

  if (!mimeType) {
    throw new Error(
      `Unsupported file type: Only PDF files (.pdf) are allowed. Extension: "${effectiveExt}"`
    );
  }

  // Additional check: verify it's actually a PDF by checking the header
  if (!header.startsWith("%PDF")) {
    throw new Error(
      `File appears to be corrupted or is not a valid PDF. Header: "${header}"`
    );
  }

  return {
    inlineData: {
      data: fileBuffer.toString("base64"),
      mimeType,
    },
  };
}

/**
 * Calls the Gemini model to get an explanation for a given prompt,
 * optionally including an uploaded PDF file.
 * @param {string} prompt - The text query for the AI.
 * @param {string | null} [filePath=null] - Optional local path to the uploaded PDF file.
 * @returns {Promise<string>} - The AI's generated text response.
 */
export async function getAiExplanation(prompt, filePath = null) {
  // Check if API key is available (GoogleGenAI handles this, but a manual check is fine)
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY environment variable is not set");
  }

  // Flag to track successful cleanup to prevent the 'ENOENT' error from a double-delete.
  let cleanedUp = false;

  try {
    const parts = [];

    // 1. Conditionally add the file part if a filePath is provided
    if (filePath) {
      try {
        console.log(`Processing PDF file at: ${filePath}`);
        const filePart = fileToGenerativePart(filePath);
        parts.push(filePart);
      } catch (e) {
        console.error("Error converting file to generative part:", e.message);
        throw new Error(`Could not process uploaded file: ${e.message}`);
      }
    }

    // 2. Always add the text prompt part
    parts.push({ text: prompt });

    // 🚀 FIXED: Using ai.models.generateContent and the correct config structure
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // contents: [{ parts: parts }], <-- The new SDK accepts the parts array directly
      contents: parts,
      config: {
        // <-- FIXED: systemInstruction must be inside the 'config' object
        systemInstruction: {
          parts: [
            {
              text: "You are Moola, an expert financial coach. When analyzing financial documents, provide clear insights about spending patterns, income, expenses, and actionable financial advice. Be specific and reference actual data from the document when available.",
            },
          ],
        },
      },
    });

    // ✅ FIXED: Correct way to get text from response (it's a property, not a method)
    const result = response.text;

    return result;
  } catch (error) {
    console.error("Gemini API Error in service:", error);

    // More specific error messages
    if (error.message.includes("API key")) {
      throw new Error(
        "Invalid API key. Please check your GOOGLE_API_KEY environment variable."
      );
    } else if (error.message.includes("quota")) {
      throw new Error(
        "API quota exceeded. Please check your Gemini API usage limits."
      );
    } else {
      // Preserve the original error type if it's the SDK issue
      throw new Error(
        `Failed to get response from AI service: ${error.message}`
      );
    }
  } finally {
    // Clean up the temporary file from the disk
    if (filePath && !cleanedUp) {
      try {
        await fs.unlink(filePath);
        console.log(`Successfully cleaned up file at ${filePath}`);
        cleanedUp = true; // Mark as cleaned to prevent external cleanup attempts
      } catch (cleanupError) {
        // Log the cleanup failure but don't re-throw, as the main task succeeded or failed already.
        console.warn(
          `Could not delete temporary file ${filePath}: ${cleanupError.message}`
        );
      }
    }
  }
}
