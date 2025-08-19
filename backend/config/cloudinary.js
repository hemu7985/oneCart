
import dotenv from "dotenv";
dotenv.config(); // ensure env variables are loaded before Cloudinary runs

import { v2 as cloudinary } from "cloudinary";


import fs from "fs";





cloudinary.config({

  


  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (filepath) => {
  try {
    if (!filepath) return null;

    const uploadResult = await cloudinary.uploader.upload(filepath);

    fs.unlinkSync(filepath); // delete temp file
    return uploadResult.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
   // fs.unlinkSync(filepath);
   // return null;
  }
};

export default uploadOnCloudinary;
