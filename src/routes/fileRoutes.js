import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import {
    uploadFile,
    processExcel,
    getAllRecords
} from "../controllers/fileController.js";

const router = express.Router();

router.post("/files/upload", upload.single("file"), uploadFile);
router.post("/process-excel", processExcel);
router.get("/getAll", getAllRecords);

export default router;
