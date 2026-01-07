/**
 * @module UploadMiddleware
 * @description Configures Multer for handling file uploads.
 * Enforces file size limits and file type validation (Excel/CSV only).
 */

import multer from "multer";

/**
 * Disk storage configuration for Multer.
 * Saves files to the 'uploads/' directory with a unique timestamped filename.
 */
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

/**
 * Multer upload instance.
 * @type {multer.Multer}
 */
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB Limit
    fileFilter: (req, file, cb) => {
        if (
            file.originalname.endsWith(".xls") ||
            file.originalname.endsWith(".xlsx") ||
            file.originalname.endsWith(".csv")
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only Excel or CSV files allowed"));
        }
    }
});

export default upload;
