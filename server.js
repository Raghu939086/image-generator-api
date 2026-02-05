import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./src/config/db.js";
import generateRoutes from "./src/routes/generate.routes.js";

dotenv.config();

process.env.GOOGLE_APPLICATION_CREDENTIALS =
  "C:/Users/Raghu/Desktop/imageGenerater/ai_image_generatot-api/service-account.json";
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("src/uploads"));
app.get("/", (req, res) => {
  res.send("Backend is running ");
});
app.use("/api/generate", generateRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
