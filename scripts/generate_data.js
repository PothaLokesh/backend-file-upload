import * as XLSX from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Define Sample Data
const data = [
    { Id: 101, Name: "Alice Johnson", Age: 24, Education: "BTech" },
    { Id: 102, Name: "Bob Smith", Age: 27, Education: "MBA" },
    { Id: 103, Name: "Charlie Brown", Age: 22, Education: "BCom" },
    { Id: 104, Name: "David Wilson", Age: 0, Education: "PhD" }, // Invalid (Age 0)
    { Id: 105, Name: "Eve Davis", Age: 29, Education: "BTech" },
    { Id: 106, Name: "", Age: 30, Education: "MTech" }, // Invalid (Missing Name)
];

// 2. Create Workbook and Sheet
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(data);

XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

// 3. Write File
const outputPath = path.join(__dirname, "../sample_data.xlsx");
XLSX.writeFile(workbook, outputPath);

console.log(`✅ Sample Excel file created at: ${outputPath}`);
console.log("Use this file to test the POST /api/v1/files/upload endpoint.");
