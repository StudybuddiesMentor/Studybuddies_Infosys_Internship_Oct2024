
const MAX_SIZE = 6 * 1024 * 1024; // 6MB
const MIN_SIZE = 78388; // Minimum file size in bytes (~76.5KB)
import multer from "multer";
import { storage, deckstorage } from "../cloudConfig.js";
import cloudinary from "cloudinary";

const cloudinaryV2 = cloudinary.v2;

const upload = multer({
    storage: storage,
    limits: { fileSize: MAX_SIZE },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error("Invalid file type. Only PNG, JPG, and JPEG are allowed.");
            error.status = 400;
            return cb(error);
        }
        cb(null, true);
    },
});

const deckImageUpload = multer({
    storage: deckstorage,
    limits: { fileSize: MAX_SIZE },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error("Invalid file type. Only PNG, JPG, and JPEG are allowed.");
            error.status = 400;
            return cb(error);
        }
        cb(null, true);
    },
});

const checkMinFileSize = (minSize) => async (req, res, next) => {
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded." });
    }
    if (file.size < minSize) {
        try {
            if (file.path && file.path.startsWith("https://res.cloudinary.com")) {
                const publicId = extractPublicIdFromUrl(file.path);
                if (publicId) {
                    await cloudinaryV2.uploader.destroy(publicId);
                }
            }
        } catch (error) {
            console.error("Error deleting file from Cloudinary:", error);
            return res.status(500).json({ message: "Internal server error" });
        }

        return res.status(400).json({
            message: `File size is too small. Minimum size is ${(minSize / 1024).toFixed(2)}KB.`,
        });
    }
    next();
};

function extractPublicIdFromUrl(url) {
    const match = url.match(/\/upload\/v\d+\/(.*)\.[a-zA-Z]{3,4}$/);
    if (match && match[1]) {
        return match[1];
    }
    console.warn("Failed to extract public ID from URL:", url);
    return null;
}

export { upload, deckImageUpload, checkMinFileSize, extractPublicIdFromUrl };
