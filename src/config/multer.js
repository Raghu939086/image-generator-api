import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: file.fieldname === "peopleFiles"
      ? "ai-generator/people"
      : "ai-generator/rooms",
    resource_type: "image",
    format: "png"
  })
});

export const upload = multer({ storage });
