//  STEP 1: Initialize auth FIRST 
import { initGoogleAuth } from "../config/googleAuth.js";
initGoogleAuth();   


// STEP 2: Now import VertexAI
import { VertexAI } from "@google-cloud/vertexai";

console.log("PROJECT:", process.env.GOOGLE_PROJECT_ID);
console.log("LOCATION:", process.env.GOOGLE_LOCATION);
console.log(
  "GOOGLE_APPLICATION_CREDENTIALS:",
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);
console.log("hello",process.env.GOOGLE_SERVICE_ACCOUNT_JSON)

//  Create Vertex AI client
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_PROJECT_ID,
  location: process.env.GOOGLE_LOCATION
});

console.log("🚀 Vertex AI client created");

export const generateWithGemini = async ({ prompt, images }) => {
  try {
    const model = vertexAI.preview.getGenerativeModel({
      model: "gemini-2.5-flash-image"
    });

    const parts = [
      { text: prompt },
      ...images.map((img, i) => {
        console.log(`📷 Image ${i + 1}:`, img.mimeType);
        return {
          inlineData: {
            mimeType: img.mimeType,
            data: img.base64
          }
        };
      })
    ];

    const request = {
      contents: [{ role: "user", parts }],
      generationConfig: {
        responseModalities: ["IMAGE"]
      }
    };

   
    const result = await model.generateContent(request);


    return result.response;

  } catch (err) {
    
    throw err;
  }
};
