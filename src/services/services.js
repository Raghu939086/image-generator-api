import { VertexAI } from "@google-cloud/vertexai";
import { initGoogleAuth } from "../config/googleAuth";
initGoogleAuth()
console.log("PROJECT:", process.env.GOOGLE_PROJECT_ID);
console.log("LOCATION:", process.env.GOOGLE_LOCATION);
const vertexAI = new VertexAI({
  project: process.env.GOOGLE_PROJECT_ID,
  location: process.env.GOOGLE_LOCATION
});
console.log("Vertex AI initialized");
console.log("GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS);
export const generateWithGemini = async ({ prompt, images }) => {
  const model = vertexAI.preview.getGenerativeModel({
    model: "gemini-2.5-flash-image"
  });
  

  const parts = [
    { text: prompt },
    ...images.map(img => ({
      inlineData: {
        mimeType: img.mimeType,
        data: img.base64
      }
    }))
  ];
  console.log("error")
  const request = {
    contents: [{ role: "user", parts }],
    generationConfig: {
      responseModalities: ["IMAGE"]
    }
  };

  const result = await model.generateContent(request);
  return result.response;
};
