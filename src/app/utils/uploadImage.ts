/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { UploadApiResponse } from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret
});

// Multer memory storage
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return next();
    }
    try {
        // Convert buffer to Base64
        const base64Image = req.file.buffer.toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

        // Upload image to Cloudinary
        const uploadedImage: UploadApiResponse = await cloudinary.uploader.upload(dataURI, {
            resource_type: 'auto',
            public_id: `${Date.now()}-${req.file.originalname}`
        });

        // Attach the Cloudinary response to the request object
        req.photo = uploadedImage?.secure_url;
        next();
    } catch (error:any) {
        res.status(500).json({ error: 'Failed to upload image' });
    }
};


export const uploadImages = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || !Array.isArray((req.files as any).images) || (req.files as any).images.length === 0) {
        return next();
    }

    try {
        // Prepare an array to hold uploaded image URLs
        const uploadPromises = (req.files as any).images.map(async (file: Express.Multer.File) => {
            // Convert buffer to Base64
            const base64Image = file.buffer.toString('base64');
            const dataURI = `data:${file.mimetype};base64,${base64Image}`;

            // Upload image to Cloudinary
            const uploadedImage: UploadApiResponse = await cloudinary.uploader.upload(dataURI, {
                resource_type: 'auto',
                public_id: `${Date.now()}-${file.originalname}`
            });

            return uploadedImage?.secure_url; // Return the secure URL
        });

        // Wait for all uploads to complete
        const uploadedImages = await Promise.all(uploadPromises);
        
        // Attach the uploaded image URLs to the request object
        req.photos = uploadedImages; // Store the array of URLs in req.photos
        next();
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to upload images',errors: error });
    }
};
