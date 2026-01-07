import FileService from "../services/fileService.js";
import logger from "../utils/logger.js";

// SIMPLE FILE UPLOAD
// Saves file to local disk and returns path
export const uploadFile = (req, res) => {
    if (!req.file) {
        logger.warn("Upload attempt with no file");
        return res.status(400).json({ error: "No file uploaded" });
    }

    logger.info(`File uploaded: ${req.file.path}`);

    res.json({
        message: "File uploaded successfully",
        filePath: req.file.path
    });
};

// PROCESS EXCEL
// Reads the file, validates content, and saves to DB
export const processExcel = async (req, res) => {
    const { filePath } = req.body;

    try {
        const { inserted, skipped } = await FileService.processExcelFile(filePath);

        logger.info(
            `Processed Excel. Inserted: ${inserted}, Skipped: ${skipped}`
        );

        res.json({
            message: "Excel processed successfully",
            insertedRecords: inserted,
            skippedRecords: skipped
        });
    } catch (err) {
        if (err.message === "Invalid file path") {
            logger.error(`Invalid file path: ${filePath}`);
            return res.status(400).json({ error: "Invalid file path" });
        }
        logger.error(`Error processing file: ${err.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};

// GET ALL USERS
// Supports pagination (page, limit) and filtering (education)
export const getAllRecords = async (req, res) => {
    try {
        const { page, limit, education } = req.query;
        const users = await FileService.getUsers({
            education,
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10
        });

        res.json(users);
    } catch (err) {
        logger.error(`Error fetching records: ${err.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};
