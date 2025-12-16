import { v2 as cloudinary } from 'cloudinary';
import multerStorageCloudinary from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// On extrait explicitement la classe. 
// Si la librairie exporte un objet, on prend la propriété. 
// Sinon, on prend l'export par défaut lui-même.
const CloudinaryStorage = multerStorageCloudinary.CloudinaryStorage || multerStorageCloudinary;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ... (haut du fichier inchangé)

const storage = new CloudinaryStorage({
  // On passe un objet qui contient la propriété v2 réclamée par la librairie
  cloudinary: { v2: cloudinary }, 
  params: {
    folder: "minisocial_uploads",
    allowed_formats: ["jpg", "png", "jpeg", "gif", "webp"],
  },
});

export { cloudinary, storage };