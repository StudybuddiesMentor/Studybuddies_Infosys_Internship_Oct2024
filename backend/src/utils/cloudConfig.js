import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from "dotenv";
 

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'Study_Buddies', 
        allowedFormats: ["png", "jpg", "jpeg"], 
        transformation: [{
            width: 1280,
            height: 1280,
            crop: 'limit',
            quality: 'auto:good',
            fetch_format: 'auto', 
             dpr: 'auto'
        }]
    },
});

const deckstorage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: 'deck_images', 
        allowedFormats: ["png", "jpg", "jpeg"], 
        transformation: [{
            width: 1280,
            height: 1280,
            crop: 'limit',
            quality: 'auto:good',
            fetch_format: 'auto', 
             dpr: 'auto'
        }]
    },
});



export { cloudinary, storage,deckstorage };