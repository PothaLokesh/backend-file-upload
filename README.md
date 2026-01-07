# Backend Assignment - File Upload & Excel Processing

This repository contains the backend implementation for the file upload assignment. It is built using **Node.js (Express)** and **PostgreSQL**.

The application is architected using a 3-layer pattern (Controller -> Service -> Model) to ensure clean separation of concerns and maintainability.

---

##  Project Setup Steps

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **PostgreSQL** (Local installation or a Cloud instance like Neon)

### 2. Installation
Clone the repository (or extract the folder) and install dependencies:

```bash
cd backend-file-upload
npm install
```

### 3. Database Configuration
Create a `.env` file in the root directory. You can copy the structure below.

**Option A: Using Neon / Cloud DB (Recommended)**
```env
PORT=3000
DATABASE_URL=postgres://user:password@endpoint.neon.tech/neondb?sslmode=require
```

**Option B: Using Local PostgreSQL**
```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=file_upload_db
DB_PORT=5432
```
*Note: If using local, ensure you create the database first: `CREATE DATABASE file_upload_db;`*

---

##  Instructions to Run the Application

Start the server in production mode:
```bash
node src/app.js
```
*You should see: `info: Server running on port 3000`*

---

##  Sample API Requests

### 1. Upload File
Uploads an Excel or CSV file to the server.

**cURL:**
```bash
curl --location 'http://localhost:3000/api/v1/files/upload' \
--form 'file=@"/path/to/your/file.xlsx"'
```

**Postman:**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/v1/files/upload`
- **Body:** `form-data` -> Key: `file` (Type: File) -> Select file.

---

### 2. Process Excel
Parses the uploaded file and inserts valid records into the database.

**cURL:**
```bash
curl --location 'http://localhost:3000/api/v1/process-excel' \
--header 'Content-Type: application/json' \
--data '{
    "filePath": "uploads/123456789-file.xlsx"
}'
```

**Postman:**
- **Method:** `POST`
- **URL:** `http://localhost:3000/api/v1/process-excel`
- **Body:** `raw` (JSON) -> `{ "filePath": "uploads/YOUR_FILE_PATH.xlsx" }`

---

### 3. Get All Records
Fetches paginated records with optional filtering.

**cURL:**
```bash
curl --location 'http://localhost:3000/api/v1/getAll?page=1&limit=10&education=BTech'
```

**Postman:**
- **Method:** `GET`
- **URL:** `http://localhost:3000/api/v1/getAll`
- **Params:**
    - `page`: `1`
    - `limit`: `10`
    - `education`: `BTech` (Optional)

---

##  Explanation of Approach

1.  **Architecture**: I chose a **Service-Oriented Architecture**.
    -   **Controllers** (`src/controllers`): Handle HTTP requests and responses only.
    -   **Services** (`src/services`): Contain the core business logic (e.g., parsing Excel, validating age > 0).
    -   **Models** (`src/models`): Manage direct database SQL queries.
2.  **Validation**:
    -   Rows with missing names, null education, or non-positive age are **skipped** and **logged** (via Winston logger) rather than crashing the request.
    -   Duplicate IDs are handled gracefully (`ON CONFLICT DO NOTHING`) to ensure idempotency.
3.  **Technology**:
    -   **Multer**: Efficiently handles multipart file uploads.
    -   **XLSX**: Standard library for robust Excel parsing.
    -   **PostgreSQL**: Selected for strict schema enforcement and production reliability.
