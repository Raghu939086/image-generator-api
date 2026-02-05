import express from "express";
import { upload } from "../config/multer.js";
import { generateImage } from "../controllers/generate.controller.js";

const router = express.Router();

router.post("/",upload.fields([  { name: "peopleFiles", maxCount: 10 },  { name: "roomFiles", maxCount: 5 }]),generateImage);
export default router;