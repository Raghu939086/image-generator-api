import { v2 as cloudinary } from "cloudinary";
 
console.log(process.env.CLOUDINARY_CLOUD_NAME,"name",process.env.CLOUDINARY_API_KEY,"key",process.env.CLOUDINARY_API_SECRET,"secret")
console.log("error")
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;
