import express from "express";
import fileRoutes from "./routes/fileRoutes.js";
import "dotenv/config";
import logger from "./utils/logger.js";

const app = express();

app.use(express.json());
app.use("/api/v1", fileRoutes);

app.get("/", (req, res) => {
    res.send("Backend File Upload API is running");
});

app.listen(process.env.PORT || 3000, () => {
    logger.info(`Server running on port ${process.env.PORT || 3000}`);
});
