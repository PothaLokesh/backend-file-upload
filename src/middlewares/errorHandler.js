import logger from "../utils/logger.js";
import multer from "multer";

const errorHandler = (err, req, res, next) => {
    logger.error(err.message);

    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ error: "File too large. Max size is 5MB" });
        }
    }

    if (err.message === "Only Excel or CSV files allowed") {
        return res.status(400).json({ error: err.message });
    }

    if (err.message === "Invalid file path") {
        return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: "Internal server error" });
};

export default errorHandler;
