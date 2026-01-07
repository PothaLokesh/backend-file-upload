import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";

const connectionConfig = process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false, // Required for Neon/Render/Heroku
        },
    }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    };

const pool = new Pool(connectionConfig);

pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER CHECK (age > 0),
    education TEXT NOT NULL
  )
`);

export default pool;
