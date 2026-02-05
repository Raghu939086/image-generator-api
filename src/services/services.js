import { VertexAI } from "@google-cloud/vertexai";
import { initGoogleAuth } from "../config/googleAuth.js";
initGoogleAuth()

const vertexAI = new VertexAI({
  project: process.env.GOOGLE_PROJECT_ID,
  location: process.env.GOOGLE_LOCATION
});

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
