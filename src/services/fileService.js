import XLSX from "xlsx";
import fs from "fs";
import UserModel from "../models/userModel.js";
import logger from "../utils/logger.js";

export default class FileService {
    // Parses the Excel file and bulk inserts valid rows into DB.
    // Skips invalid rows and logs them.
    static async processExcelFile(filePath) {
        if (!filePath || !fs.existsSync(filePath)) {
            throw new Error("Invalid file path");
        }

        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);

        let inserted = 0;
        let skipped = 0;

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const { Id, Name, Age, Education } = row;

            // Validate Row
            if (!Id || !Name || Age <= 0 || !Education) {
                logger.warn(
                    `Row ${i + 2} skipped due to validation failure: ${JSON.stringify(row)}`
                );
                skipped++;
                continue;
            }

            try {
                await UserModel.insertUser({
                    id: Id,
                    name: Name,
                    age: Age,
                    education: Education,
                });
                inserted++;
            } catch (err) {
                logger.error(`Database insertion error: ${err.message}`);
                skipped++;
            }
        }

        return { inserted, skipped };
    }

    // Fetches users with pagination and optional filtering by education.
    static async getUsers({ education, page = 1, limit = 10 }) {
        const offset = (page - 1) * limit;
        const filters = { education };
        return UserModel.getAllUsers(filters, limit, offset);
    }
}
