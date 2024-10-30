import cloudinary from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary';

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
            width: 400,
            height: 400,
            crop: 'limit'
        }]
    },
});

export { cloudinary, storage };